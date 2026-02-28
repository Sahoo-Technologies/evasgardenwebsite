import toast from 'react-hot-toast';
import { useTestimonials, useUpdateTestimonial } from '../../lib/queries';
import { FiCheck, FiX, FiStar } from 'react-icons/fi';
import { format } from 'date-fns';

export default function TestimonialMod() {
  const { data: testimonials, isLoading } = useTestimonials(false);
  const updateTestimonial = useUpdateTestimonial();

  const pending = testimonials?.filter((t) => !t.approved) || [];
  const approved = testimonials?.filter((t) => t.approved) || [];

  const handleApprove = async (id: string) => {
    try {
      await updateTestimonial.mutateAsync({ id, approved: true });
      toast.success('Testimonial approved');
    } catch {
      toast.error('Failed to approve');
    }
  };

  const handleReject = async (id: string) => {
    if (!confirm('Reject this testimonial?')) return;
    try {
      await updateTestimonial.mutateAsync({ id, approved: false });
      toast.success('Testimonial rejected');
    } catch {
      toast.error('Failed');
    }
  };

  const handleToggleFeatured = async (id: string, current: boolean) => {
    try {
      await updateTestimonial.mutateAsync({ id, featured: !current });
      toast.success(current ? 'Unfeatured' : 'Featured on homepage');
    } catch {
      toast.error('Failed');
    }
  };

  if (isLoading) {
    return <div className="space-y-4">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="skeleton h-32 rounded-2xl" />)}</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-navy-900 mb-2">Testimonial Moderation</h1>
        <p className="text-navy-400 text-sm">{pending.length} pending review</p>
      </div>

      {/* Pending */}
      {pending.length > 0 && (
        <div className="mb-12">
          <h2 className="text-lg font-serif text-navy-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-400 rounded-full" /> Pending Approval
          </h2>
          <div className="space-y-4">
            {pending.map((t) => (
              <div key={t.id} className="admin-card flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-navy-900">{t.client_name}</span>
                    {t.event_type && <span className="text-xs bg-surface-100 text-navy-500 px-2 py-0.5 rounded-full">{t.event_type}</span>}
                    <div className="flex gap-0.5 ml-2">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <FiStar key={i} className="text-gold-400 fill-gold-400" size={12} />
                      ))}
                    </div>
                  </div>
                  <p className="text-navy-600 text-sm italic">"{t.comment}"</p>
                  <p className="text-xs text-navy-400 mt-2">{format(new Date(t.created_at), 'MMM d, yyyy')}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleApprove(t.id)}
                    className="p-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors"
                    title="Approve"
                  >
                    <FiCheck size={18} />
                  </button>
                  <button
                    onClick={() => handleReject(t.id)}
                    className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors"
                    title="Reject"
                  >
                    <FiX size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approved */}
      <h2 className="text-lg font-serif text-navy-800 mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-green-400 rounded-full" /> Approved ({approved.length})
      </h2>
      <div className="space-y-3">
        {approved.map((t) => (
          <div key={t.id} className="admin-card flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-navy-900 text-sm">{t.client_name}</span>
                {t.featured && <span className="text-[10px] bg-gold-100 text-gold-700 px-2 py-0.5 rounded-full font-bold">FEATURED</span>}
              </div>
              <p className="text-navy-500 text-xs truncate">"{t.comment}"</p>
            </div>
            <button
              onClick={() => handleToggleFeatured(t.id, t.featured)}
              className={`p-2 rounded-xl transition-colors ${t.featured ? 'bg-gold-100 text-gold-600' : 'bg-surface-50 text-navy-300 hover:bg-gold-50'}`}
              title={t.featured ? 'Remove from homepage' : 'Feature on homepage'}
            >
              <FiStar size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
