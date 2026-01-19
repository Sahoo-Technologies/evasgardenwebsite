
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
      <Section bg="bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-stone-400 text-xs uppercase tracking-[0.4em] mb-4 block">Get In Touch</span>
            <h2 className="text-4xl md:text-6xl serif mb-6 italic">Let’s Create Something Beautiful</h2>
            <p className="text-stone-500 max-w-2xl mx-auto">
              We’d love to host your next celebration at Eva’s Garden. Get in touch to check availability, schedule a viewing, or request more information.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Details & Info */}
            <div className="space-y-12">
              <div className="bg-white p-10 rounded-2xl shadow-sm border border-stone-100">
                <h3 className="text-2xl serif mb-8 border-b pb-4 border-stone-50">Venue Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-4">
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-stone-400 mb-2">Location</h4>
                    <p className="text-stone-800">{CONTACT_INFO.location}</p>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-stone-400 mb-2">Type</h4>
                    <p className="text-stone-800">{CONTACT_INFO.type}</p>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-stone-400 mb-2">Capacity</h4>
                    <p className="text-stone-800">{CONTACT_INFO.capacity}</p>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-stone-400 mb-2">Parking</h4>
                    <p className="text-stone-800">{CONTACT_INFO.parking}</p>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-stone-400 mb-2">Power</h4>
                    <p className="text-stone-800">{CONTACT_INFO.power}</p>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-stone-400 mb-2">Accessibility</h4>
                    <p className="text-stone-800">{CONTACT_INFO.accessibility}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center p-8 bg-stone-900 rounded-2xl text-center">
                <div className="space-y-6">
                  <h4 className="text-white serif text-2xl italic">Direct Inquiry</h4>
                  <p className="text-stone-400 text-sm">Preferred for quick checks and bookings</p>
                  <a 
                    href={CONTACT_INFO.whatsapp} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-green-600 text-white px-8 py-4 rounded-full font-bold hover:bg-green-700 transition-all transform hover:scale-105"
                  >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884 0 2.225.569 3.967 1.582 5.513l-.999 3.646 3.84-.984s.46.29.066.126zM17.387 14.39c-.295-.147-1.744-.859-2.013-.957-.268-.099-.463-.147-.659.148-.195.295-.756.957-.927 1.154-.171.197-.341.221-.637.074-.295-.147-1.248-.46-2.379-1.468-.88-.785-1.472-1.754-1.644-2.049-.171-.295-.018-.454.129-.601.134-.132.295-.345.443-.517.148-.172.197-.295.295-.492.099-.197.05-.369-.025-.517-.074-.147-.659-1.589-.902-2.171-.237-.568-.478-.49-.659-.499-.17-.008-.365-.01-.56-.01-.195 0-.512.074-.78.369-.268.295-1.024 1.001-1.024 2.44s1.048 2.829 1.195 3.026c.147.197 2.064 3.151 4.997 4.415.698.301 1.244.481 1.67.617.7.223 1.338.192 1.841.118.561-.083 1.744-.713 1.989-1.402.245-.689.245-1.279.171-1.402-.074-.123-.268-.197-.563-.344z"/></svg>
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* AI Assistant Form */}
            <div className="bg-white p-10 rounded-2xl shadow-xl border border-stone-100 flex flex-col h-full">
              <div className="mb-8">
                <h3 className="text-2xl serif mb-2">Plan with AI</h3>
                <p className="text-sm text-stone-400 uppercase tracking-widest">Eva's Garden Concierge</p>
              </div>
              
              <div className="flex-grow">
                {aiResponse ? (
                  <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 animate-fade-in mb-6">
                    <p className="text-stone-700 italic serif text-lg leading-relaxed mb-6">
                      "{aiResponse}"
                    </p>
                    <button 
                      onClick={() => setAiResponse(null)}
                      className="text-stone-400 text-xs uppercase tracking-widest hover:text-stone-800 transition-colors"
                    >
                      Ask another question
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleAiConsult} className="space-y-6">
                    <p className="text-stone-600 text-sm leading-relaxed">
                      Describe your dream event or ask any question. Our AI assistant will help you visualize it at our venue.
                    </p>
                    <textarea 
                      value={inquiry}
                      onChange={(e) => setInquiry(e.target.value)}
                      placeholder="e.g. I'm looking for a sunset garden wedding with a rustic theme for about 150 guests..."
                      className="w-full h-40 p-4 bg-stone-50 border border-stone-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-stone-300 transition-all resize-none"
                    ></textarea>
                    <button 
                      disabled={loading}
                      type="submit"
                      className={`w-full py-4 rounded-full text-xs uppercase tracking-[0.2em] font-bold transition-all ${
                        loading ? 'bg-stone-200 text-stone-400 cursor-not-allowed' : 'bg-stone-800 text-white hover:bg-stone-700'
                      }`}
                    >
                      {loading ? 'Consulting Assistant...' : 'Get Personalized Ideas'}
                    </button>
                  </form>
                )}
              </div>

              <div className="mt-8 pt-8 border-t border-stone-50 text-center">
                <p className="text-[10px] uppercase tracking-widest text-stone-300">
                  Powered by Gemini AI Experience
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
