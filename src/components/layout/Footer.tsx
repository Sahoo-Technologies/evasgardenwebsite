import { NavLink } from 'react-router-dom';
import { CONTACT_INFO } from '../../constants';
import { FiInstagram, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaFacebookF, FaWhatsapp, FaTiktok } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-300 relative overflow-hidden">
      {/* Gold accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />

      <div className="container mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img src="/logo-gold.png" alt="Eva's Garden" className="h-14 mb-6 opacity-90" />
            <p className="text-navy-400 text-sm leading-relaxed italic font-serif max-w-xs">
              "A timeless outdoor venue nestled in the heart of Redhill, offering a breathtaking
              natural backdrop for life's most beautiful celebrations."
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-gold-400 text-[11px] mb-6 tracking-[0.2em] uppercase font-bold">
              Explore
            </h4>
            <ul className="space-y-3 text-sm">
              {['About', 'Weddings', 'Events', 'Gallery', 'Testimonials', 'Contact'].map((link) => (
                <li key={link}>
                  <NavLink
                    to={`/${link.toLowerCase()}`}
                    className="hover:text-gold-400 transition-colors"
                  >
                    {link}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Venue info */}
          <div>
            <h4 className="text-gold-400 text-[11px] mb-6 tracking-[0.2em] uppercase font-bold">
              The Venue
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-gold-400/60 mt-0.5 shrink-0" size={16} />
                {CONTACT_INFO.location}
              </li>
              <li>Type: {CONTACT_INFO.type}</li>
              <li>Capacity: {CONTACT_INFO.capacity}</li>
              <li>Parking: {CONTACT_INFO.parking}</li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="text-gold-400 text-[11px] mb-6 tracking-[0.2em] uppercase font-bold">
              Connect
            </h4>
            <div className="flex gap-3 mb-6">
              {[
                { icon: <FaWhatsapp size={18} />, href: CONTACT_INFO.whatsappUrl, label: 'WhatsApp' },
                { icon: <FiInstagram size={18} />, href: '#', label: 'Instagram' },
                { icon: <FaFacebookF size={16} />, href: '#', label: 'Facebook' },
                { icon: <FaTiktok size={16} />, href: '#', label: 'TikTok' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-navy-700 flex items-center justify-center
                             hover:border-gold-400 hover:text-gold-400 transition-all hover:scale-110"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm hover:text-gold-400 transition-colors"
            >
              <FiPhone size={14} />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-navy-800/50">
        <div className="container mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row justify-between
                        items-center gap-4 text-[10px] tracking-[0.2em] text-navy-500 uppercase">
          <span>&copy; {new Date().getFullYear()} Eva's Garden. Designed for Elegance.</span>
          <NavLink to="/login" className="hover:text-gold-400 transition-colors">
            Staff Portal
          </NavLink>
        </div>
      </div>
    </footer>
  );
}
