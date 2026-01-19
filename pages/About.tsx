
import React from 'react';
import Section from '../components/Section';

const About: React.FC = () => {
  return (
    <div className="pt-20 md:pt-32">
      <Section bg="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-stone-400 text-xs uppercase tracking-[0.4em] mb-4 block">The History</span>
            <h2 className="text-4xl md:text-6xl serif mb-8 leading-tight">About Eva’s Garden</h2>
            <div className="space-y-6 text-stone-600 text-lg leading-relaxed">
              <p>
                Eva’s Garden is a beautifully landscaped outdoor venue located in Redhill, Kenya. Designed to blend nature with elegance, the venue offers expansive lawns, mature trees, and a calm atmosphere that allows every celebration to feel personal and intentional.
              </p>
              <p>
                Whether styled simply or transformed into a fully curated event, Eva’s Garden provides a blank canvas where unforgettable moments come to life.
              </p>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=1200" 
              alt="Eva's Garden Landscaping" 
              className="rounded-3xl shadow-2xl relative z-10"
            />
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-stone-100 rounded-full -z-0"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 border border-stone-200 rounded-3xl -z-0"></div>
          </div>
        </div>
      </Section>

      <Section bg="bg-stone-50" id="weddings">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="text-stone-400 text-xs uppercase tracking-[0.4em] mb-4 block">I Do Moments</span>
          <h2 className="text-4xl md:text-5xl serif mb-6">Weddings at Eva’s Garden</h2>
          <p className="text-stone-600 italic">Timeless, intimate, and uniquely yours.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="bg-white p-10 rounded-2xl border border-stone-100 shadow-sm">
            <h3 className="text-2xl serif mb-6 border-b border-stone-100 pb-4">Perfect For:</h3>
            <ul className="space-y-4 text-stone-700">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-stone-800 rounded-full"></span>
                Garden ceremonies
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-stone-800 rounded-full"></span>
                Wedding receptions
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-stone-800 rounded-full"></span>
                Destination & local weddings
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-stone-800 rounded-full"></span>
                Traditional & modern celebrations
              </li>
            </ul>
          </div>
          <div className="bg-stone-900 text-white p-10 rounded-2xl flex flex-col justify-center">
            <h3 className="text-2xl serif mb-6 text-white italic">Your Story, Your Way</h3>
            <p className="text-stone-300 leading-relaxed text-sm uppercase tracking-wide">
              Couples may work with their preferred planners and vendors, subject to venue guidelines, ensuring each wedding reflects their unique love story.
            </p>
            <a 
              href="#/contact" 
              className="mt-8 self-start bg-white text-stone-900 px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-stone-100 transition-colors"
            >
              → Schedule a Site Visit
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default About;
