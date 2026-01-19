
import React, { useState } from 'react';
import Section from '../components/Section';
import { GALLERY_IMAGES } from '../constants';

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'empty' | 'setup' | 'aerial' | 'sunset'>('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages = filter === 'all' 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === filter);

  const categories = [
    { id: 'all', label: 'All Moments', icon: '📸' },
    { id: 'empty', label: 'The Canvas', icon: '🌿' },
    { id: 'setup', label: 'Celebrations', icon: '✨' },
    { id: 'aerial', label: 'Bird\'s Eye', icon: '🦅' },
    { id: 'sunset', label: 'Golden Hour', icon: '🌅' },
  ];

  return (
    <div className="pt-20 md:pt-32">
      <Section bg="bg-gradient-to-b from-purple-50 to-white">
        <div className="text-center mb-16">
          <span className="text-purple-400 text-xs uppercase tracking-[0.4em] mb-4 block font-bold">Visual Story</span>
          <h2 className="text-4xl md:text-7xl serif mb-6 text-purple-950">Moments at Eva's Garden</h2>
          <p className="text-purple-600/60 italic mb-12 text-lg md:text-xl">"Where every frame tells a story of love, laughter, and natural beauty"</p>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 border-b border-purple-100 pb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id as any)}
                className={`flex items-center gap-2 text-xs uppercase tracking-[0.3em] pb-3 transition-all border-b-2 font-bold group ${
                  filter === cat.id 
                    ? 'border-purple-800 text-purple-900' 
                    : 'border-transparent text-purple-400 hover:text-purple-600 hover:border-purple-200'
                }`}
              >
                <span className="text-lg group-hover:scale-110 transition-transform">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredImages.map((img, idx) => (
            <div 
              key={idx} 
              className="break-inside-avoid overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer transform hover:-translate-y-2"
              onClick={() => setSelectedImage(idx)}
            >
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={img.url} 
                  alt={img.alt} 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm font-medium drop-shadow-lg">{img.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl max-h-[90vh]">
            <img 
              src={filteredImages[selectedImage].url} 
              alt={filteredImages[selectedImage].alt} 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
            <button 
              className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/50 rounded-full p-2 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="absolute bottom-4 left-4 right-4 text-center text-white">
              <p className="text-lg drop-shadow-lg">{filteredImages[selectedImage].alt}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
