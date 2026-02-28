import { useState } from 'react';
import toast from 'react-hot-toast';
import { useEventTypes } from '../../lib/queries';
import { supabase } from '../../lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { FiEdit3, FiTrash2, FiPlus, FiSave, FiX } from 'react-icons/fi';

export default function EventTypeManager() {
  const { data: events, isLoading } = useEventTypes();
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', description: '', image_url: '' });
  const [showAdd, setShowAdd] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('event_types').insert({
        ...form,
        sort_order: (events?.length || 0) + 1,
      });
      if (error) throw error;
      toast.success('Event type added');
      setForm({ title: '', description: '', image_url: '' });
      setShowAdd(false);
      queryClient.invalidateQueries({ queryKey: ['event-types'] });
    } catch {
      toast.error('Failed to add');
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const { error } = await supabase.from('event_types').update(form).eq('id', id);
      if (error) throw error;
      toast.success('Updated');
      setEditingId(null);
      queryClient.invalidateQueries({ queryKey: ['event-types'] });
    } catch {
      toast.error('Failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this event type?')) return;
    try {
      const { error } = await supabase.from('event_types').delete().eq('id', id);
      if (error) throw error;
      toast.success('Deleted');
      queryClient.invalidateQueries({ queryKey: ['event-types'] });
    } catch {
      toast.error('Failed');
    }
  };

  const startEdit = (event: any) => {
    setEditingId(event.id);
    setForm({ title: event.title, description: event.description, image_url: event.image_url });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif text-navy-900 mb-2">Event Types</h1>
          <p className="text-navy-400 text-sm">Manage the event categories shown on the website</p>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} className="btn-navy flex items-center gap-2">
          <FiPlus size={16} /> Add Event Type
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleAdd} className="admin-card mb-8 space-y-4">
          <h3 className="font-serif text-lg text-navy-900">New Event Type</h3>
          <input
            required placeholder="Title" value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-3 bg-surface-50 border border-surface-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-300"
          />
          <textarea
            placeholder="Description" value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-3 bg-surface-50 border border-surface-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-300 resize-none" rows={3}
          />
          <input
            placeholder="Image URL" value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            className="w-full px-4 py-3 bg-surface-50 border border-surface-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-300"
          />
          <button type="submit" className="btn-navy">Add Event Type</button>
        </form>
      )}

      {isLoading ? (
        <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-24 rounded-xl" />)}</div>
      ) : (
        <div className="space-y-3">
          {events?.map((event) => (
            <div key={event.id} className="admin-card flex items-center gap-4">
              {event.image_url && (
                <img src={event.image_url} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                {editingId === event.id ? (
                  <div className="space-y-2">
                    <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full px-3 py-2 bg-surface-50 border border-surface-100 rounded-lg text-sm" />
                    <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                      className="w-full px-3 py-2 bg-surface-50 border border-surface-100 rounded-lg text-sm resize-none" rows={2} />
                  </div>
                ) : (
                  <>
                    <p className="font-semibold text-navy-900">{event.title}</p>
                    <p className="text-sm text-navy-500 truncate">{event.description}</p>
                  </>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                {editingId === event.id ? (
                  <>
                    <button onClick={() => handleUpdate(event.id)} className="p-2 bg-green-50 text-green-600 rounded-xl"><FiSave size={16} /></button>
                    <button onClick={() => setEditingId(null)} className="p-2 text-navy-400 rounded-xl"><FiX size={16} /></button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(event)} className="p-2 text-navy-400 hover:bg-surface-50 rounded-xl"><FiEdit3 size={16} /></button>
                    <button onClick={() => handleDelete(event.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-xl"><FiTrash2 size={16} /></button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
