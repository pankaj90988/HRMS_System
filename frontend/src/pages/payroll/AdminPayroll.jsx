import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';
import FormField from '../../components/common/FormField';
import { getAllEmployees, updateSalary } from '../../services/api';
import './Payroll.css';

export default function AdminPayroll() {
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState('');
  const [saving, setSaving] = useState(false);

  function load() {
    getAllEmployees().then(setEmployees);
  }

  useEffect(load, []);

  function startEdit(emp) {
    setEditingId(emp.ID);
    setDraft(String(emp.Salary));
  }

  async function save(ID) {
    setSaving(true);
    await updateSalary(ID, Number(draft));
    setSaving(false);
    setEditingId(null);
    load();
  }

  const total = employees.reduce((sum, e) => sum + e.Salary, 0);

  return (
    <DashboardLayout title="Payroll Control" subtitle="View and update salary structure across the company.">
      <Card className="df-payroll__summary">
        <span className="df-payroll__label">Total monthly payroll</span>
        <span className="df-payroll__amount">₹{total.toLocaleString('en-IN')}</span>
        <span className="df-payroll__sub">across {employees.length} employees</span>
      </Card>

      <Card>
        <table className="df-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Role</th>
              <th>Salary (in hand)</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e, i) => (
              <motion.tr key={e.ID} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
                <td>
                  <div className="df-payroll__emp">
                    <Avatar name={e.PersonDetails.name} size={30} />
                    {e.PersonDetails.name}
                  </div>
                </td>
                <td>{e.Role}</td>
                <td>
                  {editingId === e.ID ? (
                    <FormField label="" type="number" value={draft} onChange={(ev) => setDraft(ev.target.value)} />
                  ) : (
                    `₹${e.Salary.toLocaleString('en-IN')}`
                  )}
                </td>
                <td>
                  {editingId === e.ID ? (
                    <Button variant="ghost" disabled={saving} onClick={() => save(e.ID)}>
                      {saving ? 'Saving…' : 'Save'}
                    </Button>
                  ) : (
                    <Button variant="ghost" onClick={() => startEdit(e)}>
                      Update
                    </Button>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </Card>
    </DashboardLayout>
  );
}
