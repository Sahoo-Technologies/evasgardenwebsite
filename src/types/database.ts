export type UserRole = 'admin' | 'manager';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url: string | null;
  created_at: string;
}

export interface GalleryCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail_url: string | null;
  category_id: string | null;
  title: string;
  alt_text: string;
  description: string;
  featured: boolean;
  sort_order: number;
  uploaded_by: string | null;
  created_at: string;
  category?: GalleryCategory;
}

export interface Testimonial {
  id: string;
  client_name: string;
  event_type: string;
  event_date: string | null;
  rating: number;
  comment: string;
  photo_url: string | null;
  video_url: string | null;
  approved: boolean;
  featured: boolean;
  created_at: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  event_type: string;
  preferred_date: string | null;
  guest_count: number | null;
  message: string;
  status: 'new' | 'contacted' | 'booked' | 'closed';
  notes: string;
  created_at: string;
}

export interface EventType {
  id: string;
  title: string;
  description: string;
  image_url: string;
  tags: string[];
  featured: boolean;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface SiteContent {
  id: string;
  section: string;
  key: string;
  value: string;
  content_type: 'text' | 'image' | 'json';
  updated_by: string | null;
  updated_at: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FeatureSpace {
  title: string;
  description: string;
  icon: string;
  image: string;
}
