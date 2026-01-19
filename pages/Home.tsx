
import React from 'react';
import Section from '../components/Section';
import { FEATURED_SPACES } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=2000" 
            alt="Eva's Garden" 
            className="w-full h-full object-cover filter brightness-75 scale-105 animate-slow-zoom"
          />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl md:text-8xl font-light mb-6 tracking-tight leading-none serif">
            A Venue Like No Other
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-10 tracking-wide">
            Eva’s Garden is a timeless outdoor venue nestled in the heart of Redhill, offering a breathtaking natural backdrop for weddings and elegant celebrations.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a 
              href="#/contact" 
              className="bg-white text-stone-900 px-10 py-4 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-stone-100 transition-all transform hover:-translate-y-1"
            >
              Schedule a Site Visit
            </a>
            <a 
              href="#/gallery" 
              className="text-white border border-white px-10 py-4 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-white/10 transition-all"
            >
              View the Gallery
            </a>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Intro Section */}
      <Section bg="bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-stone-400 text-xs uppercase tracking-[0.4em] mb-4 block">Welcome</span>
          <h2 className="text-4xl md:text-5xl serif mb-8 text-stone-800 italic">Serenity in Every Detail</h2>
          <p className="text-lg text-stone-600 leading-relaxed mb-12">
            Tucked away in serene greenery, Eva’s Garden offers an elegant garden setting designed for unforgettable moments. From intimate ceremonies to grand celebrations, the space adapts effortlessly to your vision.
          </p>
          <div className="w-24 h-px bg-stone-200 mx-auto"></div>
        </div>
      </Section>

      {/* Featured Spaces */}
      <Section id="spaces" bg="bg-stone-50">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl serif mb-4">Our Featured Spaces</h2>
          <p className="text-stone-500 italic">Explore the different areas of our manicured estate</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {FEATURED_SPACES.map((space, idx) => (
            <div key={idx} className="group overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="h-72 overflow-hidden">
                <img 
                  src={space.image} 
                  alt={space.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl serif font-semibold mb-4 text-stone-800">{space.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{space.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Quick Contact CTA */}
      <Section bg="bg-stone-900" className="text-white text-center">
        <h2 className="text-3xl md:text-5xl serif mb-8">Ready to Start Planning?</h2>
        <p className="mb-10 text-stone-400 max-w-xl mx-auto uppercase tracking-widest text-xs">A blank canvas awaits your creative vision.</p>
        <a 
          href="#/contact" 
          className="inline-block border border-stone-700 text-white px-12 py-5 rounded-full hover:bg-white hover:text-stone-900 transition-all uppercase tracking-widest text-xs font-bold"
        >
          Book Your Appointment
        </a>
      </Section>

      <style>{`
        @keyframes slow-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s linear infinite alternate;
        }
        .fade-in {
          animation: fadeIn 1.2s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Home;
