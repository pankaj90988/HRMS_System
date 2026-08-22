import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { getAttendanceForEmployee, getAllAttendance, checkIn, getAllEmployees } from '../../services/api';
import './Attendance.css';

export default function Attendance() {
  const { user, isHR } = useAuth();
  const [records, setRecords] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [checkedInToday, setCheckedInToday] = useState(false);
  const [busy, setBusy] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  async function load() {
    if (isHR) {
      const [all, emps] = await Promise.all([getAllAttendance(), getAllEmployees()]);
      setRecords(all);
      setEmployees(emps);
    } else {
      const mine = await getAttendanceForEmployee(user.ID);
      setRecords(mine);
      setCheckedInToday(mine.some((r) => r.Dates === today));
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleCheckIn() {
    setBusy(true);
    await checkIn(user.ID);
    await load();
    setBusy(false);
  }

  const nameFor = (ID) => employees.find((e) => e.ID === ID)?.PersonDetails.name || ID;

  return (
    <DashboardLayout
      title={isHR ? 'Attendance Records' : 'Attendance'}
      subtitle={isHR ? 'Attendance across every employee.' : 'Your daily and weekly attendance.'}
    >
      {!isHR && (
        <Card className="df-checkin">
          <div>
            <h3>Today · {today}</h3>
            <p>{checkedInToday ? "You're checked in for today." : "You haven't checked in yet."}</p>
          </div>
          <Button onClick={handleCheckIn} disabled={checkedInToday || busy}>
            {checkedInToday ? 'Checked in ✓' : busy ? 'Checking in…' : 'Check in'}
          </Button>
        </Card>
      )}

      <Card>
        <table className="df-table">
          <thead>
            <tr>
              {isHR && <th>Employee</th>}
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <motion.tr key={r.AttendanceID} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: Math.min(i * 0.03, 0.4) }}>
                {isHR && <td>{nameFor(r.ID)}</td>}
                <td>{r.Dates}</td>
                <td><StatusBadge status={r.Status} /></td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </Card>
    </DashboardLayout>
  );
}
