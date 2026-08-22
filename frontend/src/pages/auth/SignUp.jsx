import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import DayflowScene from '../../components/layout/DayflowScene';
import FormField from '../../components/common/FormField';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { signUp } from '../../services/api';
import './Auth.css';

export default function SignUp() {
  const [form, setForm] = useState({ ID: '', email: '', password: '', role: 'Employee' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await signUp(form);
      login(user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Could not create your account.');
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
          <span className="df-auth__eyebrow">Get started</span>
          <h1 className="df-auth__title">Create your account</h1>
          <p className="df-auth__hint">A verification email is sent after sign up, per company policy.</p>

          <FormField label="Employee ID" value={form.ID} onChange={update('ID')} placeholder="EMP-104 (optional — we can assign one)" />
          <FormField label="Email" type="email" value={form.email} onChange={update('email')} placeholder="you@dayflow.com" required />
          <FormField label="Password" type="password" value={form.password} onChange={update('password')} placeholder="Min. 8 characters" required />
          <FormField
            label="Role"
            as="select"
            value={form.role}
            onChange={update('role')}
            options={[
              { value: 'Employee', label: 'Employee' },
              { value: 'HR', label: 'HR / Admin' },
            ]}
          />

          {error && <p className="df-auth__error">{error}</p>}

          <Button type="submit" full disabled={loading}>
            {loading ? 'Creating account…' : 'Create account'}
          </Button>

          <p className="df-auth__switch">
            Already have an account? <Link to="/signin">Sign in</Link>
          </p>
        </motion.form>
      </div>
    </div>
  );
}
