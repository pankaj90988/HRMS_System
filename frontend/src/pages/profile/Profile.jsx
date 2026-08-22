import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';
import FormField from '../../components/common/FormField';
import { useAuth } from '../../context/AuthContext';
import { updateEmployee } from '../../services/api';
import './Profile.css';

export default function Profile() {
  const { user, isHR, login } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user.PersonDetails.name,
    designation: user.PersonDetails.designation,
    department: user.PersonDetails.department,
    phone: user.PersonDetails.phone,
    address: user.PersonDetails.address,
  });
  const [saving, setSaving] = useState(false);

  // Employees may only edit address & phone; HR/Admin may edit everything (PDF 3.3.2)
  const editableFields = isHR ? ['name', 'designation', 'department', 'phone', 'address'] : ['phone', 'address'];

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSave() {
    setSaving(true);
    const patch = { PersonDetails: {} };
    editableFields.forEach((f) => (patch.PersonDetails[f] = form[f]));
    const updated = await updateEmployee(user.ID, patch);
    login(updated);
    setSaving(false);
    setEditing(false);
  }

  return (
    <DashboardLayout title="Profile" subtitle="Personal details, job details, salary and documents.">
      <div className="df-profile__header">
        <Avatar name={user.PersonDetails.name} photo={user.Photo} size={72} />
        <div>
          <h2>{user.PersonDetails.name}</h2>
          <p className="df-profile__role">{user.PersonDetails.designation} · {user.ID}</p>
        </div>
        <Button variant="ghost" onClick={() => setEditing((v) => !v)}>
          {editing ? 'Cancel' : 'Edit profile'}
        </Button>
      </div>

      <motion.div layout className="df-profile__grid">
        <Card>
          <h3 className="df-profile__section-title">Personal details</h3>
          {editing ? (
            <div className="df-profile__form">
              <FormField label="Full name" value={form.name} onChange={update('name')} disabled={!editableFields.includes('name')} />
              <FormField label="Phone" value={form.phone} onChange={update('phone')} />
              <FormField label="Address" value={form.address} onChange={update('address')} />
            </div>
          ) : (
            <dl className="df-profile__list">
              <div><dt>Name</dt><dd>{user.PersonDetails.name}</dd></div>
              <div><dt>Email</dt><dd>{user.Email}</dd></div>
              <div><dt>Phone</dt><dd>{user.PersonDetails.phone}</dd></div>
              <div><dt>Address</dt><dd>{user.PersonDetails.address}</dd></div>
            </dl>
          )}
        </Card>

        <Card>
          <h3 className="df-profile__section-title">Job details</h3>
          {editing && isHR ? (
            <div className="df-profile__form">
              <FormField label="Designation" value={form.designation} onChange={update('designation')} />
              <FormField label="Department" value={form.department} onChange={update('department')} />
            </div>
          ) : (
            <dl className="df-profile__list">
              <div><dt>Designation</dt><dd>{user.PersonDetails.designation}</dd></div>
              <div><dt>Department</dt><dd>{user.PersonDetails.department}</dd></div>
              <div><dt>Role</dt><dd>{user.Role}</dd></div>
              <div><dt>Joined</dt><dd>{user.PersonDetails.joined}</dd></div>
            </dl>
          )}
        </Card>

        <Card>
          <h3 className="df-profile__section-title">Salary structure</h3>
          <p className="df-profile__salary">₹{user.Salary.toLocaleString('en-IN')}</p>
          <p className="df-profile__salary-note">All allowances in hand · read-only here — see Salary page for full breakdown.</p>
        </Card>

        <Card>
          <h3 className="df-profile__section-title">Documents</h3>
          <ul className="df-profile__docs">
            <li>
              <span>📄 {user.Resume || 'No resume uploaded'}</span>
              {user.Resume && <Button variant="ghost">View</Button>}
            </li>
            <li>
              <span>🖼 Profile photo</span>
              <Button variant="ghost">{user.Photo ? 'Replace' : 'Upload'}</Button>
            </li>
          </ul>
        </Card>
      </motion.div>

      {editing && (
        <div className="df-profile__save">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Saving…' : 'Save changes'}
          </Button>
        </div>
      )}
    </DashboardLayout>
  );
}
