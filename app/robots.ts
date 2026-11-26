import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl()

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}

function getSiteUrl() {
  const configuredUrl = process.env.SITE_URL
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL

  if (configuredUrl) return configuredUrl.replace(/\/$/, '')
  if (vercelUrl) return `https://${vercelUrl}`
  return 'http://localhost:3000'
}
