import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import EmployeeCard from "../components/EmployeeCard.jsx";

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/personalDetail/ViewEmployee", {
        employeeId: user._id,
      });
      setDetail(res.data);
    } catch (err) {
      setError(err.response?.data?.msg || "Could not load your profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="text-lg font-semibold text-slate-800">My profile</h1>
      <p className="mt-1 text-sm text-slate-500">
        View your details and mark today's attendance.
      </p>

      <div className="mt-6">
        {loading && <p className="text-sm text-slate-400">Loading…</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {detail && (
          <EmployeeCard
            detail={detail}
            isHR={false}
            onUpdated={fetchProfile}
            defaultExpanded
          />
        )}
      </div>
    </div>
  );
}
