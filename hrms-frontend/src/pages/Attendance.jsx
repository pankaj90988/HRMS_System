import { useState } from "react";
import { axiosInstance } from "../lib/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";

const todayISO = () => new Date().toISOString().slice(0, 10);

const Attendance = () => {
  const { isHR } = useAuth();
  const [requestedId, setRequestedId] = useState("");
  const [date, setDate] = useState(todayISO());
  const [status, setStatus] = useState("Present");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("add"); // "add" | "update" (update is HR only)

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { date, status };
      if (isHR && requestedId) payload.requestedId = requestedId;

      if (mode === "add") {
        await axiosInstance.post("/personalDetail/AddAttendenceByEmployee", payload);
        toast.success("Attendance added");
      } else {
        if (!requestedId) {
          toast.error("Employee ID is required to update attendance");
          setLoading(false);
          return;
        }
        await axiosInstance.post("/personalDetail/UpdateAttendenceByEmployee", payload);
        toast.success("Attendance updated");
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Attendance</h1>

      {isHR && (
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setMode("add")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium ${
              mode === "add" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            Add
          </button>
          <button
            onClick={() => setMode("update")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium ${
              mode === "update" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            Update existing
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
        {isHR && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employee ID {mode === "add" ? "(leave blank to mark your own)" : ""}
            </label>
            <input
              value={requestedId}
              onChange={(e) => setRequestedId(e.target.value)}
              placeholder="Employee's user _id"
              className={inputClass}
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputClass}>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Half Day">Half Day</option>
            <option value="On Leave">On Leave</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : mode === "add" ? "Add attendance" : "Update attendance"}
        </button>
      </form>
    </div>
  );
};

export default Attendance;
