import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import ScrollReveal from '../../components/common/ScrollReveal';
import Section from '../../components/common/Section';
import { CONTACT_INFO } from '../../constants';
import { useSubmitInquiry } from '../../lib/queries';
import { getEventInquiry } from '../../lib/geminiService';
import { FaWhatsapp } from 'react-icons/fa';
import { FiMapPin, FiSend, FiMessageCircle, FiLoader } from 'react-icons/fi';

export default function Contact() {
  const [tab, setTab] = useState<'form' | 'ai'>('form');
  const [inquiry, setInquiry] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const submitInquiry = useSubmitInquiry();

  const [form, setForm] = useState({
    name: '', email: '', phone: '', event_type: '', preferred_date: '', guest_count: '', message: '',
  });

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitInquiry.mutateAsync({
        ...form,
        guest_count: form.guest_count ? parseInt(form.guest_count) : null,
        preferred_date: form.preferred_date || null,
      });
      toast.success('Inquiry submitted! We\'ll get back to you soon.');
      setForm({ name: '', email: '', phone: '', event_type: '', preferred_date: '', guest_count: '', message: '' });
    } catch {
      toast.error('Something went wrong. Please try WhatsApp instead.');
    }
  };

  const handleAiConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiry.trim()) return;
    setAiLoading(true);
    const result = await getEventInquiry(inquiry);
    setAiResponse(result);
    setAiLoading(false);
  };

  return (
    <div className="pt-20 md:pt-32">
      <Section bg="bg-surface-50/50">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="section-label">Get In Touch</span>
              <h2 className="text-4xl md:text-7xl font-serif mb-6 italic text-navy-950 leading-tight">
                Let's Create Something Beautiful
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                We'd love to host your next celebration at Eva's Garden.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Info + WhatsApp */}
            <div className="space-y-8">
              <ScrollReveal direction="left">
                <div className="bg-white p-8 rounded-2xl shadow-lg shadow-navy-900/5 border border-surface-100">
                  <h3 className="text-xl font-serif mb-6 border-b pb-4 border-surface-100 text-navy-900">
                    Venue Information
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { label: 'Location', value: CONTACT_INFO.location },
                      { label: 'Type', value: CONTACT_INFO.type },
                      { label: 'Capacity', value: CONTACT_INFO.capacity },
                      { label: 'Parking', value: CONTACT_INFO.parking },
                      { label: 'Access', value: CONTACT_INFO.accessibility },
                    ].map((info) => (
                      <div key={info.label}>
                        <h4 className="text-[10px] uppercase tracking-[0.2em] text-gold-600 mb-1 font-bold">
                          {info.label}
                        </h4>
                        <p className="text-navy-800 text-sm font-medium">{info.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="left" delay={0.1}>
                <div className="bg-navy-900 p-10 rounded-2xl text-center shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient" />
                  <h4 className="text-white font-serif text-2xl italic mb-3">Direct Inquiry</h4>
                  <p className="text-navy-300 text-sm mb-6">Preferred for quick checks and bookings</p>
                  <a
                    href={CONTACT_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full
                               font-bold hover:bg-[#1ebe57] transition-all transform hover:scale-105 shadow-xl"
                  >
                    <FaWhatsapp size={22} />
                    Chat on WhatsApp
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="left" delay={0.2}>
                <div className="bg-white p-6 rounded-2xl border border-surface-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <FiMapPin className="text-gold-400" size={20} />
                    <h4 className="font-serif text-lg text-navy-900">Find Us</h4>
                  </div>
                  <div className="rounded-xl overflow-hidden h-48 bg-surface-100">
                    <iframe
                      title="Eva's Garden Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.751!2d36.78!3d-1.18!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTAnNDguMCJTIDM2wrA0Nic0OC4wIkU!5e0!3m2!1sen!2ske!4v1!5m2!1sen!2ske"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Form / AI */}
            <ScrollReveal direction="right">
              <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl shadow-navy-900/5 border border-surface-100">
                {/* Tab switcher */}
                <div className="flex gap-2 mb-8 bg-surface-50 rounded-xl p-1">
                  <button
                    onClick={() => setTab('form')}
                    className={`flex-1 py-3 rounded-lg text-xs uppercase tracking-[0.15em] font-bold transition-all
                                ${tab === 'form' ? 'bg-navy-900 text-white shadow-lg' : 'text-navy-500 hover:text-navy-700'}`}
                  >
                    <FiSend className="inline mr-2" size={14} />
                    Inquiry Form
                  </button>
                  <button
                    onClick={() => setTab('ai')}
                    className={`flex-1 py-3 rounded-lg text-xs uppercase tracking-[0.15em] font-bold transition-all
                                ${tab === 'ai' ? 'bg-navy-900 text-white shadow-lg' : 'text-navy-500 hover:text-navy-700'}`}
                  >
                    <FiMessageCircle className="inline mr-2" size={14} />
                    AI Concierge
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {tab === 'form' ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      onSubmit={handleSubmitForm}
                      className="space-y-5"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          required
                          placeholder="Full Name *"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="col-span-2 sm:col-span-1 px-4 py-3 bg-surface-50 border border-surface-100
                                     rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-300 transition-all"
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="col-span-2 sm:col-span-1 px-4 py-3 bg-surface-50 border border-surface-100
                                     rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-300 transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          placeholder="Phone"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="px-4 py-3 bg-surface-50 border border-surface-100 rounded-xl text-sm
                                     focus:outline-none focus:ring-2 focus:ring-gold-300 transition-all"
                        />
                        <select
                          value={form.event_type}
                          onChange={(e) => setForm({ ...form, event_type: e.target.value })}
                          className="px-4 py-3 bg-surface-50 border border-surface-100 rounded-xl text-sm
                                     focus:outline-none focus:ring-2 focus:ring-gold-300 transition-all"
                        >
                          <option value="">Event Type</option>
                          <option>Wedding</option>
                          <option>Birthday</option>
                          <option>Anniversary</option>
                          <option>Engagement</option>
                          <option>Corporate</option>
                          <option>Photoshoot</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="date"
                          value={form.preferred_date}
                          onChange={(e) => setForm({ ...form, preferred_date: e.target.value })}
                          className="px-4 py-3 bg-surface-50 border border-surface-100 rounded-xl text-sm
                                     focus:outline-none focus:ring-2 focus:ring-gold-300 transition-all"
                        />
                        <input
                          type="number"
                          placeholder="Guest Count"
                          value={form.guest_count}
                          onChange={(e) => setForm({ ...form, guest_count: e.target.value })}
                          className="px-4 py-3 bg-surface-50 border border-surface-100 rounded-xl text-sm
                                     focus:outline-none focus:ring-2 focus:ring-gold-300 transition-all"
                        />
                      </div>
                      <textarea
                        required
                        placeholder="Tell us about your vision... *"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 bg-surface-50 border border-surface-100 rounded-xl text-sm
                                   focus:outline-none focus:ring-2 focus:ring-gold-300 transition-all resize-none"
                      />
                      <button
                        type="submit"
                        disabled={submitInquiry.isPending}
                        className="w-full btn-navy disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submitInquiry.isPending ? 'Sending...' : 'Send Inquiry'}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="ai"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      {aiResponse ? (
                        <div className="space-y-6">
                          <div className="bg-surface-50 p-6 rounded-xl border border-surface-100">
                            <div className="flex items-center gap-2 mb-4">
                              <div className="w-8 h-8 bg-gold-400 rounded-full flex items-center justify-center">
                                <FiMessageCircle className="text-navy-950" size={16} />
                              </div>
                              <span className="text-xs uppercase tracking-wider text-gold-600 font-bold">
                                AI Concierge
                              </span>
                            </div>
                            <p className="text-navy-800 leading-relaxed whitespace-pre-wrap">{aiResponse}</p>
                          </div>
                          <button
                            onClick={() => { setAiResponse(null); setInquiry(''); }}
                            className="text-sm text-gold-600 hover:text-gold-700 font-medium underline underline-offset-4"
                          >
                            Ask another question
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleAiConsult} className="space-y-6">
                          <p className="text-gray-500 italic font-serif">
                            Describe your dream event or ask any question. Our AI concierge will
                            help you visualize it at Eva's Garden.
                          </p>
                          <textarea
                            value={inquiry}
                            onChange={(e) => setInquiry(e.target.value)}
                            placeholder="e.g. I'm looking for a sunset garden wedding with a rustic theme for about 150 guests..."
                            rows={5}
                            className="w-full px-4 py-3 bg-surface-50 border border-surface-100 rounded-xl text-sm
                                       focus:outline-none focus:ring-2 focus:ring-gold-300 transition-all resize-none"
                          />
                          <button
                            type="submit"
                            disabled={aiLoading}
                            className="w-full btn-navy disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            {aiLoading && <FiLoader className="animate-spin" size={16} />}
                            {aiLoading ? 'Thinking...' : 'Get Personalized Ideas'}
                          </button>
                        </form>
                      )}
                      <p className="text-[9px] uppercase tracking-[0.3em] text-navy-300 text-center mt-6">
                        Powered by Gemini AI
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Section>
    </div>
  );
}
