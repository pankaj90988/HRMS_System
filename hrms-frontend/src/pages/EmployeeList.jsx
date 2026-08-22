import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axiosInstance.get("/personalDetail/AllEmployees");
        setEmployees(res.data);
      } catch (error) {
        toast.error(error?.response?.data?.msg || "Failed to load employees");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Employees</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Salary</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id} className="border-t">
                  <td className="px-4 py-3">{emp.userId?.email}</td>
                  <td className="px-4 py-3">{emp.userId?.role}</td>
                  <td className="px-4 py-3">{emp.phone || "-"}</td>
                  <td className="px-4 py-3">{emp.salary ?? "-"}</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to={`/employees/${emp.userId?._id}`}
                      className="text-indigo-600 font-medium hover:underline"
                    >
                      View / Edit
                    </Link>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
