
import React from 'react';
import Section from '../components/Section';
import { EVENT_TYPES } from '../constants';

const Events: React.FC = () => {
  return (
    <div className="pt-20 md:pt-32">
      <Section bg="bg-white">
        <div className="text-center mb-20">
          <span className="text-stone-400 text-xs uppercase tracking-[0.4em] mb-4 block">Curated Moments</span>
          <h2 className="text-4xl md:text-6xl serif mb-6 italic">Beyond Weddings</h2>
          <p className="text-stone-500 max-w-2xl mx-auto leading-relaxed">
            Beyond weddings, Eva’s Garden is an ideal setting for curated events and meaningful gatherings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EVENT_TYPES.slice(1).map((event, idx) => (
            <div key={idx} className="group relative h-[450px] overflow-hidden rounded-2xl shadow-lg">
              <img 
                src={event.image} 
                alt={event.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="text-2xl serif mb-2">{event.title}</h3>
                <p className="text-sm text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="bg-stone-100" className="text-center">
        <h2 className="text-3xl serif mb-10">Have a unique idea?</h2>
        <p className="text-stone-600 mb-10 max-w-lg mx-auto italic">Our expansive lawns and serene atmosphere are the perfect canvas for your specific vision.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <span className="px-6 py-2 bg-white rounded-full text-xs text-stone-500 border border-stone-200">Birthdays</span>
          <span className="px-6 py-2 bg-white rounded-full text-xs text-stone-500 border border-stone-200">Anniversaries</span>
          <span className="px-6 py-2 bg-white rounded-full text-xs text-stone-500 border border-stone-200">Engagements</span>
          <span className="px-6 py-2 bg-white rounded-full text-xs text-stone-500 border border-stone-200">Ruracios</span>
          <span className="px-6 py-2 bg-white rounded-full text-xs text-stone-500 border border-stone-200">Corporate Events</span>
          <span className="px-6 py-2 bg-white rounded-full text-xs text-stone-500 border border-stone-200">Photoshoots</span>
        </div>
      </Section>
    </div>
  );
};

export default Events;
