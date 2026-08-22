import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import { getAllRequests, getAllEmployees, updateRequestStatus } from '../../services/api';
import './Leave.css';

export default function LeaveApproval() {
  const [requests, setRequests] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [busyId, setBusyId] = useState(null);

  function load() {
    getAllRequests().then(setRequests);
  }

  useEffect(() => {
    load();
    getAllEmployees().then(setEmployees);
  }, []);

  const nameFor = (ID) => employees.find((e) => e.ID === ID)?.PersonDetails.name || ID;

  async function act(ReqID, status) {
    setBusyId(ReqID);
    await updateRequestStatus(ReqID, status);
    load();
    setBusyId(null);
  }

  return (
    <DashboardLayout title="Leave Approvals" subtitle="Review, approve or reject time-off requests.">
      <div className="df-leave__grid">
        <AnimatePresence>
          {requests.map((r) => (
            <motion.div key={r.ReqID} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}>
              <Card className="df-leave-card">
                <div className="df-leave-card__top">
                  <span className="df-leave-card__type">{nameFor(r.ID)} · {r.Type} leave</span>
                  <StatusBadge status={r.Status} />
                </div>
                <p className="df-leave-card__range">{r.range}</p>
                <p className="df-leave-card__remark">{r.Remark}</p>

                {r.Status === 'Pending' && (
                  <div className="df-leave-card__actions">
                    <Button variant="ghost" disabled={busyId === r.ReqID} onClick={() => act(r.ReqID, 'Rejected')}>
                      Reject
                    </Button>
                    <Button disabled={busyId === r.ReqID} onClick={() => act(r.ReqID, 'Approved')}>
                      {busyId === r.ReqID ? 'Saving…' : 'Approve'}
                    </Button>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
        {requests.length === 0 && <p className="df-dashboard__empty">No leave requests submitted yet.</p>}
      </div>
    </DashboardLayout>
  );
}
