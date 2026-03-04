const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const BUCKET = "assets";

export function getStorageUrl(path: string): string {
  if (!SUPABASE_URL) return `/${path}`;
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
}
