export async function GET() {
  const response = await fetch('https://api.vercel.app/products', {
    next: { revalidate: 300 },
  })

  if (!response.ok) {
    return Response.json(
      { error: 'Unable to fetch products' },
      { status: 502 },
    )
  }

  const products = await response.json()
  return Response.json(products)
}
