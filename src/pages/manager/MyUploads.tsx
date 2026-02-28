import { useState } from 'react';
import toast from 'react-hot-toast';
import { useGalleryItems, useDeleteGalleryItem, useUpdateGalleryItem } from '../../lib/queries';
import { useAuthStore } from '../../stores/authStore';
import { FiTrash2, FiEdit3, FiCheck, FiX } from 'react-icons/fi';

export default function MyUploads() {
  const user = useAuthStore((s) => s.user);
  const { data: allItems, isLoading } = useGalleryItems();
  const deleteItem = useDeleteGalleryItem();
  const updateItem = useUpdateGalleryItem();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const myItems = allItems?.filter((item) => item.uploaded_by === user?.id) || [];

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item?')) return;
    try {
      await deleteItem.mutateAsync(id);
      toast.success('Item deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleEdit = (id: string, title: string) => {
    setEditingId(id);
    setEditTitle(title);
  };

  const handleSaveEdit = async (id: string) => {
    try {
      await updateItem.mutateAsync({ id, title: editTitle, alt_text: editTitle });
      toast.success('Updated');
      setEditingId(null);
    } catch {
      toast.error('Failed to update');
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-navy-900 mb-2">My Uploads</h1>
        <p className="text-navy-400 text-sm">{myItems.length} items uploaded</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-48 rounded-xl" />
          ))}
        </div>
      ) : myItems.length === 0 ? (
        <div className="text-center py-20 text-navy-400">
          <p className="font-serif italic text-lg">No uploads yet. Start uploading from the Upload page!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {myItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-surface-100 overflow-hidden group">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={item.thumbnail_url || item.url}
                  alt={item.alt_text}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <button
                    onClick={() => handleEdit(item.id, item.title)}
                    className="p-2 bg-white/90 rounded-lg hover:bg-white shadow-lg"
                  >
                    <FiEdit3 size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 bg-white/90 rounded-lg hover:bg-red-50 text-red-500 shadow-lg"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="p-3">
                {editingId === item.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="flex-1 text-sm bg-surface-50 border border-surface-100 rounded-lg px-2 py-1"
                      autoFocus
                    />
                    <button onClick={() => handleSaveEdit(item.id)} className="text-green-500"><FiCheck size={16} /></button>
                    <button onClick={() => setEditingId(null)} className="text-navy-400"><FiX size={16} /></button>
                  </div>
                ) : (
                  <p className="text-sm text-navy-700 truncate">{item.title || item.alt_text}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
