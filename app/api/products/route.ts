import { neon } from '@neondatabase/serverless'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    return Response.json(
      { ok: false, error: 'DATABASE_URL missing in Vercel Env' },
      { status: 500 },
    )
  }

  try {
    const sql = neon(databaseUrl)
    const query = request.nextUrl.searchParams.get('q')?.trim() ?? ''
    const products = query
      ? await sql`
          SELECT "id", "nameAr", "nameEn", "activeIngredient", barcode,
                 "category", "pack", "price", "stock", "branchId", "expiry",
                 "needsReview", "createdAt", "updatedAt"
          FROM "Product"
          WHERE "nameAr" ILIKE ${`%${query}%`}
             OR "nameEn" ILIKE ${`%${query}%`}
             OR "activeIngredient" ILIKE ${`%${query}%`}
             OR barcode = ${query}
          ORDER BY "nameAr" ASC
          LIMIT 50
        `
      : await sql`
          SELECT "id", "nameAr", "nameEn", "activeIngredient", barcode,
                 "category", "pack", "price", "stock", "branchId", "expiry",
                 "needsReview", "createdAt", "updatedAt"
          FROM "Product"
          ORDER BY "nameAr" ASC
          LIMIT 50
        `

    return Response.json({ count: products.length, products })
  } catch {
    return Response.json(
      { ok: false, error: 'Unable to load products' },
      { status: 500 },
    )
  }
}
