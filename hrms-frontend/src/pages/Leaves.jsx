import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";

const statusBadge = {
  Pending: "bg-yellow-100 text-yellow-700",
  Approved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

const emptyForm = { leaveType: "Sick", fromDate: "", toDate: "", reason: "" };

const Leaves = () => {
  const { isHR } = useAuth();

  // Employee: apply for leave + own history
  const [form, setForm] = useState(emptyForm);
  const [applying, setApplying] = useState(false);
  const [myLeaves, setMyLeaves] = useState([]);
  const [myLoading, setMyLoading] = useState(true);

  // HR: review queue
  const [hrLeaves, setHrLeaves] = useState([]);
  const [hrLoading, setHrLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("Pending");

  const fetchMyLeaves = async () => {
    try {
      const res = await axiosInstance.get("/leave/my");
      setMyLeaves(res.data);
    } catch (error) {
      toast.error("Failed to load your leaves");
    } finally {
      setMyLoading(false);
    }
  };

  const fetchHrLeaves = async (status) => {
    setHrLoading(true);
    try {
      const res = await axiosInstance.get(
        `/leave/all${status !== "All" ? `?status=${status}` : ""}`
      );
      setHrLeaves(res.data);
    } catch (error) {
      toast.error("Failed to load leave requests");
    } finally {
      setHrLoading(false);
    }
  };

  useEffect(() => {
    fetchMyLeaves();
  }, []);

  useEffect(() => {
    if (isHR) fetchHrLeaves(statusFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHR, statusFilter]);

  const handleApply = async (e) => {
    e.preventDefault();
    setApplying(true);
    try {
      await axiosInstance.post("/leave/apply", form);
      toast.success("Leave request sent to HR");
      setForm(emptyForm);
      fetchMyLeaves();
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Could not submit leave request");
    } finally {
      setApplying(false);
    }
  };

  const handleReview = async (id, status) => {
    try {
      await axiosInstance.patch(`/leave/review/${id}`, { status });
      toast.success(`Leave ${status.toLowerCase()}`);
      fetchHrLeaves(statusFilter);
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Action failed");
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      {/* Apply for leave (every user, including HR themselves) */}
      <section>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Apply for Leave</h1>
        <form onSubmit={handleApply} className="bg-white rounded-lg shadow p-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Leave type</label>
            <select
              value={form.leaveType}
              onChange={(e) => setForm({ ...form, leaveType: e.target.value })}
              className={inputClass}
            >
              <option value="Sick">Sick</option>
              <option value="Casual">Casual</option>
              <option value="Paid">Paid</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div></div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From date</label>
            <input
              type="date"
              required
              value={form.fromDate}
              onChange={(e) => setForm({ ...form, fromDate: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To date</label>
            <input
              type="date"
              required
              value={form.toDate}
              onChange={(e) => setForm({ ...form, toDate: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
            <textarea
              rows={2}
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={applying}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 disabled:opacity-50"
            >
              {applying ? "Submitting..." : "Submit to HR"}
            </button>
          </div>
        </form>
      </section>

      {/* My leave history */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">My Leave History</h2>
        {myLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <LeaveTable leaves={myLeaves} showEmail={false} />
        )}
      </section>

      {/* HR review queue */}
      {isHR && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Employee Leave Requests</h2>
            <div className="flex gap-2">
              {["Pending", "Approved", "Rejected", "All"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                    statusFilter === s ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          {hrLoading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <LeaveTable
              leaves={hrLeaves}
              showEmail={true}
              onApprove={(id) => handleReview(id, "Approved")}
              onReject={(id) => handleReview(id, "Rejected")}
            />
          )}
        </section>
      )}
    </div>
  );
};

const LeaveTable = ({ leaves, showEmail, onApprove, onReject }) => (
  <div className="bg-white rounded-lg shadow overflow-x-auto">
    <table className="min-w-full text-sm">
      <thead className="bg-gray-50 text-left text-gray-600">
        <tr>
          {showEmail && <th className="px-4 py-3">Employee</th>}
          <th className="px-4 py-3">Type</th>
          <th className="px-4 py-3">From</th>
          <th className="px-4 py-3">To</th>
          <th className="px-4 py-3">Reason</th>
          <th className="px-4 py-3">Status</th>
          {(onApprove || onReject) && <th className="px-4 py-3"></th>}
        </tr>
      </thead>
      <tbody>
        {leaves.map((lv) => (
          <tr key={lv._id} className="border-t">
            {showEmail && <td className="px-4 py-3">{lv.userId?.email}</td>}
            <td className="px-4 py-3">{lv.leaveType}</td>
            <td className="px-4 py-3">{new Date(lv.fromDate).toLocaleDateString()}</td>
            <td className="px-4 py-3">{new Date(lv.toDate).toLocaleDateString()}</td>
            <td className="px-4 py-3 max-w-xs truncate">{lv.reason || "-"}</td>
            <td className="px-4 py-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge[lv.status]}`}>
                {lv.status}
              </span>
            </td>
            {(onApprove || onReject) && (
              <td className="px-4 py-3 text-right space-x-2">
                {lv.status === "Pending" && (
                  <>
                    <button
                      onClick={() => onApprove(lv._id)}
                      className="text-green-600 font-medium hover:underline"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => onReject(lv._id)}
                      className="text-red-600 font-medium hover:underline"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            )}
          </tr>
        ))}
        {leaves.length === 0 && (
          <tr>
            <td colSpan={showEmail ? 7 : 6} className="px-4 py-6 text-center text-gray-400">
              No leave records
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default Leaves;
