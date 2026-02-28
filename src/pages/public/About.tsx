import { Link } from 'react-router-dom';
import ScrollReveal from '../../components/common/ScrollReveal';
import Section from '../../components/common/Section';
import LazyImage from '../../components/common/LazyImage';

export default function About() {
  return (
    <div className="pt-20 md:pt-32">
      {/* About Section */}
      <Section bg="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <div>
              <span className="section-label">The Story</span>
              <h2 className="section-title">About Eva's Garden</h2>
              <div className="space-y-6 text-gray-500 text-lg leading-relaxed">
                <p>
                  Eva's Garden is a beautifully landscaped outdoor venue located in Redhill, Kenya.
                  Designed to blend nature with elegance, the venue offers expansive lawns, mature
                  trees, and a calm atmosphere that allows every celebration to feel personal and
                  intentional.
                </p>
                <p>
                  Whether styled simply or transformed into a fully curated event, Eva's Garden
                  provides a blank canvas where unforgettable moments come to life.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="relative">
              <LazyImage
                src="/evasgarden6.jpeg"
                alt="Eva's Garden Landscaping"
                className="rounded-3xl shadow-2xl w-full"
                wrapperClassName="rounded-3xl"
              />
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gold-100 rounded-full -z-10" />
              <div className="absolute -bottom-8 -left-8 w-48 h-48 border border-gold-200 rounded-3xl -z-10" />
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* Weddings */}
      <Section bg="bg-surface-50" id="weddings">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="section-label">I Do Moments</span>
            <h2 className="section-title italic">Weddings at Eva's Garden</h2>
            <p className="text-navy-500/70 italic font-serif text-lg">
              Timeless, intimate, and uniquely yours.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <ScrollReveal delay={0.1}>
            <div className="bg-white p-10 rounded-2xl border border-surface-100 shadow-sm h-full">
              <h3 className="text-2xl font-serif mb-8 border-b border-surface-100 pb-4 text-navy-900">
                Perfect For:
              </h3>
              <ul className="space-y-5 text-gray-600">
                {['Garden ceremonies', 'Wedding receptions', 'Destination & local weddings', 'Traditional & modern celebrations'].map((item) => (
                  <li key={item} className="flex items-center gap-4">
                    <span className="w-2 h-2 bg-gold-400 rounded-full shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="bg-navy-900 text-white p-10 rounded-2xl flex flex-col justify-center shadow-xl
                            relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/20 rounded-full -mr-16 -mt-16" />
              <h3 className="text-3xl font-serif mb-6 italic relative z-10">Your Story, Your Way</h3>
              <p className="text-navy-200 leading-relaxed text-sm relative z-10">
                Preferred vendors listed on our website or subject to your vendors being on our approved list.
              </p>
              <Link
                to="/contact"
                className="mt-10 self-start btn-primary relative z-10"
              >
                Schedule a Site Visit
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </Section>
    </div>
  );
}
