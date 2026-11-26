import { neon } from '@neondatabase/serverless'

export async function GET() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    return Response.json(
      { ok: false, error: 'DATABASE_URL missing in Vercel Env' },
      { status: 500 },
    )
  }

  try {
    const sql = neon(databaseUrl)
    const rows = await sql`SELECT 1 as ok`
    let products = 0

    try {
      const countRows = await sql`SELECT COUNT(*) as count FROM "Product"`
      products = Number(countRows[0]?.count ?? 0)
    } catch {
      products = -1
    }

    return Response.json({
      ok: true,
      neon: 'connected',
      db: rows[0],
      products,
    })
  } catch {
    return Response.json(
      { ok: false, error: 'Database connection failed' },
      { status: 500 },
    )
  }
}
