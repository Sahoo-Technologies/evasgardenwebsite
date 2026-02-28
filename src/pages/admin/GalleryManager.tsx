import { useState } from 'react';
import toast from 'react-hot-toast';
import { useGalleryItems, useGalleryCategories, useDeleteGalleryItem, useUpdateGalleryItem } from '../../lib/queries';
import { FiTrash2, FiStar, FiEdit3, FiCheck, FiX } from 'react-icons/fi';

export default function GalleryManager() {
  const { data: items, isLoading } = useGalleryItems();
  const { data: categories } = useGalleryCategories();
  const deleteItem = useDeleteGalleryItem();
  const updateItem = useUpdateGalleryItem();
  const [filterCat, setFilterCat] = useState('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const filtered = filterCat === 'all'
    ? items
    : items?.filter((i) => i.category?.slug === filterCat);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this gallery item permanently?')) return;
    try {
      await deleteItem.mutateAsync(id);
      toast.success('Deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleToggleFeatured = async (id: string, current: boolean) => {
    try {
      await updateItem.mutateAsync({ id, featured: !current });
      toast.success(current ? 'Unfeatured' : 'Featured');
    } catch {
      toast.error('Failed to update');
    }
  };

  const handleSaveEdit = async (id: string) => {
    try {
      await updateItem.mutateAsync({ id, title: editTitle, alt_text: editTitle });
      setEditingId(null);
      toast.success('Updated');
    } catch {
      toast.error('Failed');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif text-navy-900 mb-2">Gallery Management</h1>
          <p className="text-navy-400 text-sm">{items?.length ?? 0} total items</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setFilterCat('all')}
          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
            filterCat === 'all' ? 'bg-navy-900 text-white' : 'bg-white border border-surface-200 text-navy-600 hover:border-navy-300'
          }`}
        >
          All
        </button>
        {categories?.filter((c) => c.slug !== 'all').map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setFilterCat(cat.slug)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              filterCat === cat.slug ? 'bg-navy-900 text-white' : 'bg-white border border-surface-200 text-navy-600 hover:border-navy-300'
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => <div key={i} className="skeleton h-40 rounded-xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered?.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-surface-100 overflow-hidden group relative">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={item.thumbnail_url || item.url}
                  alt={item.alt_text}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <button
                    onClick={() => handleToggleFeatured(item.id, item.featured)}
                    className={`p-1.5 rounded-lg shadow-lg ${item.featured ? 'bg-gold-400 text-white' : 'bg-white/90 text-navy-400'}`}
                  >
                    <FiStar size={14} />
                  </button>
                  <button
                    onClick={() => { setEditingId(item.id); setEditTitle(item.title); }}
                    className="p-1.5 bg-white/90 rounded-lg shadow-lg text-navy-400"
                  >
                    <FiEdit3 size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 bg-white/90 rounded-lg shadow-lg text-red-500"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
                {item.featured && (
                  <div className="absolute top-2 left-2">
                    <FiStar className="text-gold-400 fill-gold-400 drop-shadow-lg" size={16} />
                  </div>
                )}
              </div>
              <div className="p-2">
                {editingId === item.id ? (
                  <div className="flex items-center gap-1">
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="flex-1 text-xs bg-surface-50 border border-surface-100 rounded px-2 py-1"
                      autoFocus
                    />
                    <button onClick={() => handleSaveEdit(item.id)} className="text-green-500"><FiCheck size={14} /></button>
                    <button onClick={() => setEditingId(null)} className="text-navy-400"><FiX size={14} /></button>
                  </div>
                ) : (
                  <p className="text-[11px] text-navy-500 truncate">{item.title || item.alt_text}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {filtered?.length === 0 && (
        <div className="text-center py-16 text-navy-400">
          <p className="font-serif italic">No items in this category</p>
        </div>
      )}
    </div>
  );
}
