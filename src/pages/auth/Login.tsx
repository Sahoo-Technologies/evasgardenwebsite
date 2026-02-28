import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../stores/authStore';
import { FiMail, FiLock, FiLoader } from 'react-icons/fi';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const result = await signIn(email, password);
    if (result.error) {
      setError(result.error);
    } else {
      const user = useAuthStore.getState().user;
      navigate(user?.role === 'admin' ? '/admin' : '/manager');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-950 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img src="/header.jpeg" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400 rounded-full blur-[200px] opacity-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-white rounded-3xl p-10 w-full max-w-md shadow-2xl"
      >
        <div className="text-center mb-8">
          <img src="/logo-gold.png" alt="Eva's Garden" className="h-14 mx-auto mb-4" />
          <h1 className="text-2xl font-serif text-navy-900 mb-1">Staff Portal</h1>
          <p className="text-xs uppercase tracking-[0.2em] text-navy-400 font-bold">
            Admin & Manager Access
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-300" size={18} />
            <input
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-surface-50 border border-surface-100 rounded-xl text-sm
                         focus:outline-none focus:ring-2 focus:ring-gold-300 transition-all"
            />
          </div>
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-300" size={18} />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-surface-50 border border-surface-100 rounded-xl text-sm
                         focus:outline-none focus:ring-2 focus:ring-gold-300 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-navy py-4 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading && <FiLoader className="animate-spin" size={16} />}
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-xs text-navy-400 hover:text-gold-600 transition-colors uppercase tracking-wider">
            &larr; Back to Website
          </a>
        </div>
      </motion.div>
    </div>
  );
}
