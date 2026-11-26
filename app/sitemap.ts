import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl()

  return [
    { url: siteUrl, changeFrequency: 'daily', priority: 1 },
    { url: `${siteUrl}/#store`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/#offers`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/#branches`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/#articles`, changeFrequency: 'weekly', priority: 0.7 },
  ]
}

function getSiteUrl() {
  const configuredUrl = process.env.SITE_URL
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL

  if (configuredUrl) return configuredUrl.replace(/\/$/, '')
  if (vercelUrl) return `https://${vercelUrl}`
  return 'http://localhost:3000'
}
