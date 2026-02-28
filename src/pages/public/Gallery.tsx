import ScrollReveal from '../../components/common/ScrollReveal';
import Section from '../../components/common/Section';
import GalleryGrid from '../../components/gallery/GalleryGrid';

export default function Gallery() {
  return (
    <div className="pt-20 md:pt-32">
      <Section bg="bg-gradient-to-b from-surface-50 to-white">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="section-label">Visual Story</span>
            <h2 className="text-4xl md:text-7xl font-serif mb-6 text-navy-950">
              Moments at Eva's Garden
            </h2>
            <p className="text-navy-400 italic text-lg md:text-xl font-serif max-w-2xl mx-auto">
              "Where every frame tells a story of love, laughter, and natural beauty"
            </p>
          </div>
        </ScrollReveal>

        <GalleryGrid />
      </Section>
    </div>
  );
}
