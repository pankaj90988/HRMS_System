import { useAuth } from '../../context/AuthContext';
import LeaveRequests from './LeaveRequests';
import LeaveApproval from './LeaveApproval';

export default function Leave() {
  const { isHR } = useAuth();
  return isHR ? <LeaveApproval /> : <LeaveRequests />;
}
