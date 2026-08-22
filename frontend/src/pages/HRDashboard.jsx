import { useState } from "react";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import EmployeeCard from "../components/EmployeeCard.jsx";

export default function HRDashboard() {
  const { user } = useAuth();
  const [idsInput, setIdsInput] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e?.preventDefault();
    setError("");
    setLoading(true);
    setSearched(true);
    try {
      const employeeIds = idsInput
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean);

      if (employeeIds.length === 0) {
        setError("Enter at least one employee ID.");
        setResults([]);
        return;
      }

      const res = await api.post("/personalDetail/EmployeeList", {
        email: user.email,
        employeeIds,
      });
      setResults(res.data || []);
    } catch (err) {
      setError(err.response?.data?.msg || "Could not fetch employees.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-lg font-semibold text-slate-800">Employees</h1>
      <p className="mt-1 text-sm text-slate-500">
        Look up employees by their user ID to view, edit, or mark attendance.
      </p>

      <form onSubmit={handleSearch} className="mt-6 flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={idsInput}
          onChange={(e) => setIdsInput(e.target.value)}
          placeholder="Employee ID(s), comma-separated"
          className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60"
        >
          {loading ? "Searching…" : "Search"}
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <div className="mt-6 space-y-3">
        {results.map((detail) => (
          <EmployeeCard
            key={detail._id}
            detail={detail}
            isHR
            onUpdated={handleSearch}
          />
        ))}

        {searched && !loading && !error && results.length === 0 && (
          <p className="text-sm text-slate-400">No employees found for those IDs.</p>
        )}
      </div>
    </div>
  );
}
