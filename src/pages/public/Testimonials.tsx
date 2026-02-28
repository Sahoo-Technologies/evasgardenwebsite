import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import ScrollReveal from '../../components/common/ScrollReveal';
import Section from '../../components/common/Section';
import { useTestimonials, useSubmitTestimonial } from '../../lib/queries';
import { FiStar, FiSend } from 'react-icons/fi';

export default function Testimonials() {
  const { data: testimonials, isLoading } = useTestimonials(true);
  const submitTestimonial = useSubmitTestimonial();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ client_name: '', event_type: '', rating: 5, comment: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitTestimonial.mutateAsync(form);
      toast.success('Thank you! Your review will appear after approval.');
      setForm({ client_name: '', event_type: '', rating: 5, comment: '' });
      setShowForm(false);
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="pt-20 md:pt-32">
      <Section bg="bg-gradient-to-b from-surface-50 to-white">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="section-label">Kind Words</span>
            <h2 className="text-4xl md:text-7xl font-serif mb-6 text-navy-950 italic">
              What Our Clients Say
            </h2>
            <p className="text-navy-400 italic text-lg font-serif max-w-2xl mx-auto mb-8">
              Real stories from real celebrations at Eva's Garden
            </p>
            <button onClick={() => setShowForm(!showForm)} className="btn-navy">
              <FiSend className="inline mr-2" size={14} />
              Leave a Review
            </button>
          </div>
        </ScrollReveal>

        {/* Review form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-xl mx-auto mb-16 overflow-hidden"
            >
              <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-surface-100 shadow-lg space-y-5">
                <h3 className="font-serif text-xl text-navy-900 mb-4">Share Your Experience</h3>
                <input
                  required
                  placeholder="Your Name *"
                  value={form.client_name}
                  onChange={(e) => setForm({ ...form, client_name: e.target.value })}
                  className="w-full px-4 py-3 bg-surface-50 border border-surface-100 rounded-xl text-sm
                             focus:outline-none focus:ring-2 focus:ring-gold-300"
                />
                <input
                  placeholder="Event Type (e.g. Wedding, Birthday)"
                  value={form.event_type}
                  onChange={(e) => setForm({ ...form, event_type: e.target.value })}
                  className="w-full px-4 py-3 bg-surface-50 border border-surface-100 rounded-xl text-sm
                             focus:outline-none focus:ring-2 focus:ring-gold-300"
                />
                <div>
                  <label className="text-xs uppercase tracking-wider text-navy-500 font-bold mb-2 block">
                    Rating
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setForm({ ...form, rating: star })}
                        className="p-1"
                      >
                        <FiStar
                          size={24}
                          className={`transition-colors ${
                            star <= form.rating
                              ? 'text-gold-400 fill-gold-400'
                              : 'text-surface-200'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  required
                  placeholder="Tell us about your experience... *"
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-surface-50 border border-surface-100 rounded-xl text-sm
                             focus:outline-none focus:ring-2 focus:ring-gold-300 resize-none"
                />
                <button type="submit" disabled={submitTestimonial.isPending} className="btn-navy w-full">
                  {submitTestimonial.isPending ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonial grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton h-64 rounded-2xl" />
            ))}
          </div>
        ) : testimonials && testimonials.length > 0 ? (
          <div className="masonry-grid">
            {testimonials.map((t, idx) => (
              <ScrollReveal key={t.id} delay={idx * 0.05}>
                <div className="break-inside-avoid mb-6 bg-white p-8 rounded-2xl border border-surface-100
                                shadow-sm hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: t.rating }, (_, i) => (
                      <FiStar key={i} className="text-gold-400 fill-gold-400" size={14} />
                    ))}
                    {Array.from({ length: 5 - t.rating }, (_, i) => (
                      <FiStar key={`e-${i}`} className="text-surface-200" size={14} />
                    ))}
                  </div>
                  <p className="text-navy-700 italic font-serif text-lg leading-relaxed mb-6">
                    "{t.comment}"
                  </p>
                  <div className="flex items-center gap-3">
                    {t.photo_url ? (
                      <img src={t.photo_url} alt="" className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center
                                      text-gold-700 font-bold text-sm">
                        {t.client_name[0]}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-navy-900 text-sm">{t.client_name}</p>
                      {t.event_type && <p className="text-xs text-navy-400">{t.event_type}</p>}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-navy-400 font-serif italic text-lg">
              No reviews yet. Be the first to share your experience!
            </p>
          </div>
        )}
      </Section>
    </div>
  );
}
