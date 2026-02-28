import { Link } from 'react-router-dom';
import ScrollReveal from '../../components/common/ScrollReveal';
import Section from '../../components/common/Section';
import { useEventTypes } from '../../lib/queries';
import LazyImage from '../../components/common/LazyImage';

const FALLBACK_EVENTS = [
  { title: 'Birthdays & Anniversaries', description: 'Celebrate your milestones in a setting as special as the journey you\'re honoring.', image_url: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80&w=800' },
  { title: 'Engagements & Ruracios', description: 'Traditional and modern pre-wedding celebrations amidst serene nature.', image_url: 'https://images.unsplash.com/photo-1544590639-65636006f140?auto=format&fit=crop&q=80&w=800' },
  { title: 'Corporate & Team Events', description: 'Professional gatherings that inspire creativity and team bonding.', image_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800' },
  { title: 'Photoshoots & Styled Shoots', description: 'A versatile blank canvas for creative professionals and unforgettable captures.', image_url: 'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?auto=format&fit=crop&q=80&w=800' },
];

export default function Events() {
  const { data: dbEvents } = useEventTypes();
  const events = dbEvents?.length ? dbEvents.filter((e) => e.title !== 'Weddings') : FALLBACK_EVENTS;

  return (
    <div className="pt-20 md:pt-32">
      <Section bg="bg-white">
        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="section-label">Curated Moments</span>
            <h2 className="text-4xl md:text-7xl font-serif mb-6 italic text-navy-950">
              Beyond Weddings
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed text-lg">
              Beyond weddings, Eva's Garden is an ideal setting for curated events and meaningful gatherings.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className="group relative h-[480px] overflow-hidden rounded-3xl shadow-2xl shadow-navy-900/10">
                <LazyImage
                  src={event.image_url}
                  alt={event.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000
                             group-hover:scale-110"
                  wrapperClassName="absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <h3 className="text-2xl font-serif mb-2">{event.title}</h3>
                  <p className="text-sm text-navy-200 opacity-0 group-hover:opacity-100 transition-opacity
                                duration-500 leading-relaxed line-clamp-3">
                    {event.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <Section bg="bg-surface-50" className="text-center">
        <ScrollReveal>
          <h2 className="text-4xl font-serif mb-12 text-navy-950">Have a unique idea?</h2>
          <p className="text-gray-500 mb-12 max-w-xl mx-auto italic leading-relaxed font-serif">
            Our expansive lawns and serene atmosphere are the perfect canvas for your specific vision.
          </p>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto mb-12">
            {['Birthdays', 'Anniversaries', 'Engagements', 'Ruracios', 'Corporate Events', 'Photoshoots'].map((tag) => (
              <span
                key={tag}
                className="px-6 py-2.5 bg-white rounded-full text-xs text-navy-800 border border-surface-200
                           font-bold tracking-widest hover:border-gold-300 hover:bg-gold-50 transition-all cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
          <Link to="/contact" className="btn-navy inline-block">
            Tell Us Your Vision
          </Link>
        </ScrollReveal>
      </Section>
    </div>
  );
}
