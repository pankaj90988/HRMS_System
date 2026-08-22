import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRouter from './router/AppRouter';
import './styles/global.css';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
}
