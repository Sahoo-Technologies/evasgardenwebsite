import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { useAuthStore, useIsManager } from '../../stores/authStore';
import { FiUpload, FiImage, FiLogOut } from 'react-icons/fi';

export default function ManagerLayout() {
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const isManager = useIsManager();

  if (!isManager) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-surface-50 flex">
      <aside className="w-64 bg-white border-r border-surface-200 flex flex-col shrink-0 sticky top-0 h-screen">
        <div className="p-6 border-b border-surface-100">
          <img src="/logo-gold.png" alt="Eva's Garden" className="h-10 mb-2" />
          <p className="text-[10px] uppercase tracking-[0.2em] text-navy-400 font-bold">Manager Portal</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavLink to="/manager" end className={({ isActive }) => `admin-sidebar-link ${isActive ? 'active' : ''}`}>
            <FiUpload size={18} /> Upload Media
          </NavLink>
          <NavLink to="/manager/uploads" className={({ isActive }) => `admin-sidebar-link ${isActive ? 'active' : ''}`}>
            <FiImage size={18} /> My Uploads
          </NavLink>
        </nav>

        <div className="p-4 border-t border-surface-100">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-8 h-8 bg-navy-900 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {user?.full_name?.[0] || 'M'}
            </div>
            <div className="text-sm">
              <p className="font-medium text-navy-900 truncate">{user?.full_name || 'Manager'}</p>
              <p className="text-[10px] text-navy-400 uppercase tracking-wider">{user?.role}</p>
            </div>
          </div>
          <button onClick={signOut} className="admin-sidebar-link w-full text-red-500 hover:text-red-700 hover:bg-red-50">
            <FiLogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1 min-h-screen">
        <div className="p-8 max-w-5xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
