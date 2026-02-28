import { FaWhatsapp } from 'react-icons/fa';
import { CONTACT_INFO } from '../../constants';

export default function FloatingWhatsApp() {
  return (
    <a
      href={CONTACT_INFO.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] rounded-full flex items-center
                 justify-center shadow-xl shadow-green-500/30 hover:scale-110 transition-transform
                 animate-glow"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="text-white" size={28} />
    </a>
  );
}
