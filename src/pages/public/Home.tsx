import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import ScrollReveal from '../../components/common/ScrollReveal';
import Section from '../../components/common/Section';
import GoldParticles from '../../components/common/GoldParticles';
import StatsCounter from '../../components/common/StatsCounter';
import LazyImage from '../../components/common/LazyImage';
import { FEATURED_SPACES } from '../../constants';
import { useFeaturedTestimonials } from '../../lib/queries';
import { FiArrowRight, FiStar, FiChevronDown } from 'react-icons/fi';

export default function Home() {
  const { data: testimonials } = useFeaturedTestimonials();

  return (
    <div>
      {/* ===== CINEMATIC HERO ===== */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video / Image background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/header.jpeg"
            className="w-full h-full object-cover scale-105"
          >
            <source src="/evasvideo.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/40 via-navy-950/50 to-navy-950/80" />
        </div>

        {/* Floating particles */}
        <GoldParticles count={25} />

        {/* Hero content */}
        <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="text-gold-400 text-xs uppercase tracking-[0.6em] mb-6 block font-bold">
              Welcome to
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            <img
              src="/logo-gold.png"
              alt="Eva's Garden"
              className="h-24 md:h-36 mx-auto mb-6 drop-shadow-2xl"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed mb-12
                       tracking-wide text-white/80 italic font-serif"
          >
            Where Nature's Beauty Meets Timeless Elegance
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <Link to="/contact" className="btn-primary">
              Schedule Your Visit
            </Link>
            <Link to="/gallery" className="btn-secondary text-white border-white/40 hover:bg-white/10">
              Explore Gallery
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <FiChevronDown className="text-gold-400/60 animate-bounce" size={20} />
        </motion.div>
      </section>

      {/* ===== INTRO ===== */}
      <Section bg="bg-white">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center">
            <span className="section-label">Welcome</span>
            <h2 className="section-title italic">Serenity in Every Detail</h2>
            <p className="text-lg text-gray-500 leading-relaxed mb-10">
              Tucked away in serene greenery, Eva's Garden offers an elegant garden setting designed
              for unforgettable moments. From intimate ceremonies to grand celebrations, the space
              adapts effortlessly to your vision.
            </p>
            <div className="gold-line" />
          </div>
        </ScrollReveal>
      </Section>

      {/* ===== FEATURED SPACES ===== */}
      <Section bg="bg-gradient-to-b from-surface-50 to-white">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="section-label">Discover</span>
            <h2 className="section-title">Our Featured Spaces</h2>
            <p className="text-navy-500/70 italic text-lg font-serif">
              Explore the different areas of our manicured estate
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED_SPACES.map((space, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.15}>
              <div className="group overflow-hidden rounded-3xl bg-white shadow-xl card-hover
                              border border-surface-100">
                <div className="relative h-80 overflow-hidden">
                  <LazyImage
                    src={space.image}
                    alt={space.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    wrapperClassName="h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/30 via-transparent to-transparent
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-sm rounded-full p-3
                                  text-navy-900 shadow-lg text-xl">
                    {space.icon}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-serif font-semibold mb-3 text-navy-900">
                    {space.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{space.description}</p>
                  <div className="mt-6">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 text-gold-600 font-medium text-sm
                                 hover:text-gold-700 transition-colors group/link"
                    >
                      Inquire about this space
                      <FiArrowRight className="group-hover/link:translate-x-1 transition-transform" size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* ===== STATS ===== */}
      <Section bg="bg-navy-950" className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/evasgarden5.jpeg" alt="" className="w-full h-full object-cover" />
        </div>
        <GoldParticles count={10} />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          <ScrollReveal delay={0}>
            <StatsCounter end={200} suffix="+" label="Events Hosted" />
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <StatsCounter end={5} suffix="+" label="Years of Excellence" />
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <StatsCounter end={500} suffix="+" label="Happy Guests" />
          </ScrollReveal>
        </div>
      </Section>

      {/* ===== TESTIMONIALS ===== */}
      {testimonials && testimonials.length > 0 && (
        <Section bg="bg-white">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="section-label">Kind Words</span>
              <h2 className="section-title italic">What Our Clients Say</h2>
            </div>
          </ScrollReveal>

          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            spaceBetween={32}
            slidesPerView={1}
            breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            className="pb-12"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <div className="bg-surface-50 p-8 rounded-2xl border border-surface-100 h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: t.rating }, (_, i) => (
                      <FiStar key={i} className="text-gold-400 fill-gold-400" size={16} />
                    ))}
                  </div>
                  <p className="text-navy-700 italic font-serif text-lg leading-relaxed mb-6">
                    "{t.comment}"
                  </p>
                  <div className="flex items-center gap-3">
                    {t.photo_url && (
                      <img src={t.photo_url} alt={t.client_name}
                           className="w-10 h-10 rounded-full object-cover" />
                    )}
                    <div>
                      <p className="font-semibold text-navy-900 text-sm">{t.client_name}</p>
                      {t.event_type && (
                        <p className="text-xs text-navy-400">{t.event_type}</p>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="text-center mt-8">
            <Link to="/testimonials" className="btn-navy inline-block">
              Read All Reviews
            </Link>
          </div>
        </Section>
      )}

      {/* ===== CTA ===== */}
      <Section bg="bg-navy-950" className="text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/evasgarden5.jpeg')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="absolute top-0 right-0 -mt-32 -mr-32 w-96 h-96 bg-gold-400 rounded-full blur-[160px] opacity-10" />
        <div className="absolute bottom-0 left-0 -mb-32 -ml-32 w-96 h-96 bg-gold-400 rounded-full blur-[160px] opacity-5" />
        <GoldParticles count={12} />

        <div className="relative z-10">
          <ScrollReveal>
            <span className="text-gold-400 text-xs uppercase tracking-[0.6em] mb-6 block font-bold">
              Ready to Begin
            </span>
            <h2 className="text-3xl md:text-6xl font-serif mb-8">Let's Create Magic Together</h2>
            <p className="mb-12 text-navy-300 max-w-2xl mx-auto text-lg leading-relaxed">
              Your dream celebration awaits in our garden paradise. From intimate gatherings to
              grand celebrations, we're here to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link to="/contact" className="btn-primary">
                Start Planning
              </Link>
              <Link to="/gallery" className="btn-secondary">
                View Inspiration
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </Section>
    </div>
  );
}
