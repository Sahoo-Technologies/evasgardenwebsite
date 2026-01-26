
import React, { useState } from 'react';
import Section from '../components/Section';
import { CONTACT_INFO } from '../constants';
import { getEventInquiry } from '../geminiService';

const Contact: React.FC = () => {
  const [inquiry, setInquiry] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAiConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiry.trim()) return;
    
    setLoading(true);
    const result = await getEventInquiry(inquiry);
    setAiResponse(result || null);
    setLoading(false);
  };

  return (
    <div className="pt-20 md:pt-32">
      <Section bg="bg-purple-50/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-purple-400 text-xs uppercase tracking-[0.4em] mb-4 block font-bold">Get In Touch</span>
            <h2 className="text-4xl md:text-7xl serif mb-6 italic text-purple-950 leading-tight">Let’s Create Something Beautiful</h2>
            <p className="text-stone-500 max-w-2xl mx-auto text-lg">
              We’d love to host your next celebration at Eva’s Garden. Get in touch to check availability, schedule a viewing, or request more information.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Details & Info */}
            <div className="space-y-12">
              <div className="bg-white p-10 rounded-3xl shadow-xl shadow-purple-900/5 border border-purple-100">
                <h3 className="text-2xl serif mb-8 border-b pb-6 border-purple-50 text-purple-900">Venue Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-6">
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.3em] text-purple-400 mb-2 font-bold">Location</h4>
                    <p className="text-stone-800 font-medium">{CONTACT_INFO.location}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.3em] text-purple-400 mb-2 font-bold">Type</h4>
                    <p className="text-stone-800 font-medium">{CONTACT_INFO.type}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.3em] text-purple-400 mb-2 font-bold">Capacity</h4>
                    <p className="text-stone-800 font-medium">{CONTACT_INFO.capacity}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.3em] text-purple-400 mb-2 font-bold">Parking</h4>
                    <p className="text-stone-800 font-medium">{CONTACT_INFO.parking}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.3em] text-purple-400 mb-2 font-bold">Accessibility</h4>
                    <p className="text-stone-800 font-medium">{CONTACT_INFO.accessibility}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center p-12 bg-purple-900 rounded-3xl text-center shadow-2xl shadow-purple-900/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-purple-200"></div>
                <div className="space-y-8 relative z-10">
                  <h4 className="text-white serif text-3xl italic">Direct Inquiry</h4>
                  <p className="text-purple-200 text-sm tracking-wide">Preferred for quick checks and bookings</p>
                  <a 
                    href={CONTACT_INFO.whatsappUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-4 bg-[#25D366] text-white px-10 py-5 rounded-full font-bold hover:bg-[#1ebe57] transition-all transform hover:scale-105 shadow-xl"
                  >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72 1.05 4.105 1.604 5.711 1.604h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* AI Assistant Form */}
            <div className="bg-white p-10 md:p-12 rounded-3xl shadow-2xl shadow-purple-900/10 border border-purple-100 flex flex-col h-full">
              <div className="mb-10">
                <h3 className="text-3xl serif mb-3 text-purple-950">Plan with AI</h3>
                <p className="text-[10px] text-purple-400 uppercase tracking-[0.4em] font-bold">Eva's Garden Concierge</p>
              </div>
              
              <div className="flex-grow">
                {aiResponse ? (
                  <div className="bg-purple-50 p-8 rounded-2xl border border-purple-100 animate-fade-in mb-8 relative">
                    <div className="absolute -top-4 -left-4 w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center text-white shadow-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                    </div>
                    <p className="text-purple-900 italic serif text-xl leading-relaxed mb-8 pt-2">
                      "{aiResponse}"
                    </p>
                    <button 
                      onClick={() => setAiResponse(null)}
                      className="text-purple-500 text-[10px] uppercase tracking-[0.2em] font-bold hover:text-purple-800 transition-colors border-b border-purple-200 pb-1"
                    >
                      Ask another question
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleAiConsult} className="space-y-8">
                    <p className="text-stone-600 leading-relaxed italic serif">
                      Describe your dream event or ask any question. Our AI assistant will help you visualize it at our venue.
                    </p>
                    <div className="relative">
                      <textarea 
                        value={inquiry}
                        onChange={(e) => setInquiry(e.target.value)}
                        placeholder="e.g. I'm looking for a sunset garden wedding with a rustic theme for about 150 guests..."
                        className="w-full h-48 p-6 bg-purple-50/50 border border-purple-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all resize-none text-stone-800 placeholder:text-purple-300"
                      ></textarea>
                    </div>
                    <button 
                      disabled={loading}
                      type="submit"
                      className={`w-full py-5 rounded-full text-xs uppercase tracking-[0.3em] font-bold transition-all shadow-xl ${
                        loading ? 'bg-purple-100 text-purple-300 cursor-not-allowed' : 'bg-purple-800 text-white hover:bg-purple-900 transform hover:-translate-y-1'
                      }`}
                    >
                      {loading ? 'Consulting Assistant...' : 'Get Personalized Ideas'}
                    </button>
                  </form>
                )}
              </div>

              <div className="mt-12 pt-8 border-t border-purple-50 text-center">
                <p className="text-[9px] uppercase tracking-[0.4em] text-purple-300/60 font-medium">
                  Intelligent Venue Concierge by Gemini
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Contact;
