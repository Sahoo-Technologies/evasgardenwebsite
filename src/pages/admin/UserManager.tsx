import { useState } from 'react';
import toast from 'react-hot-toast';
import { useProfiles } from '../../lib/queries';
import { supabase } from '../../lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { FiUserPlus, FiTrash2, FiShield } from 'react-icons/fi';

export default function UserManager() {
  const { data: profiles, isLoading } = useProfiles();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', full_name: '', role: 'manager' });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: { full_name: form.full_name, role: form.role },
        },
      });
      if (error) throw error;
      toast.success('User created! They can now sign in.');
      setForm({ email: '', password: '', full_name: '', role: 'manager' });
      setShowForm(false);
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    } catch (err: any) {
      toast.error(err.message || 'Failed to create user');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif text-navy-900 mb-2">User Management</h1>
          <p className="text-navy-400 text-sm">{profiles?.length ?? 0} staff accounts</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-navy flex items-center gap-2">
          <FiUserPlus size={16} /> Add User
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="admin-card mb-8 space-y-4">
          <h3 className="font-serif text-lg text-navy-900 mb-2">Create Staff Account</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              required
              placeholder="Full Name"
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              className="px-4 py-3 bg-surface-50 border border-surface-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-300"
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="px-4 py-3 bg-surface-50 border border-surface-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-300"
            />
            <input
              required
              type="password"
              placeholder="Password (min 6 chars)"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="px-4 py-3 bg-surface-50 border border-surface-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-300"
            />
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="px-4 py-3 bg-surface-50 border border-surface-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-300"
            >
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn-navy">Create Account</button>
        </form>
      )}

      {isLoading ? (
        <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="skeleton h-16 rounded-xl" />)}</div>
      ) : (
        <div className="space-y-3">
          {profiles?.map((profile) => (
            <div key={profile.id} className="admin-card flex items-center gap-4">
              <div className="w-10 h-10 bg-navy-900 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                {profile.full_name?.[0] || profile.email[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-navy-900">{profile.full_name || 'Unnamed'}</p>
                <p className="text-xs text-navy-400">{profile.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                  profile.role === 'admin' ? 'bg-gold-100 text-gold-700' : 'bg-navy-100 text-navy-600'
                }`}>
                  <FiShield className="inline mr-1" size={10} />
                  {profile.role}
                </span>
                <span className="text-xs text-navy-400">
                  {format(new Date(profile.created_at), 'MMM d, yyyy')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
