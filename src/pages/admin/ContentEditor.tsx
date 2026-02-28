import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSiteContent, useUpdateSiteContent } from '../../lib/queries';
import { FiSave, FiEdit3 } from 'react-icons/fi';

export default function ContentEditor() {
  const { data: content, isLoading } = useSiteContent();
  const updateContent = useUpdateSiteContent();
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (content) {
      const map: Record<string, string> = {};
      content.forEach((c) => { map[c.id] = c.value; });
      setEdits(map);
    }
  }, [content]);

  const handleSave = async (id: string) => {
    try {
      await updateContent.mutateAsync({ id, value: edits[id] });
      toast.success('Content updated');
      setEditingId(null);
    } catch {
      toast.error('Failed to update');
    }
  };

  const sections = content ? [...new Set(content.map((c) => c.section))] : [];

  if (isLoading) {
    return <div className="space-y-4">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="skeleton h-16 rounded-xl" />)}</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-navy-900 mb-2">Content Editor</h1>
        <p className="text-navy-400 text-sm">Edit website text, images, and settings</p>
      </div>

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section} className="admin-card">
            <h3 className="font-serif text-xl text-navy-900 mb-6 capitalize border-b border-surface-100 pb-3">
              {section}
            </h3>
            <div className="space-y-4">
              {content?.filter((c) => c.section === section).map((item) => (
                <div key={item.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-surface-50 transition-colors">
                  <div className="flex-1">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gold-600 font-bold mb-1 block">
                      {item.key.replace(/_/g, ' ')}
                    </label>
                    {editingId === item.id ? (
                      item.value.length > 100 ? (
                        <textarea
                          value={edits[item.id] || ''}
                          onChange={(e) => setEdits({ ...edits, [item.id]: e.target.value })}
                          rows={4}
                          className="w-full px-3 py-2 bg-white border border-surface-200 rounded-xl text-sm
                                     focus:outline-none focus:ring-2 focus:ring-gold-300 resize-none"
                          autoFocus
                        />
                      ) : (
                        <input
                          value={edits[item.id] || ''}
                          onChange={(e) => setEdits({ ...edits, [item.id]: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-surface-200 rounded-xl text-sm
                                     focus:outline-none focus:ring-2 focus:ring-gold-300"
                          autoFocus
                        />
                      )
                    ) : (
                      <p className="text-navy-700 text-sm">{item.value}</p>
                    )}
                  </div>
                  <div className="shrink-0">
                    {editingId === item.id ? (
                      <button
                        onClick={() => handleSave(item.id)}
                        className="p-2 bg-navy-900 text-white rounded-xl hover:bg-navy-800 transition-colors"
                      >
                        <FiSave size={16} />
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditingId(item.id)}
                        className="p-2 text-navy-300 hover:text-navy-600 rounded-xl hover:bg-surface-100 transition-colors"
                      >
                        <FiEdit3 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
