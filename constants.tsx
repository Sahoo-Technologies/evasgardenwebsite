
import { NavItem, FeatureSpace, EventType, GalleryItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#/' },
  { label: 'About', href: '#/about' },
  { label: 'Weddings', href: '#/weddings' },
  { label: 'Events', href: '#/events' },
  { label: 'Gallery', href: '#/gallery' },
  { label: 'Contact', href: '#/contact' },
];

export const FEATURED_SPACES: FeatureSpace[] = [
  {
    title: '🌿 The Garden Ceremony Space',
    description: 'Say your vows surrounded by lush greenery, open skies, and nature at its most beautiful. Our garden ceremony area provides a romantic and peaceful setting for unforgettable "I do" moments.',
    icon: 'leaf',
    image: '/cocktail.jpeg',
  },
  {
    title: '✨ Reception & Celebration Area',
    description: 'The expansive lawn transforms seamlessly from a daytime celebration to an elegant evening reception, accommodating both tented and open-air setups.',
    icon: 'sparkles',
    image: '/gardenspace.jpeg',
  },
  {
    title: '🍃 Pre-Event & Cocktail Lawn',
    description: 'Perfect for welcome drinks, guest mingling, and golden-hour photos, this space offers a relaxed transition between ceremony and celebration.',
    icon: 'cocktail',
    image: '/receptionandcelebration.jpeg',
  },
];

export const EVENT_TYPES: EventType[] = [
  {
    title: 'Weddings',
    description: 'Timeless ceremonies and receptions tailored to your unique love story.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Birthdays & Anniversaries',
    description: 'Celebrate your milestones in a setting as special as the journey you’re honoring.',
    image: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Engagements & Ruracios',
    description: 'Traditional and modern pre-wedding celebrations amidst serene nature.',
    image: 'https://images.unsplash.com/photo-1544590639-65636006f140?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Corporate & Team Events',
    description: 'Professional gatherings that inspire creativity and team bonding.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Photoshoots & Styled Shoots',
    description: 'A versatile blank canvas for creative professionals and unforgettable captures.',
    image: 'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?auto=format&fit=crop&q=80&w=800',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { type: 'image', url: '/header.jpeg', category: 'sunset', alt: 'Eva\'s Garden entrance view' },
  { type: 'image', url: '/evasgarden4.jpeg', category: 'setup', alt: 'Elegant event setup at Eva\'s Garden' },
  { type: 'image', url: '/evasgarden5.jpeg', category: 'sunset', alt: 'Golden hour at Eva\'s Garden' },
  { type: 'image', url: '/evasgarden6.jpeg', category: 'empty', alt: 'Lush greenery at Eva\'s Garden' },
  { type: 'image', url: '/evasgarden8.jpeg', category: 'sunset', alt: 'Sunset moments at the garden' },
  { type: 'image', url: '/evasgarden9.jpeg', category: 'empty', alt: 'Serene garden landscape' },
  { type: 'image', url: '/evasgarden10.jpeg', category: 'setup', alt: 'Event preparation at Eva\'s Garden' },
  { type: 'image', url: '/evasgarden11.jpeg', category: 'aerial', alt: 'Bird\'s eye view of the venue' },
  { type: 'image', url: '/evasgarden12.jpeg', category: 'empty', alt: 'Garden view at Eva\'s Garden' },
  { type: 'image', url: '/evasgarden13.jpeg', category: 'setup', alt: 'Event styling at Eva\'s Garden' },
  { type: 'image', url: '/evasgarden14.jpeg', category: 'sunset', alt: 'Warm evening light in the garden' },
  { type: 'image', url: '/evasgarden15.jpeg', category: 'setup', alt: 'Reception detail at Eva\'s Garden' },
  { type: 'image', url: '/evasgarden16.jpeg', category: 'empty', alt: 'Open garden space at Eva\'s Garden' },
  { type: 'image', url: '/evasgarden17.jpeg', category: 'setup', alt: 'Celebration moment at Eva\'s Garden' },
  { type: 'image', url: '/evasgardens3.jpeg', category: 'aerial', alt: 'Aerial view of Eva\'s Garden venue' },
  { type: 'image', url: '/evasgardenheli.jpeg', category: 'aerial', alt: 'Aerial view of the venue grounds' },
  { type: 'image', url: '/evasgardenheli2.jpeg', category: 'aerial', alt: 'Aerial venue landscape' },
  { type: 'image', url: '/evasgardenimages.jpeg', category: 'empty', alt: 'Garden greenery and lawn' },
  { type: 'image', url: '/evasgardenimagesd.jpeg', category: 'setup', alt: 'Styled garden setup' },
  { type: 'image', url: '/evasgardensimages.jpeg', category: 'sunset', alt: 'Golden hour at the venue' },
  { type: 'image', url: '/cocktail.jpeg', category: 'setup', alt: 'Cocktail lawn setting' },
  { type: 'image', url: '/gardenspace.jpeg', category: 'empty', alt: 'Garden ceremony space' },
  { type: 'image', url: '/receptionandcelebration.jpeg', category: 'setup', alt: 'Reception and celebration area' },
  { type: 'image', url: '/WhatsApp Image 2026-01-19 at 10.31.37.jpeg', category: 'sunset', alt: 'Evening glow at Eva\'s Garden' },
  {
    type: 'video',
    url: '/evasvideo.mp4',
    poster: '/evasgardenvidzjpeg.jpeg',
    category: 'video',
    alt: 'Venue walkthrough video',
  },
  {
    type: 'video',
    url: '/evasvideos.mp4',
    poster: '/evasgardenvidzjpeg.jpeg',
    category: 'video',
    alt: 'Eva\'s Garden highlights video',
  },
];

export const CONTACT_INFO = {
  location: 'Redhill, Kenya',
  type: 'Outdoor garden venue',
  capacity: 'Flexible (Enquire for details)',
  parking: 'Available',
  accessibility: 'Easy vendor access',
  whatsappNumber: '254000000000',
  whatsappUrl: "https://wa.me/254000000000?text=Hello%20Eva's%20Garden,%20I'd%20like%20to%20inquire%20about%20booking%20the%20venue%20for%20an%20event.",
};
