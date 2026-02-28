# Eva's Garden - Timeless Outdoor Venue

A modern, immersive venue website built with React, TypeScript, Tailwind CSS v4, Framer Motion, and Supabase.

## Features

### Public Site
- Cinematic video hero with golden particle effects
- Scroll-triggered animations throughout
- Immersive masonry photo/video gallery with lightbox
- AI-powered event concierge (Gemini)
- Client testimonials with star ratings
- Inquiry form with WhatsApp integration
- Responsive design for all devices

### Manager Portal (`/manager`)
- Drag-and-drop photo/video upload
- Bulk upload with category assignment
- My Uploads management (edit, delete)

### Admin Dashboard (`/admin`)
- Statistics overview
- Gallery management (CRUD, feature, reorder)
- Testimonial moderation (approve/reject/feature)
- Inquiry inbox with status tracking and CSV export
- Website content editor
- Event type management
- Staff user management

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Framer Motion
- **State**: Zustand, TanStack React Query
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **AI**: Google Gemini
- **UI**: Swiper, React Icons, React Hot Toast, React Dropzone

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your keys:

```bash
cp .env.example .env.local
```

Required variables:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anon/public key
- `VITE_GEMINI_API_KEY` - Your Google Gemini API key

### 3. Set up Supabase database

Run the SQL in `supabase/schema.sql` in your Supabase SQL Editor to create all tables with RLS policies and seed data.

Create these storage buckets in Supabase (all public):
- `gallery` - Photos and videos
- `avatars` - User profile photos
- `testimonials` - Testimonial media

### 4. Create the first admin user

Sign up a user in Supabase Auth, then update their profile role:

```sql
UPDATE public.profiles SET role = 'admin' WHERE email = 'your-email@example.com';
```

### 5. Run development server

```bash
npm run dev
```

Visit `http://localhost:3000`

### 6. Build for production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/
    common/     - ScrollReveal, LazyImage, GoldParticles, StatsCounter, ErrorBoundary
    gallery/    - GalleryGrid, GalleryCard, Lightbox
    layout/     - Header, Footer, Layout, AdminLayout, ManagerLayout, FloatingWhatsApp
  pages/
    public/     - Home, About, Events, Gallery, Testimonials, Contact
    admin/      - Dashboard, GalleryManager, TestimonialMod, InquiryManager, ContentEditor, UserManager, EventTypeManager
    manager/    - UploadPortal, MyUploads
    auth/       - Login
  lib/          - supabase.ts, storage.ts, queries.ts, geminiService.ts
  stores/       - authStore.ts, uiStore.ts
  types/        - database.ts
  styles/       - index.css (Tailwind v4 theme)
```
