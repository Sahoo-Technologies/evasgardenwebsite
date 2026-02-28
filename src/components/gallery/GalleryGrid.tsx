import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import GalleryCard from './GalleryCard';
import { useUIStore } from '../../stores/uiStore';
import { useGalleryItems, useGalleryCategories } from '../../lib/queries';
import { FALLBACK_GALLERY, FALLBACK_CATEGORIES } from '../../constants';

export default function GalleryGrid() {
  const [filter, setFilter] = useState('all');
  const { data: dbItems } = useGalleryItems();
  const { data: dbCategories } = useGalleryCategories();
  const openLightbox = useUIStore((s) => s.openLightbox);

  const categories = dbCategories?.length
    ? [{ slug: 'all', name: 'All Moments', icon: '📸' }, ...dbCategories.filter((c) => c.slug !== 'all')]
    : FALLBACK_CATEGORIES;

  const items = useMemo(() => {
    const source = dbItems?.length
      ? dbItems.map((item) => ({
          type: item.type,
          url: item.url,
          alt: item.alt_text || item.title,
          poster: item.thumbnail_url || undefined,
          category: item.category?.slug || 'empty',
        }))
      : FALLBACK_GALLERY;

    return filter === 'all' ? source : source.filter((item) => item.category === filter);
  }, [dbItems, filter]);

  const handleOpenLightbox = (index: number) => {
    openLightbox(
      items.map((i) => ({ type: i.type, url: i.url, alt: i.alt, poster: i.poster })),
      index
    );
  };

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setFilter(cat.slug)}
            className={`flex items-center gap-2 text-xs uppercase tracking-[0.2em] pb-3 transition-all
                        border-b-2 font-bold group ${
              filter === cat.slug
                ? 'border-gold-400 text-navy-900'
                : 'border-transparent text-navy-400 hover:text-navy-600 hover:border-gold-200'
            }`}
          >
            <span className="text-lg group-hover:scale-110 transition-transform">{cat.icon}</span>
            <span className="hidden sm:inline">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="masonry-grid">
        <AnimatePresence mode="popLayout">
          {items.map((item, idx) => (
            <GalleryCard
              key={`${item.url}-${idx}`}
              type={item.type}
              url={item.url}
              alt={item.alt}
              poster={item.poster}
              onClick={() => handleOpenLightbox(idx)}
              index={idx}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {items.length === 0 && (
        <div className="text-center py-20 text-navy-400">
          <p className="text-lg font-serif italic">No moments in this category yet</p>
        </div>
      )}
    </div>
  );
}
