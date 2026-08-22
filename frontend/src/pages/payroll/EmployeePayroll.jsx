import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import { useAuth } from '../../context/AuthContext';
import { getPayroll } from '../../services/api';
import './Payroll.css';

export default function EmployeePayroll() {
  const { user } = useAuth();
  const [payroll, setPayroll] = useState(null);

  useEffect(() => {
    getPayroll(user.ID).then(setPayroll);
  }, [user.ID]);

  if (!payroll) return null;

  return (
    <DashboardLayout title="Salary" subtitle="Read-only view of your current payroll.">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Card className="df-payroll__hero">
          <span className="df-payroll__label">All allowances in hand</span>
          <span className="df-payroll__amount">₹{payroll.salary.toLocaleString('en-IN')}</span>
          <span className="df-payroll__sub">per month</span>
        </Card>

        <Card className="df-payroll__note">
          <p>
            Payroll figures are maintained by HR and shown here for reference only. If something looks off,
            reach out to HR through a leave/remark request or your reporting manager.
          </p>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
}
