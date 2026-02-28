import { supabase } from './supabase';

export async function uploadFile(
  bucket: string,
  path: string,
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `${path}/${fileName}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  if (onProgress) onProgress(100);

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
}

export async function uploadMultipleFiles(
  bucket: string,
  path: string,
  files: File[],
  onFileProgress?: (index: number, progress: number) => void
): Promise<string[]> {
  const urls: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const url = await uploadFile(bucket, path, files[i], (progress) => {
      onFileProgress?.(i, progress);
    });
    urls.push(url);
  }

  return urls;
}

export async function deleteFile(bucket: string, path: string): Promise<void> {
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) throw error;
}

export function getStoragePathFromUrl(url: string): string {
  const parts = url.split('/storage/v1/object/public/');
  if (parts.length < 2) return url;
  const [, pathWithBucket] = parts;
  const slashIndex = pathWithBucket.indexOf('/');
  return pathWithBucket.substring(slashIndex + 1);
}
