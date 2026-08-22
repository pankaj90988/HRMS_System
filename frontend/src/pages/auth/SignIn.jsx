import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import DayflowScene from '../../components/layout/DayflowScene';
import FormField from '../../components/common/FormField';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { signIn } from '../../services/api';
import './Auth.css';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await signIn({ email, password });
      login(user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Incorrect email or password.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="df-auth">
      <div className="df-auth__scene">
        <DayflowScene />
      </div>

      <div className="df-auth__panel">
        <motion.form
          className="df-auth__form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="df-auth__eyebrow">Welcome back</span>
          <h1 className="df-auth__title">Sign in to Dayflow</h1>
          <p className="df-auth__hint">
            Try <strong>aarav.mehta@dayflow.com</strong> (Employee) or <strong>r.kapoor@dayflow.com</strong> (HR) — any password.
          </p>

          <FormField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@dayflow.com" required />
          <FormField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />

          {error && <p className="df-auth__error">{error}</p>}

          <Button type="submit" full disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </Button>

          <p className="df-auth__switch">
            New to Dayflow? <Link to="/signup">Create an account</Link>
          </p>
        </motion.form>
      </div>
    </div>
  );
}
