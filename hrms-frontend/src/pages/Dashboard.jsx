import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Dashboard = () => {
  const { authUser, isHR } = useAuth();

  const cards = [
    { to: "/attendance", title: "Attendance", desc: "Mark or review attendance" },
    { to: "/leaves", title: "Leaves", desc: "Apply for leave / review leave requests" },
  ];
  if (isHR) {
    cards.unshift({ to: "/employees", title: "Employees", desc: "View and manage employee records" });
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">
        Welcome, {authUser?.email}
      </h1>
      <p className="text-gray-500 mb-6">Role: {authUser?.role}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="block bg-white border rounded-lg p-5 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-indigo-600">{c.title}</h2>
            <p className="text-sm text-gray-500 mt-1">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
