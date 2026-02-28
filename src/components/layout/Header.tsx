import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '../../constants';
import { useAuthStore } from '../../stores/authStore';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const user = useAuthStore((s) => s.user);
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  const headerBg = scrolled
    ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-navy-900/5 py-3'
    : 'bg-transparent py-5';
  const textColor = scrolled || !isHome ? 'text-navy-900' : 'text-white';
  const logoFilter = scrolled || !isHome ? '' : 'brightness-0 invert';

  return (
    <>
      <header className={`fixed w-full z-50 transition-all duration-500 ${headerBg}`}>
        <div className="container mx-auto max-w-7xl px-6 flex justify-between items-center">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 group">
            <img
              src="/logo-gold.png"
              alt="Eva's Garden"
              className={`h-10 md:h-12 transition-all duration-300 ${logoFilter}`}
            />
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-[11px] uppercase tracking-[0.15em] font-semibold transition-all
                   hover:text-gold-400 ${textColor} ${isActive ? 'text-gold-400' : ''}`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-gold-400 rounded-full"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}

            <NavLink
              to="/contact"
              className={`ml-4 px-6 py-2.5 rounded-full text-[11px] uppercase tracking-[0.15em] font-bold
                          transition-all duration-300 ${
                scrolled || !isHome
                  ? 'bg-navy-900 text-white hover:bg-navy-800'
                  : 'bg-gold-400 text-navy-950 hover:bg-gold-300'
              }`}
            >
              Inquire
            </NavLink>

            {user && (
              <NavLink
                to={user.role === 'admin' ? '/admin' : '/manager'}
                className="ml-2 px-4 py-2.5 rounded-full text-[11px] uppercase tracking-[0.15em] font-bold
                           bg-gold-400/20 text-gold-600 hover:bg-gold-400/30 transition-all"
              >
                Dashboard
              </NavLink>
            )}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 ${textColor}`}
          >
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-navy-950 flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-6 text-white/80 hover:text-white p-2"
            >
              <FiX size={28} />
            </button>

            <img src="/logo-gold.png" alt="Eva's Garden" className="h-16 mb-12 opacity-80" />

            <nav className="flex flex-col items-center gap-6">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <NavLink
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `text-2xl font-serif tracking-widest transition-colors ${
                        isActive ? 'text-gold-400' : 'text-white hover:text-gold-300'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <NavLink
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-6 btn-primary inline-block"
                >
                  Inquire Now
                </NavLink>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
