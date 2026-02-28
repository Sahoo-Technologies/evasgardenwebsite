-- Eva's Garden Database Schema
-- Run this in Supabase SQL Editor to set up all tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES (extends Supabase auth.users)
-- ============================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'manager' CHECK (role IN ('admin', 'manager')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles readable by everyone"
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can manage all profiles"
  ON public.profiles FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'manager')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- GALLERY CATEGORIES
-- ============================================
CREATE TABLE public.gallery_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT DEFAULT '📸',
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.gallery_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories readable by everyone"
  ON public.gallery_categories FOR SELECT USING (true);

CREATE POLICY "Admins can manage categories"
  ON public.gallery_categories FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Seed default categories
INSERT INTO public.gallery_categories (name, slug, icon, sort_order) VALUES
  ('All Moments', 'all', '📸', 0),
  ('The Canvas', 'empty', '🌿', 1),
  ('Celebrations', 'setup', '✨', 2),
  ('Bird''s Eye', 'aerial', '🦅', 3),
  ('Golden Hour', 'sunset', '🌅', 4),
  ('Videos', 'video', '🎥', 5);

-- ============================================
-- GALLERY ITEMS
-- ============================================
CREATE TABLE public.gallery_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL DEFAULT 'image' CHECK (type IN ('image', 'video')),
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  category_id UUID REFERENCES public.gallery_categories(id) ON DELETE SET NULL,
  title TEXT DEFAULT '',
  alt_text TEXT DEFAULT '',
  description TEXT DEFAULT '',
  featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gallery items readable by everyone"
  ON public.gallery_items FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert gallery items"
  ON public.gallery_items FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update own uploads"
  ON public.gallery_items FOR UPDATE USING (
    uploaded_by = auth.uid()
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can delete any gallery item"
  ON public.gallery_items FOR DELETE USING (
    uploaded_by = auth.uid()
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- TESTIMONIALS
-- ============================================
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name TEXT NOT NULL,
  event_type TEXT DEFAULT '',
  event_date DATE,
  rating INT NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  photo_url TEXT,
  video_url TEXT,
  approved BOOLEAN NOT NULL DEFAULT false,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approved testimonials readable by everyone"
  ON public.testimonials FOR SELECT USING (approved = true OR auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can submit a testimonial"
  ON public.testimonials FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage testimonials"
  ON public.testimonials FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- INQUIRIES
-- ============================================
CREATE TABLE public.inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  event_type TEXT DEFAULT '',
  preferred_date DATE,
  guest_count INT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'booked', 'closed')),
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an inquiry"
  ON public.inquiries FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view inquiries"
  ON public.inquiries FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage inquiries"
  ON public.inquiries FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can delete inquiries"
  ON public.inquiries FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- EVENT TYPES
-- ============================================
CREATE TABLE public.event_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.event_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Event types readable by everyone"
  ON public.event_types FOR SELECT USING (true);

CREATE POLICY "Admins can manage event types"
  ON public.event_types FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Seed default event types
INSERT INTO public.event_types (title, description, image_url, tags, featured, sort_order) VALUES
  ('Weddings', 'Timeless ceremonies and receptions tailored to your unique love story.', 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800', ARRAY['ceremony', 'reception', 'outdoor'], true, 0),
  ('Birthdays & Anniversaries', 'Celebrate your milestones in a setting as special as the journey you''re honoring.', 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80&w=800', ARRAY['birthday', 'anniversary', 'milestone'], false, 1),
  ('Engagements & Ruracios', 'Traditional and modern pre-wedding celebrations amidst serene nature.', 'https://images.unsplash.com/photo-1544590639-65636006f140?auto=format&fit=crop&q=80&w=800', ARRAY['engagement', 'ruracio', 'traditional'], false, 2),
  ('Corporate & Team Events', 'Professional gatherings that inspire creativity and team bonding.', 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800', ARRAY['corporate', 'team', 'professional'], false, 3),
  ('Photoshoots & Styled Shoots', 'A versatile blank canvas for creative professionals and unforgettable captures.', 'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?auto=format&fit=crop&q=80&w=800', ARRAY['photoshoot', 'styled', 'creative'], false, 4);

-- ============================================
-- SITE CONTENT (editable via admin)
-- ============================================
CREATE TABLE public.site_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section TEXT NOT NULL,
  key TEXT NOT NULL,
  value TEXT NOT NULL DEFAULT '',
  content_type TEXT NOT NULL DEFAULT 'text' CHECK (content_type IN ('text', 'image', 'json')),
  updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(section, key)
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Site content readable by everyone"
  ON public.site_content FOR SELECT USING (true);

CREATE POLICY "Admins can manage site content"
  ON public.site_content FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Seed default content
INSERT INTO public.site_content (section, key, value, content_type) VALUES
  ('hero', 'title', 'EVA''S GARDEN', 'text'),
  ('hero', 'subtitle', 'Where Nature''s Beauty Meets Timeless Elegance', 'text'),
  ('hero', 'video_url', '/evasvideo.mp4', 'text'),
  ('hero', 'image_url', '/header.jpeg', 'image'),
  ('about', 'title', 'About Eva''s Garden', 'text'),
  ('about', 'description', 'Eva''s Garden is a beautifully landscaped outdoor venue located in Redhill, Kenya. Designed to blend nature with elegance, the venue offers expansive lawns, mature trees, and a calm atmosphere that allows every celebration to feel personal and intentional.', 'text'),
  ('contact', 'location', 'Redhill, Kenya', 'text'),
  ('contact', 'type', 'Outdoor garden venue', 'text'),
  ('contact', 'capacity', 'Flexible (Enquire for details)', 'text'),
  ('contact', 'parking', 'Available', 'text'),
  ('contact', 'accessibility', 'Easy vendor access', 'text'),
  ('contact', 'whatsapp_number', '254000000000', 'text'),
  ('stats', 'events_hosted', '200', 'text'),
  ('stats', 'years_of_service', '5', 'text'),
  ('stats', 'guest_capacity', '500', 'text');

-- ============================================
-- STORAGE BUCKETS (run via Supabase dashboard or API)
-- ============================================
-- Create these buckets in Supabase Storage:
-- 1. 'gallery' - for gallery photos and videos (public)
-- 2. 'avatars' - for user profile photos (public)
-- 3. 'testimonials' - for testimonial photos/videos (public)

-- Storage policies (apply via dashboard):
-- gallery bucket: public read, authenticated write
-- avatars bucket: public read, authenticated write
-- testimonials bucket: public read, anyone can write
