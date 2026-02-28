import { motion } from 'framer-motion';
import { FiPlay } from 'react-icons/fi';
import LazyImage from '../common/LazyImage';

interface GalleryCardProps {
  type: 'image' | 'video';
  url: string;
  alt: string;
  poster?: string;
  onClick: () => void;
  index: number;
}

export default function GalleryCard({ type, url, alt, poster, onClick, index }: GalleryCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="break-inside-avoid mb-6 group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-2xl bg-navy-950/5 shadow-lg hover:shadow-2xl
                      transition-all duration-500 transform hover:-translate-y-2">
        <div className="relative overflow-hidden">
          <LazyImage
            src={type === 'video' ? (poster || '/evasgardenvidzjpeg.jpeg') : url}
            alt={alt}
            className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-110
                       group-hover:brightness-110"
            wrapperClassName="aspect-[4/3]"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Video play button */}
          {type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center
                              justify-center shadow-xl group-hover:scale-110 transition-transform">
                <FiPlay className="text-navy-950 ml-1" size={24} />
              </div>
            </div>
          )}

          {/* Caption on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full
                          group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-white text-sm font-medium drop-shadow-lg">{alt}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
