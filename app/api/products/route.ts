import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ ok: false, error: 'DATABASE_URL missing in Vercel Env' }, { status: 500 });
    }
    const sql = neon(process.env.DATABASE_URL);
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get('q') || '').trim();
    let products;
    if (q) {
      const like = '%' + q + '%';
      products = await sql`
        SELECT "id", "nameAr", "nameEn", "activeIngredient", "barcode", "category", "pack", "price", "stock"
        FROM "Product"
        WHERE "nameAr" ILIKE ${like}
        OR "nameEn" ILIKE ${like}
        OR "activeIngredient" ILIKE ${like}
        OR "barcode" = ${q}
        LIMIT 50
      `;
    } else {
      products = await sql`
        SELECT "id", "nameAr", "nameEn", "activeIngredient", "barcode", "category", "pack", "price", "stock"
        FROM "Product" ORDER BY "nameAr" ASC LIMIT 50
      `;
    }
    return NextResponse.json({ ok: true, count: products.length, products });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}