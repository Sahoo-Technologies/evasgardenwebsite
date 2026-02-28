import { Link } from 'react-router-dom';
import { useAdminStats } from '../../lib/queries';
import { FiImage, FiStar, FiMail, FiAlertCircle, FiArrowRight } from 'react-icons/fi';

export default function Dashboard() {
  const { data: stats, isLoading } = useAdminStats();

  const cards = [
    { label: 'Gallery Items', value: stats?.totalGallery ?? 0, icon: <FiImage size={24} />, color: 'text-blue-500', link: '/admin/gallery' },
    { label: 'Testimonials', value: stats?.totalTestimonials ?? 0, icon: <FiStar size={24} />, color: 'text-gold-400', link: '/admin/testimonials' },
    { label: 'Total Inquiries', value: stats?.totalInquiries ?? 0, icon: <FiMail size={24} />, color: 'text-green-500', link: '/admin/inquiries' },
    { label: 'Pending Reviews', value: stats?.pendingTestimonials ?? 0, icon: <FiAlertCircle size={24} />, color: 'text-orange-500', link: '/admin/testimonials' },
    { label: 'New Inquiries', value: stats?.newInquiries ?? 0, icon: <FiMail size={24} />, color: 'text-red-500', link: '/admin/inquiries' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-navy-900 mb-2">Dashboard</h1>
        <p className="text-navy-400 text-sm">Overview of your venue management</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => <div key={i} className="skeleton h-32 rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {cards.map((card) => (
            <Link
              key={card.label}
              to={card.link}
              className="admin-card hover:shadow-lg transition-all group"
            >
              <div className={`${card.color} mb-3`}>{card.icon}</div>
              <div className="text-3xl font-serif text-navy-900 mb-1">{card.value}</div>
              <div className="text-xs text-navy-400 uppercase tracking-wider font-bold flex items-center gap-1">
                {card.label}
                <FiArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={12} />
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="admin-card">
          <h3 className="font-serif text-xl text-navy-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link to="/admin/gallery" className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-50 transition-colors">
              <span className="text-sm text-navy-700">Manage Gallery</span>
              <FiArrowRight className="text-navy-400" size={16} />
            </Link>
            <Link to="/admin/testimonials" className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-50 transition-colors">
              <span className="text-sm text-navy-700">Review Testimonials</span>
              <FiArrowRight className="text-navy-400" size={16} />
            </Link>
            <Link to="/admin/inquiries" className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-50 transition-colors">
              <span className="text-sm text-navy-700">Check Inquiries</span>
              <FiArrowRight className="text-navy-400" size={16} />
            </Link>
            <Link to="/admin/content" className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-50 transition-colors">
              <span className="text-sm text-navy-700">Edit Website Content</span>
              <FiArrowRight className="text-navy-400" size={16} />
            </Link>
          </div>
        </div>

        <div className="admin-card">
          <h3 className="font-serif text-xl text-navy-900 mb-4">Recent Activity</h3>
          <p className="text-sm text-navy-400 italic">
            Activity tracking will appear here as the platform grows.
          </p>
        </div>
      </div>
    </div>
  );
}
