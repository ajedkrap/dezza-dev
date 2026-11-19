import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { CONTENT_TAG } from "@/lib/content";

/**
 * Called by a Supabase Database Webhook whenever portfolio content changes.
 * Expects header `x-revalidate-secret: <REVALIDATE_SECRET>`.
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const provided = request.headers.get("x-revalidate-secret");

  if (!secret || !provided || !safeEqual(provided, secret)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Expire immediately so the very next visit sees the change.
  revalidateTag(CONTENT_TAG, { expire: 0 });
  return Response.json({ revalidated: true, at: new Date().toISOString() });
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}
