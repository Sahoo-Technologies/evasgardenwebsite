import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../../stores/uiStore';
import { FiX, FiChevronLeft, FiChevronRight, FiShare2 } from 'react-icons/fi';

export default function Lightbox() {
  const { lightbox, closeLightbox, setLightboxIndex } = useUIStore();
  const { isOpen, currentIndex, items } = lightbox;
  const current = items[currentIndex];

  const goNext = useCallback(() => {
    if (currentIndex < items.length - 1) setLightboxIndex(currentIndex + 1);
  }, [currentIndex, items.length, setLightboxIndex]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) setLightboxIndex(currentIndex - 1);
  }, [currentIndex, setLightboxIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, closeLightbox, goNext, goPrev]);

  const handleShare = async () => {
    if (!current) return;
    if (navigator.share) {
      await navigator.share({ title: current.alt, url: current.url });
    } else {
      await navigator.clipboard.writeText(current.url);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
            <span className="text-white/60 text-sm font-sans">
              {currentIndex + 1} / {items.length}
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => { e.stopPropagation(); handleShare(); }}
                className="text-white/60 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <FiShare2 size={20} />
              </button>
              <button
                onClick={closeLightbox}
                className="text-white/60 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>
          </div>

          {/* Navigation arrows */}
          {currentIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white/60 hover:text-white
                         p-3 rounded-full hover:bg-white/10 transition-all"
            >
              <FiChevronLeft size={32} />
            </button>
          )}
          {currentIndex < items.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white/60 hover:text-white
                         p-3 rounded-full hover:bg-white/10 transition-all"
            >
              <FiChevronRight size={32} />
            </button>
          )}

          {/* Media content */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-6xl max-h-[85vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {current.type === 'image' ? (
              <img
                src={current.url}
                alt={current.alt}
                className="max-w-full max-h-[85vh] object-contain rounded-lg select-none"
                draggable={false}
              />
            ) : (
              <video
                src={current.url}
                poster={current.poster}
                controls
                autoPlay
                playsInline
                className="max-w-full max-h-[85vh] object-contain rounded-lg bg-black"
              />
            )}
          </motion.div>

          {/* Caption */}
          <div className="absolute bottom-6 left-0 right-0 text-center">
            <p className="text-white/80 text-sm font-sans">{current.alt}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
