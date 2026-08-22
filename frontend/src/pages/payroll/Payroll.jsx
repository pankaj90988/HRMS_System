import { useAuth } from '../../context/AuthContext';
import EmployeePayroll from './EmployeePayroll';
import AdminPayroll from './AdminPayroll';

export default function Payroll() {
  const { isHR } = useAuth();
  return isHR ? <AdminPayroll /> : <EmployeePayroll />;
}
