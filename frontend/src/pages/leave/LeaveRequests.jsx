import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import FormField from '../../components/common/FormField';
import { useAuth } from '../../context/AuthContext';
import { getRequestsForEmployee, createRequest } from '../../services/api';
import './Leave.css';

export default function LeaveRequests() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ Type: 'Paid', from: '', to: '', Remark: '' });

  function load() {
    getRequestsForEmployee(user.ID).then(setRequests);
  }

  useEffect(load, [user.ID]);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    await createRequest({ ID: user.ID, Type: form.Type, Remark: form.Remark, range: `${form.from} to ${form.to}` });
    setSubmitting(false);
    setOpen(false);
    setForm({ Type: 'Paid', from: '', to: '', Remark: '' });
    load();
  }

  return (
    <DashboardLayout title="Leave Requests" subtitle="Apply for time off and track approval status.">
      <div className="df-leave__toolbar">
        <Button onClick={() => setOpen(true)}>+ Apply for leave</Button>
      </div>

      <div className="df-leave__grid">
        {requests.map((r, i) => (
          <motion.div key={r.ReqID} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="df-leave-card">
              <div className="df-leave-card__top">
                <span className="df-leave-card__type">{r.Type} leave</span>
                <StatusBadge status={r.Status} />
              </div>
              <p className="df-leave-card__range">{r.range}</p>
              <p className="df-leave-card__remark">{r.Remark}</p>
            </Card>
          </motion.div>
        ))}
        {requests.length === 0 && <p className="df-dashboard__empty">No leave requests yet.</p>}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Apply for leave">
        <form className="df-leave__form" onSubmit={handleSubmit}>
          <FormField
            label="Leave type"
            as="select"
            value={form.Type}
            onChange={update('Type')}
            options={[
              { value: 'Paid', label: 'Paid' },
              { value: 'Sick', label: 'Sick' },
              { value: 'Unpaid', label: 'Unpaid' },
            ]}
          />
          <div className="df-leave__dates">
            <FormField label="From" type="date" value={form.from} onChange={update('from')} required />
            <FormField label="To" type="date" value={form.to} onChange={update('to')} required />
          </div>
          <FormField label="Remarks" as="textarea" value={form.Remark} onChange={update('Remark')} placeholder="Add a short reason…" />
          <Button type="submit" full disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit request'}
          </Button>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
