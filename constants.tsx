
import { NavItem, FeatureSpace, EventType, GalleryImage } from './types';

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
    description: 'Say your vows surrounded by lush greenery, open skies, and nature at its most beautiful. Our garden ceremony area provides a romantic and peaceful setting for unforgettable “I do” moments.',
    icon: 'leaf',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: '✨ Reception & Celebration Area',
    description: 'The expansive lawn transforms seamlessly from a daytime celebration to an elegant evening reception, accommodating both tented and open-air setups.',
    icon: 'sparkles',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: '🍃 Pre-Event & Cocktail Lawn',
    description: 'Perfect for welcome drinks, guest mingling, and golden-hour photos, this space offers a relaxed transition between ceremony and celebration.',
    icon: 'cocktail',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=1200',
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

export const GALLERY_IMAGES: GalleryImage[] = [
  { url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200', category: 'empty', alt: 'Empty garden lawn' },
  { url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1200', category: 'setup', alt: 'Wedding reception setup' },
  { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200', category: 'aerial', alt: 'Aerial view of greenery' },
  { url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1200', category: 'sunset', alt: 'Sunset over the garden' },
  { url: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?auto=format&fit=crop&q=80&w=1200', category: 'empty', alt: 'Mature trees in Eva\'s Garden' },
  { url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1200', category: 'setup', alt: 'Tented garden event' },
];

export const CONTACT_INFO = {
  location: 'Redhill, Kenya',
  type: 'Outdoor garden venue',
  capacity: 'Flexible (Enquire for details)',
  parking: 'Available',
  power: 'Available / Generator-friendly',
  accessibility: 'Easy vendor access',
  whatsapp: 'https://wa.me/254000000000', // Placeholder
};
