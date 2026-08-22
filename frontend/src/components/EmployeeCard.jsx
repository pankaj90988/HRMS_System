import { useState } from "react";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

const FIELD_LABELS = {
  profileLink: "Profile link",
  IdCardLink: "ID card link",
  resumeLink: "Resume link",
  salary: "Salary",
  address: "Address",
  phone: "Phone",
};

export default function EmployeeCard({ detail, isHR, onUpdated, defaultExpanded = false }) {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [editing, setEditing] = useState(false);
  const [attendanceOpen, setAttendanceOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'error'|'success', text }

  const targetUser = detail.userId || {};
  const targetId = targetUser._id;

  const editableFields = isHR
    ? ["profileLink", "IdCardLink", "resumeLink", "salary", "address", "phone"]
    : ["profileLink", "address", "phone"];

  const [form, setForm] = useState({
    profileLink: detail.profileLink || "",
    IdCardLink: detail.IdCardLink || "",
    resumeLink: detail.resumeLink || "",
    salary: detail.salary ?? "",
    address: detail.address || "",
    phone: detail.phone || "",
  });

  const [attendance, setAttendance] = useState({ date: "", status: "Present" });
  const [attendanceMode, setAttendanceMode] = useState("add"); // "add" | "update"

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const payload = {
        employeeId: user._id,
        requestedId: targetId,
      };
      editableFields.forEach((field) => {
        payload[field] = form[field] === "" ? undefined : form[field];
      });

      const res = await api.post("/personalDetail/EditEmployee", payload);
      setMessage({ type: "success", text: res.data.msg || "Updated successfully" });
      setEditing(false);
      onUpdated?.();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.msg || "Could not update details",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAttendanceSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      if (attendanceMode === "add") {
        const res = await api.post("/personalDetail/AddAttendenceByEmployee", {
          employeeId: targetId,
          date: attendance.date,
          status: attendance.status,
        });
        setMessage({ type: "success", text: res.data.msg || "Attendance added" });
      } else {
        const res = await api.post("/personalDetail/UpdateAttendenceByEmployee", {
          employeeId: user._id,
          requestedId: targetId,
          date: attendance.date,
          status: attendance.status,
        });
        setMessage({ type: "success", text: res.data.msg || "Attendance updated" });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.msg || "Could not save attendance",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-medium text-slate-800">{targetUser.email || "Unknown user"}</p>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            {targetUser.role} · ID: {targetId}
          </p>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm font-medium text-brand-600 hover:underline"
        >
          {expanded ? "Hide" : "View"}
        </button>
      </div>

      {expanded && (
        <div className="mt-4 space-y-4 border-t border-slate-100 pt-4">
          {!editing ? (
            <>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {["profileLink", "IdCardLink", "resumeLink", "salary", "address", "phone"].map(
                  (field) => (
                    <div key={field}>
                      <dt className="text-slate-400">{FIELD_LABELS[field]}</dt>
                      <dd className="text-slate-700">{detail[field] || "—"}</dd>
                    </div>
                  )
                )}
              </dl>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setEditing(true)}
                  className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Edit details
                </button>
                <button
                  onClick={() => setAttendanceOpen(!attendanceOpen)}
                  className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  {attendanceOpen ? "Close attendance" : "Attendance"}
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSaveProfile} className="space-y-3">
              {editableFields.map((field) => (
                <div key={field}>
                  <label className="block text-xs font-medium text-slate-500">
                    {FIELD_LABELS[field]}
                  </label>
                  <input
                    type={field === "salary" ? "number" : "text"}
                    name={field}
                    value={form[field]}
                    onChange={handleFormChange}
                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>
              ))}
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-md bg-brand-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60"
                >
                  {saving ? "Saving…" : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {attendanceOpen && (
            <form
              onSubmit={handleAttendanceSubmit}
              className="space-y-3 rounded-md bg-slate-50 p-3"
            >
              <div className="flex gap-2 text-sm">
                <button
                  type="button"
                  onClick={() => setAttendanceMode("add")}
                  className={`rounded-md px-3 py-1 font-medium ${
                    attendanceMode === "add"
                      ? "bg-brand-600 text-white"
                      : "border border-slate-300 text-slate-600"
                  }`}
                >
                  Add
                </button>
                {isHR && (
                  <button
                    type="button"
                    onClick={() => setAttendanceMode("update")}
                    className={`rounded-md px-3 py-1 font-medium ${
                      attendanceMode === "update"
                        ? "bg-brand-600 text-white"
                        : "border border-slate-300 text-slate-600"
                    }`}
                  >
                    Update
                  </button>
                )}
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-slate-500">Date</label>
                  <input
                    type="date"
                    required
                    value={attendance.date}
                    onChange={(e) => setAttendance({ ...attendance, date: e.target.value })}
                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-slate-500">Status</label>
                  <select
                    value={attendance.status}
                    onChange={(e) => setAttendance({ ...attendance, status: e.target.value })}
                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Leave">Leave</option>
                    <option value="Half Day">Half Day</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="rounded-md bg-brand-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60"
              >
                {saving ? "Saving…" : attendanceMode === "add" ? "Add attendance" : "Update attendance"}
              </button>
            </form>
          )}

          {message && (
            <p
              className={`text-sm ${
                message.type === "error" ? "text-red-600" : "text-green-600"
              }`}
            >
              {message.text}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
