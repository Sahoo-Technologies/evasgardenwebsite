
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
            src="/header.jpeg" 
            alt="Eva's Garden" 
            className="w-full h-full object-cover filter brightness-[0.4] scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-purple-900/30 to-purple-950/60"></div>
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <div className="mb-8 animate-fade-in-up">
            <span className="text-purple-200 text-xs uppercase tracking-[0.6em] mb-6 block font-bold">Welcome to</span>
            <h1 className="text-6xl md:text-9xl font-light mb-6 tracking-tight leading-none serif">
              EVA'S GARDEN
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed mb-12 tracking-wide text-purple-50/90 italic">
              Where Nature's Beauty Meets Timeless Elegance
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 animate-fade-in-up animation-delay-300">
            <a 
              href="#/contact" 
              className="bg-white text-purple-950 px-12 py-5 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-purple-50 transition-all transform hover:-translate-y-2 shadow-2xl hover:shadow-purple-300/25"
            >
              Schedule Your Visit
            </a>
            <a 
              href="#/gallery" 
              className="text-white border-2 border-white/60 backdrop-blur-sm px-12 py-5 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-white/10 transition-all transform hover:-translate-y-2"
            >
              Explore Gallery
            </a>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/60 text-xs uppercase tracking-widest">Scroll</span>
            <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <Section bg="bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-purple-400 text-xs uppercase tracking-[0.4em] mb-4 block font-bold">Welcome</span>
          <h2 className="text-4xl md:text-6xl serif mb-8 text-purple-950 italic">Serenity in Every Detail</h2>
          <p className="text-lg text-stone-600 leading-relaxed mb-12">
            Tucked away in serene greenery, Eva’s Garden offers an elegant garden setting designed for unforgettable moments. From intimate ceremonies to grand celebrations, the space adapts effortlessly to your vision.
          </p>
          <div className="w-24 h-px bg-purple-100 mx-auto"></div>
        </div>
      </Section>

      {/* Featured Spaces */}
      <Section id="spaces" bg="bg-gradient-to-b from-purple-50/30 to-white">
        <div className="text-center mb-16">
          <span className="text-purple-400 text-xs uppercase tracking-[0.4em] mb-4 block font-bold">Discover</span>
          <h2 className="text-4xl md:text-6xl serif mb-4 text-purple-950">Our Featured Spaces</h2>
          <p className="text-purple-500/80 italic text-lg">Explore the different areas of our manicured estate</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {FEATURED_SPACES.map((space, idx) => (
            <div key={idx} className="group overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl hover:shadow-purple-200/50 transition-all duration-700 border border-purple-100/50 transform hover:-translate-y-3">
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={space.image} 
                  alt={space.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full p-3 text-purple-900 shadow-lg">
                  <span className="text-2xl">{space.icon}</span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl serif font-semibold mb-4 text-purple-900">{space.title}</h3>
                <p className="text-stone-600 leading-relaxed">{space.description}</p>
                <div className="mt-6">
                  <a 
                    href="#/contact" 
                    className="inline-flex items-center gap-2 text-purple-700 font-medium text-sm hover:text-purple-900 transition-colors"
                  >
                    Inquire about this space
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Quick Contact CTA */}
      <Section bg="bg-gradient-to-r from-purple-950 via-purple-900 to-purple-950" className="text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-purple-600 rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-purple-400 rounded-full blur-[120px] opacity-10"></div>
        <div className="absolute inset-0 bg-[url('/evasgarden5.jpeg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        
        <div className="relative z-10">
          <div className="animate-fade-in-up">
            <span className="text-purple-300 text-xs uppercase tracking-[0.6em] mb-6 block font-bold">Ready to Begin</span>
            <h2 className="text-3xl md:text-6xl serif mb-8">Let's Create Magic Together</h2>
            <p className="mb-12 text-purple-200 max-w-2xl mx-auto text-lg leading-relaxed">Your dream celebration awaits in our garden paradise. From intimate gatherings to grand celebrations, we're here to bring your vision to life.</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a 
                href="#/contact" 
                className="relative z-10 inline-block bg-white text-purple-950 px-12 py-5 rounded-full hover:bg-purple-50 transition-all transform hover:-translate-y-2 uppercase tracking-widest text-xs font-bold shadow-2xl hover:shadow-purple-300/25"
              >
                Start Planning
              </a>
              <a 
                href="#/gallery" 
                className="relative z-10 inline-block border-2 border-purple-600 text-white px-12 py-5 rounded-full hover:bg-purple-800/50 transition-all transform hover:-translate-y-2 uppercase tracking-widest text-xs font-bold"
              >
                View Inspiration
              </a>
            </div>
          </div>
        </div>
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
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </div>
  );
};

export default Home;
