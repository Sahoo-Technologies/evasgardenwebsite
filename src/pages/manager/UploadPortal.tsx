import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { uploadFile } from '../../lib/storage';
import { useAddGalleryItem, useGalleryCategories } from '../../lib/queries';
import { useAuthStore } from '../../stores/authStore';
import { FiUploadCloud, FiX, FiCheck, FiLoader } from 'react-icons/fi';

interface UploadItem {
  file: File;
  preview: string;
  title: string;
  category_id: string;
  uploading: boolean;
  done: boolean;
  error: boolean;
}

export default function UploadPortal() {
  const [files, setFiles] = useState<UploadItem[]>([]);
  const [bulkCategory, setBulkCategory] = useState('');
  const { data: categories } = useGalleryCategories();
  const addItem = useAddGalleryItem();
  const user = useAuthStore((s) => s.user);

  const onDrop = useCallback((accepted: File[]) => {
    const newFiles = accepted.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      title: file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
      category_id: bulkCategory,
      uploading: false,
      done: false,
      error: false,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  }, [bulkCategory]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [], 'video/*': [] },
    maxSize: 100 * 1024 * 1024,
  });

  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const updateFile = (idx: number, updates: Partial<UploadItem>) => {
    setFiles((prev) => prev.map((f, i) => (i === idx ? { ...f, ...updates } : f)));
  };

  const uploadAll = async () => {
    for (let i = 0; i < files.length; i++) {
      if (files[i].done) continue;
      updateFile(i, { uploading: true });

      try {
        const isVideo = files[i].file.type.startsWith('video');
        const url = await uploadFile('gallery', isVideo ? 'videos' : 'images', files[i].file);

        await addItem.mutateAsync({
          type: isVideo ? 'video' : 'image',
          url,
          title: files[i].title,
          alt_text: files[i].title,
          category_id: files[i].category_id || null,
          uploaded_by: user?.id,
        });

        updateFile(i, { uploading: false, done: true });
      } catch {
        updateFile(i, { uploading: false, error: true });
      }
    }
    toast.success('Upload complete!');
  };

  const pendingCount = files.filter((f) => !f.done).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-navy-900 mb-2">Upload Media</h1>
        <p className="text-navy-400 text-sm">Drag and drop photos or videos to add to the gallery</p>
      </div>

      {/* Bulk category selector */}
      {categories && categories.length > 0 && (
        <div className="mb-6 flex items-center gap-4">
          <label className="text-xs uppercase tracking-wider text-navy-500 font-bold">
            Default Category:
          </label>
          <select
            value={bulkCategory}
            onChange={(e) => setBulkCategory(e.target.value)}
            className="px-4 py-2 bg-white border border-surface-200 rounded-xl text-sm
                       focus:outline-none focus:ring-2 focus:ring-gold-300"
          >
            <option value="">None</option>
            {categories.filter((c) => c.slug !== 'all').map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all
                    ${isDragActive
                      ? 'border-gold-400 bg-gold-50'
                      : 'border-surface-200 hover:border-gold-300 hover:bg-surface-50'
                    }`}
      >
        <input {...getInputProps()} />
        <FiUploadCloud className="mx-auto text-gold-400 mb-4" size={48} />
        <p className="text-navy-700 font-medium mb-1">
          {isDragActive ? 'Drop files here...' : 'Drag & drop photos or videos'}
        </p>
        <p className="text-navy-400 text-sm">or click to browse (max 100MB per file)</p>
      </div>

      {/* File list */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-8 space-y-4"
          >
            {files.map((item, idx) => (
              <motion.div
                key={item.preview}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`flex items-center gap-4 bg-white p-4 rounded-xl border transition-all ${
                  item.done ? 'border-green-200 bg-green-50/50' : item.error ? 'border-red-200 bg-red-50/50' : 'border-surface-100'
                }`}
              >
                <img
                  src={item.preview}
                  alt=""
                  className="w-16 h-16 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <input
                    value={item.title}
                    onChange={(e) => updateFile(idx, { title: e.target.value })}
                    disabled={item.done}
                    className="text-sm font-medium text-navy-900 bg-transparent border-none outline-none w-full
                               focus:ring-0 disabled:text-navy-500"
                    placeholder="Title"
                  />
                  {categories && (
                    <select
                      value={item.category_id}
                      onChange={(e) => updateFile(idx, { category_id: e.target.value })}
                      disabled={item.done}
                      className="text-xs text-navy-400 bg-transparent border-none outline-none mt-1"
                    >
                      <option value="">No category</option>
                      {categories.filter((c) => c.slug !== 'all').map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  )}
                </div>
                <div className="shrink-0">
                  {item.uploading ? (
                    <FiLoader className="animate-spin text-gold-400" size={20} />
                  ) : item.done ? (
                    <FiCheck className="text-green-500" size={20} />
                  ) : (
                    <button onClick={() => removeFile(idx)} className="text-navy-300 hover:text-red-500 transition-colors">
                      <FiX size={20} />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}

            {pendingCount > 0 && (
              <button onClick={uploadAll} className="btn-primary w-full mt-4">
                Upload {pendingCount} {pendingCount === 1 ? 'File' : 'Files'}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
