import type { NavItem, FeatureSpace } from './types/database';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Weddings', href: '/weddings' },
  { label: 'Events', href: '/events' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
];

export const FEATURED_SPACES: FeatureSpace[] = [
  {
    title: 'The Garden Ceremony Space',
    description:
      'Say your vows surrounded by lush greenery, open skies, and nature at its most beautiful. Our garden ceremony area provides a romantic and peaceful setting for unforgettable "I do" moments.',
    icon: '🌿',
    image: '/cocktail.jpeg',
  },
  {
    title: 'Reception & Celebration Area',
    description:
      'The expansive lawn transforms seamlessly from a daytime celebration to an elegant evening reception, accommodating both tented and open-air setups.',
    icon: '✨',
    image: '/gardenspace.jpeg',
  },
  {
    title: 'Pre-Event & Cocktail Lawn',
    description:
      'Perfect for welcome drinks, guest mingling, and golden-hour photos, this space offers a relaxed transition between ceremony and celebration.',
    icon: '🍃',
    image: '/receptionandcelebration.jpeg',
  },
];

export const CONTACT_INFO = {
  location: 'Redhill, Kenya',
  type: 'Outdoor garden venue',
  capacity: 'Flexible (Enquire for details)',
  parking: 'Available',
  accessibility: 'Easy vendor access',
  whatsappNumber: '254000000000',
  whatsappUrl:
    "https://wa.me/254000000000?text=Hello%20Eva's%20Garden,%20I'd%20like%20to%20inquire%20about%20booking%20the%20venue%20for%20an%20event.",
};

export const FALLBACK_GALLERY = [
  { type: 'image' as const, url: '/header.jpeg', category: 'sunset', alt: "Eva's Garden entrance view" },
  { type: 'image' as const, url: '/evasgarden4.jpeg', category: 'setup', alt: "Elegant event setup" },
  { type: 'image' as const, url: '/evasgarden5.jpeg', category: 'sunset', alt: "Golden hour" },
  { type: 'image' as const, url: '/evasgarden6.jpeg', category: 'empty', alt: "Lush greenery" },
  { type: 'image' as const, url: '/evasgarden8.jpeg', category: 'sunset', alt: "Sunset moments" },
  { type: 'image' as const, url: '/evasgarden9.jpeg', category: 'empty', alt: "Serene landscape" },
  { type: 'image' as const, url: '/evasgarden10.jpeg', category: 'setup', alt: "Event preparation" },
  { type: 'image' as const, url: '/evasgarden11.jpeg', category: 'aerial', alt: "Bird's eye view" },
  { type: 'image' as const, url: '/evasgarden12.jpeg', category: 'empty', alt: "Garden view" },
  { type: 'image' as const, url: '/evasgarden13.jpeg', category: 'setup', alt: "Event styling" },
  { type: 'image' as const, url: '/evasgarden14.jpeg', category: 'sunset', alt: "Warm evening light" },
  { type: 'image' as const, url: '/evasgarden15.jpeg', category: 'setup', alt: "Reception detail" },
  { type: 'image' as const, url: '/evasgarden16.jpeg', category: 'empty', alt: "Open garden space" },
  { type: 'image' as const, url: '/evasgarden17.jpeg', category: 'setup', alt: "Celebration moment" },
  { type: 'image' as const, url: '/evasgardens3.jpeg', category: 'aerial', alt: "Aerial venue view" },
  { type: 'image' as const, url: '/evasgardenheli.jpeg', category: 'aerial', alt: "Aerial venue grounds" },
  { type: 'image' as const, url: '/evasgardenheli2.jpeg', category: 'aerial', alt: "Aerial landscape" },
  { type: 'image' as const, url: '/evasgardenimages.jpeg', category: 'empty', alt: "Garden greenery" },
  { type: 'image' as const, url: '/evasgardenimagesd.jpeg', category: 'setup', alt: "Styled garden setup" },
  { type: 'image' as const, url: '/evasgardensimages.jpeg', category: 'sunset', alt: "Golden hour at venue" },
  { type: 'image' as const, url: '/cocktail.jpeg', category: 'setup', alt: "Cocktail lawn setting" },
  { type: 'image' as const, url: '/gardenspace.jpeg', category: 'empty', alt: "Garden ceremony space" },
  { type: 'image' as const, url: '/receptionandcelebration.jpeg', category: 'setup', alt: "Reception area" },
  { type: 'video' as const, url: '/evasvideo.mp4', category: 'video', alt: "Venue walkthrough", poster: '/evasgardenvidzjpeg.jpeg' },
  { type: 'video' as const, url: '/evasvideos.mp4', category: 'video', alt: "Eva's Garden highlights", poster: '/evasgardenvidzjpeg.jpeg' },
];

export const FALLBACK_CATEGORIES = [
  { slug: 'all', name: 'All Moments', icon: '📸' },
  { slug: 'empty', name: 'The Canvas', icon: '🌿' },
  { slug: 'setup', name: 'Celebrations', icon: '✨' },
  { slug: 'aerial', name: "Bird's Eye", icon: '🦅' },
  { slug: 'sunset', name: 'Golden Hour', icon: '🌅' },
  { slug: 'video', name: 'Videos', icon: '🎥' },
];
