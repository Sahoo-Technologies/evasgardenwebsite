import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import Layout from './components/layout/Layout';

const AdminLayout = lazy(() => import('./components/layout/AdminLayout'));
const ManagerLayout = lazy(() => import('./components/layout/ManagerLayout'));

import Home from './pages/public/Home';
const About = lazy(() => import('./pages/public/About'));
const Events = lazy(() => import('./pages/public/Events'));
const Gallery = lazy(() => import('./pages/public/Gallery'));
const Testimonials = lazy(() => import('./pages/public/Testimonials'));
const Contact = lazy(() => import('./pages/public/Contact'));
const Login = lazy(() => import('./pages/auth/Login'));

const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const GalleryManager = lazy(() => import('./pages/admin/GalleryManager'));
const TestimonialMod = lazy(() => import('./pages/admin/TestimonialMod'));
const InquiryManager = lazy(() => import('./pages/admin/InquiryManager'));
const ContentEditor = lazy(() => import('./pages/admin/ContentEditor'));
const UserManager = lazy(() => import('./pages/admin/UserManager'));
const EventTypeManager = lazy(() => import('./pages/admin/EventTypeManager'));
const UploadPortal = lazy(() => import('./pages/manager/UploadPortal'));
const MyUploads = lazy(() => import('./pages/manager/MyUploads'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
  </div>
);

function PublicLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default function App() {
  const initialize = useAuthStore((s) => s.initialize);
  useEffect(() => { initialize(); }, [initialize]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<Login />} />

          {/* Admin portal */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="gallery" element={<GalleryManager />} />
            <Route path="testimonials" element={<TestimonialMod />} />
            <Route path="inquiries" element={<InquiryManager />} />
            <Route path="events" element={<EventTypeManager />} />
            <Route path="content" element={<ContentEditor />} />
            <Route path="users" element={<UserManager />} />
          </Route>

          {/* Manager portal */}
          <Route path="/manager" element={<ManagerLayout />}>
            <Route index element={<UploadPortal />} />
            <Route path="uploads" element={<MyUploads />} />
          </Route>

          {/* Public site */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/weddings" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
