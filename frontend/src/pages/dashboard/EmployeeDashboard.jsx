import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import StatusBadge from '../../components/common/StatusBadge';
import { useAuth } from '../../context/AuthContext';
import { getAttendanceForEmployee, getRequestsForEmployee } from '../../services/api';
import './Dashboard.css';

const quickLinks = [
  { to: '/profile', label: 'Profile', icon: '☺', desc: 'View & edit your details' },
  { to: '/attendance', label: 'Attendance', icon: '◔', desc: 'Daily & weekly view' },
  { to: '/leave', label: 'Leave Requests', icon: '✉', desc: 'Apply & track status' },
  { to: '/payroll', label: 'Salary', icon: '฿', desc: 'Read-only payroll view' },
];

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getAttendanceForEmployee(user.ID).then(setAttendance);
    getRequestsForEmployee(user.ID).then(setRequests);
  }, [user.ID]);

  const alerts = requests.filter((r) => r.Status === 'Pending');

  return (
    <DashboardLayout title={`Hi, ${user.PersonDetails.name.split(' ')[0]}`} subtitle="Here's what's moving on your workday.">
      <div className="df-quickgrid">
        {quickLinks.map((q, i) => (
          <motion.div
            key={q.to}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to={q.to} className="df-quickcard-link">
              <Card className="df-quickcard">
                <span className="df-quickcard__icon">{q.icon}</span>
                <div>
                  <h3>{q.label}</h3>
                  <p>{q.desc}</p>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="df-dashboard__grid">
        <Card className="df-dashboard__panel">
          <h3 className="df-dashboard__panel-title">Recent activity</h3>
          {alerts.length === 0 ? (
            <p className="df-dashboard__empty">No pending leave requests right now.</p>
          ) : (
            <ul className="df-activity-list">
              {alerts.map((r) => (
                <li key={r.ReqID}>
                  <span>{r.Type} leave · {r.range}</span>
                  <StatusBadge status={r.Status} />
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="df-dashboard__panel">
          <h3 className="df-dashboard__panel-title">This week's attendance</h3>
          <ul className="df-activity-list">
            {attendance.slice(0, 5).map((a) => (
              <li key={a.AttendanceID}>
                <span>{a.Dates}</span>
                <StatusBadge status={a.Status} />
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </DashboardLayout>
  );
}
