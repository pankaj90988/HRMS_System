import { useAuth } from '../../context/AuthContext';
import EmployeeDashboard from './EmployeeDashboard';
import AdminDashboard from './AdminDashboard';

export default function Dashboard() {
  const { isHR } = useAuth();
  return isHR ? <AdminDashboard /> : <EmployeeDashboard />;
}
