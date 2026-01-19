
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NAV_ITEMS, CONTACT_INFO } from '../constants';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-sm py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <NavLink to="/" className={`text-2xl font-bold tracking-widest transition-colors ${scrolled ? 'text-stone-800' : 'text-stone-800 md:text-white'}`}>
          EVA'S GARDEN
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 items-center">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-sm uppercase tracking-widest hover:opacity-70 transition-all ${scrolled ? 'text-stone-800' : 'text-stone-800 md:text-white'}`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#/contact"
            className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest border transition-all ${
              scrolled 
                ? 'bg-stone-800 text-white border-stone-800 hover:bg-stone-700' 
                : 'bg-white text-stone-800 border-white hover:bg-stone-50'
            }`}
          >
            Inquire
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-stone-800 focus:outline-none">
          <div className="w-6 h-0.5 bg-current mb-1.5 transition-all"></div>
          <div className="w-6 h-0.5 bg-current mb-1.5 transition-all"></div>
          <div className="w-6 h-0.5 bg-current transition-all"></div>
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-stone-900 z-50 flex flex-col items-center justify-center space-y-8">
          <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-white text-3xl">&times;</button>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-white text-2xl serif tracking-widest hover:text-stone-300 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 py-16 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-white text-xl mb-6 tracking-widest uppercase">Eva's Garden</h3>
          <p className="text-stone-400 max-w-xs text-sm leading-relaxed italic serif">
            "A timeless outdoor venue nestled in the heart of Redhill, offering a breathtaking natural backdrop for life's most beautiful celebrations."
          </p>
        </div>
        <div>
          <h4 className="text-white text-sm mb-6 tracking-widest uppercase">The Venue</h4>
          <ul className="space-y-4 text-sm">
            <li>Location: {CONTACT_INFO.location}</li>
            <li>Type: {CONTACT_INFO.type}</li>
            <li>Parking: {CONTACT_INFO.parking}</li>
            <li>Power: {CONTACT_INFO.power}</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-sm mb-6 tracking-widest uppercase">Connect</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#/contact" className="hover:text-white transition-colors">Contact Us</a></li>
            <li><a href={CONTACT_INFO.whatsapp} className="hover:text-white transition-colors">WhatsApp</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto border-t border-stone-800 mt-12 pt-8 text-center text-xs tracking-widest text-stone-500 uppercase">
        &copy; {new Date().getFullYear()} Eva's Garden. All rights reserved.
      </div>
    </footer>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
