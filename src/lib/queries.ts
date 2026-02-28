import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from './supabase';
import type {
  GalleryItem,
  GalleryCategory,
  Testimonial,
  Inquiry,
  EventType,
  SiteContent,
  Profile,
} from '../types/database';

// ============= GALLERY =============
export function useGalleryItems(categorySlug?: string) {
  return useQuery({
    queryKey: ['gallery', categorySlug],
    queryFn: async () => {
      let query = supabase
        .from('gallery_items')
        .select('*, category:gallery_categories(*)')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (categorySlug && categorySlug !== 'all') {
        const { data: cat } = await supabase
          .from('gallery_categories')
          .select('id')
          .eq('slug', categorySlug)
          .single();
        if (cat) query = query.eq('category_id', cat.id);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as GalleryItem[];
    },
  });
}

export function useGalleryCategories() {
  return useQuery({
    queryKey: ['gallery-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery_categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      if (error) throw error;
      return data as GalleryCategory[];
    },
  });
}

export function useAddGalleryItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (item: Partial<GalleryItem>) => {
      const { data, error } = await supabase.from('gallery_items').insert(item).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['gallery'] }),
  });
}

export function useUpdateGalleryItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<GalleryItem> & { id: string }) => {
      const { data, error } = await supabase.from('gallery_items').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['gallery'] }),
  });
}

export function useDeleteGalleryItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('gallery_items').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['gallery'] }),
  });
}

// ============= TESTIMONIALS =============
export function useTestimonials(approvedOnly = true) {
  return useQuery({
    queryKey: ['testimonials', approvedOnly],
    queryFn: async () => {
      let query = supabase.from('testimonials').select('*').order('created_at', { ascending: false });
      if (approvedOnly) query = query.eq('approved', true);
      const { data, error } = await query;
      if (error) throw error;
      return data as Testimonial[];
    },
  });
}

export function useFeaturedTestimonials() {
  return useQuery({
    queryKey: ['testimonials', 'featured'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('approved', true)
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(6);
      if (error) throw error;
      return data as Testimonial[];
    },
  });
}

export function useSubmitTestimonial() {
  return useMutation({
    mutationFn: async (testimonial: Partial<Testimonial>) => {
      const { data, error } = await supabase.from('testimonials').insert(testimonial).select().single();
      if (error) throw error;
      return data;
    },
  });
}

export function useUpdateTestimonial() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Testimonial> & { id: string }) => {
      const { data, error } = await supabase.from('testimonials').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['testimonials'] }),
  });
}

// ============= INQUIRIES =============
export function useInquiries(status?: string) {
  return useQuery({
    queryKey: ['inquiries', status],
    queryFn: async () => {
      let query = supabase.from('inquiries').select('*').order('created_at', { ascending: false });
      if (status) query = query.eq('status', status);
      const { data, error } = await query;
      if (error) throw error;
      return data as Inquiry[];
    },
  });
}

export function useSubmitInquiry() {
  return useMutation({
    mutationFn: async (inquiry: Partial<Inquiry>) => {
      const { data, error } = await supabase.from('inquiries').insert(inquiry).select().single();
      if (error) throw error;
      return data;
    },
  });
}

export function useUpdateInquiry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Inquiry> & { id: string }) => {
      const { data, error } = await supabase.from('inquiries').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['inquiries'] }),
  });
}

// ============= EVENT TYPES =============
export function useEventTypes() {
  return useQuery({
    queryKey: ['event-types'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('event_types')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      if (error) throw error;
      return data as EventType[];
    },
  });
}

// ============= SITE CONTENT =============
export function useSiteContent(section?: string) {
  return useQuery({
    queryKey: ['site-content', section],
    queryFn: async () => {
      let query = supabase.from('site_content').select('*');
      if (section) query = query.eq('section', section);
      const { data, error } = await query;
      if (error) throw error;
      return data as SiteContent[];
    },
  });
}

export function useUpdateSiteContent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<SiteContent> & { id: string }) => {
      const { data, error } = await supabase
        .from('site_content')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['site-content'] }),
  });
}

// ============= PROFILES (Admin) =============
export function useProfiles() {
  return useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data as Profile[];
    },
  });
}

// ============= ADMIN STATS =============
export function useAdminStats() {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [gallery, testimonials, inquiries, pendingTestimonials, newInquiries] = await Promise.all([
        supabase.from('gallery_items').select('id', { count: 'exact', head: true }),
        supabase.from('testimonials').select('id', { count: 'exact', head: true }),
        supabase.from('inquiries').select('id', { count: 'exact', head: true }),
        supabase.from('testimonials').select('id', { count: 'exact', head: true }).eq('approved', false),
        supabase.from('inquiries').select('id', { count: 'exact', head: true }).eq('status', 'new'),
      ]);
      return {
        totalGallery: gallery.count ?? 0,
        totalTestimonials: testimonials.count ?? 0,
        totalInquiries: inquiries.count ?? 0,
        pendingTestimonials: pendingTestimonials.count ?? 0,
        newInquiries: newInquiries.count ?? 0,
      };
    },
  });
}
