
import React, { useState } from 'react';
import Section from '../components/Section';
import { GALLERY_IMAGES } from '../constants';

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'empty' | 'setup' | 'aerial' | 'sunset'>('all');

  const filteredImages = filter === 'all' 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === filter);

  const categories = [
    { id: 'all', label: 'All Moments' },
    { id: 'empty', label: 'The Canvas (Empty)' },
    { id: 'setup', label: 'Wedding Setups' },
    { id: 'aerial', label: 'Bird\'s Eye View' },
    { id: 'sunset', label: 'Sunset Glow' },
  ];

  return (
    <div className="pt-20 md:pt-32">
      <Section bg="bg-white">
        <div className="text-center mb-16">
          <span className="text-stone-400 text-xs uppercase tracking-[0.4em] mb-4 block">Visual Story</span>
          <h2 className="text-4xl md:text-6xl serif mb-6">Moments at Eva’s Garden</h2>
          <p className="text-stone-500 italic mb-12 italic">"A blank canvas transformed into unforgettable celebrations."</p>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id as any)}
                className={`text-xs uppercase tracking-widest pb-2 transition-all border-b-2 ${
                  filter === cat.id ? 'border-stone-800 text-stone-800 font-bold' : 'border-transparent text-stone-400 hover:text-stone-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredImages.map((img, idx) => (
            <div key={idx} className="break-inside-avoid overflow-hidden rounded-xl bg-stone-100 group">
              <img 
                src={img.url} 
                alt={img.alt} 
                className="w-full h-auto object-cover hover:opacity-90 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default Gallery;
