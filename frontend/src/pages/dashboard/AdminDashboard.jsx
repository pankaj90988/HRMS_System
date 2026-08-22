import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import StatusBadge from '../../components/common/StatusBadge';
import { getAllEmployees, getAllAttendance, getAllRequests } from '../../services/api';
import './Dashboard.css';

export default function AdminDashboard() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getAllEmployees().then(setEmployees);
    getAllAttendance().then(setAttendance);
    getAllRequests().then(setRequests);
  }, []);

  const visibleAttendance = selected ? attendance.filter((a) => a.ID === selected) : attendance;
  const pendingRequests = requests.filter((r) => r.Status === 'Pending');

  return (
    <DashboardLayout title="HR Overview" subtitle="Employees, attendance and approvals in one place.">
      <div className="df-dashboard__stats">
        <Card className="df-stat"><span className="df-stat__num">{employees.length}</span><span className="df-stat__label">Employees</span></Card>
        <Card className="df-stat"><span className="df-stat__num">{pendingRequests.length}</span><span className="df-stat__label">Pending approvals</span></Card>
        <Card className="df-stat"><span className="df-stat__num">{attendance.filter((a) => a.Status === 'Present').length}</span><span className="df-stat__label">Present records</span></Card>
      </div>

      <div className="df-dashboard__grid">
        <Card className="df-dashboard__panel">
          <h3 className="df-dashboard__panel-title">Employees</h3>
          <p className="df-dashboard__hint">Select an employee to filter attendance below.</p>
          <ul className="df-emp-list">
            <li>
              <button className={`df-emp-row ${!selected ? 'is-active' : ''}`} onClick={() => setSelected(null)}>
                All employees
              </button>
            </li>
            {employees.map((e, i) => (
              <motion.li key={e.ID} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
                <button className={`df-emp-row ${selected === e.ID ? 'is-active' : ''}`} onClick={() => setSelected(e.ID)}>
                  <Avatar name={e.PersonDetails.name} size={32} />
                  <span>
                    <strong>{e.PersonDetails.name}</strong>
                    <small>{e.PersonDetails.designation} · {e.Role}</small>
                  </span>
                </button>
              </motion.li>
            ))}
          </ul>
        </Card>

        <Card className="df-dashboard__panel">
          <h3 className="df-dashboard__panel-title">Attendance records</h3>
          <ul className="df-activity-list">
            {visibleAttendance.slice(0, 8).map((a) => (
              <li key={a.AttendanceID}>
                <span>{a.ID} · {a.Dates}</span>
                <StatusBadge status={a.Status} />
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </DashboardLayout>
  );
}
