import { neon } from '@neondatabase/serverless';

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return Response.json({ ok: false, error: 'DATABASE_URL missing in Vercel Env' }, { status: 500 });
    }
    const sql = neon(process.env.DATABASE_URL);
    const c = await sql`SELECT COUNT(*) as count FROM "Product"`;
    return Response.json({ ok: true, neon: 'connected', products: Number(c[0].count) });
  } catch (e) {
    return Response.json({ ok: false, error: e.message }, { status: 500 });
  }
}