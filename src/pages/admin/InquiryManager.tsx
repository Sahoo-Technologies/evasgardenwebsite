import { useState } from 'react';
import toast from 'react-hot-toast';
import { useInquiries, useUpdateInquiry } from '../../lib/queries';
import { format } from 'date-fns';
import { FiMail, FiPhone, FiCalendar, FiUsers, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const STATUS_OPTIONS = [
  { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-700' },
  { value: 'contacted', label: 'Contacted', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'booked', label: 'Booked', color: 'bg-green-100 text-green-700' },
  { value: 'closed', label: 'Closed', color: 'bg-gray-100 text-gray-600' },
];

export default function InquiryManager() {
  const [statusFilter, setStatusFilter] = useState<string>('');
  const { data: inquiries, isLoading } = useInquiries(statusFilter || undefined);
  const updateInquiry = useUpdateInquiry();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateInquiry.mutateAsync({ id, status: status as any });
      toast.success(`Status updated to ${status}`);
    } catch {
      toast.error('Failed to update');
    }
  };

  const handleSaveNotes = async (id: string) => {
    try {
      await updateInquiry.mutateAsync({ id, notes: notes[id] || '' });
      toast.success('Notes saved');
    } catch {
      toast.error('Failed to save notes');
    }
  };

  const exportCSV = () => {
    if (!inquiries) return;
    const headers = ['Name', 'Email', 'Phone', 'Event Type', 'Date', 'Guests', 'Message', 'Status', 'Created'];
    const rows = inquiries.map((i) => [
      i.name, i.email, i.phone, i.event_type,
      i.preferred_date || '', String(i.guest_count || ''),
      i.message.replace(/,/g, ';'), i.status,
      format(new Date(i.created_at), 'yyyy-MM-dd'),
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inquiries-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif text-navy-900 mb-2">Inquiries</h1>
          <p className="text-navy-400 text-sm">{inquiries?.length ?? 0} inquiries</p>
        </div>
        <button onClick={exportCSV} className="px-4 py-2 bg-white border border-surface-200 rounded-xl text-sm font-medium hover:bg-surface-50 transition-colors">
          Export CSV
        </button>
      </div>

      {/* Status filters */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setStatusFilter('')}
          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
            !statusFilter ? 'bg-navy-900 text-white' : 'bg-white border border-surface-200 text-navy-600'
          }`}
        >
          All
        </button>
        {STATUS_OPTIONS.map((s) => (
          <button
            key={s.value}
            onClick={() => setStatusFilter(s.value)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              statusFilter === s.value ? 'bg-navy-900 text-white' : 'bg-white border border-surface-200 text-navy-600'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-4">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="skeleton h-20 rounded-2xl" />)}</div>
      ) : (
        <div className="space-y-3">
          {inquiries?.map((inquiry) => {
            const statusOption = STATUS_OPTIONS.find((s) => s.value === inquiry.status);
            const isExpanded = expandedId === inquiry.id;

            return (
              <div key={inquiry.id} className="admin-card">
                <div
                  className="flex items-center gap-4 cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : inquiry.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-semibold text-navy-900">{inquiry.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${statusOption?.color}`}>
                        {statusOption?.label}
                      </span>
                      {inquiry.event_type && (
                        <span className="text-xs text-navy-400 hidden sm:inline">{inquiry.event_type}</span>
                      )}
                    </div>
                    <p className="text-sm text-navy-500 truncate">{inquiry.message}</p>
                  </div>
                  <div className="text-xs text-navy-400 shrink-0 text-right">
                    {format(new Date(inquiry.created_at), 'MMM d')}
                  </div>
                  {isExpanded ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                </div>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-surface-100 space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      {inquiry.email && (
                        <div className="flex items-center gap-2 text-navy-600">
                          <FiMail size={14} className="text-navy-400" /> {inquiry.email}
                        </div>
                      )}
                      {inquiry.phone && (
                        <div className="flex items-center gap-2 text-navy-600">
                          <FiPhone size={14} className="text-navy-400" /> {inquiry.phone}
                        </div>
                      )}
                      {inquiry.preferred_date && (
                        <div className="flex items-center gap-2 text-navy-600">
                          <FiCalendar size={14} className="text-navy-400" /> {inquiry.preferred_date}
                        </div>
                      )}
                      {inquiry.guest_count && (
                        <div className="flex items-center gap-2 text-navy-600">
                          <FiUsers size={14} className="text-navy-400" /> {inquiry.guest_count} guests
                        </div>
                      )}
                    </div>

                    <div className="bg-surface-50 p-4 rounded-xl">
                      <p className="text-navy-700 text-sm">{inquiry.message}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <label className="text-xs uppercase tracking-wider text-navy-400 font-bold">Status:</label>
                      <div className="flex gap-2">
                        {STATUS_OPTIONS.map((s) => (
                          <button
                            key={s.value}
                            onClick={() => handleStatusChange(inquiry.id, s.value)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              inquiry.status === s.value ? s.color : 'bg-surface-50 text-navy-400 hover:bg-surface-100'
                            }`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-wider text-navy-400 font-bold mb-2 block">Notes:</label>
                      <div className="flex gap-2">
                        <textarea
                          value={notes[inquiry.id] ?? inquiry.notes}
                          onChange={(e) => setNotes({ ...notes, [inquiry.id]: e.target.value })}
                          className="flex-1 px-3 py-2 bg-surface-50 border border-surface-100 rounded-xl text-sm resize-none"
                          rows={2}
                          placeholder="Internal notes..."
                        />
                        <button
                          onClick={() => handleSaveNotes(inquiry.id)}
                          className="px-4 py-2 bg-navy-900 text-white rounded-xl text-xs font-bold self-end"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {inquiries?.length === 0 && (
            <div className="text-center py-16 text-navy-400">
              <p className="font-serif italic text-lg">No inquiries found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
