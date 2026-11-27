import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const siteUrl = process.env.SITE_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined)

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: 'صيدليات البنداري | رعاية من القلب',
  description: 'صيدليات البنداري — رعاية من القلب منذ عام 1980. تسوق الأدوية ومنتجات العناية، وتواصل مع فروعنا على مدار 24 ساعة.',
  alternates: {
    languages: {
      ar: '/',
      en: '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    title: 'صيدليات البنداري - رعاية من القلب',
    description: 'اطلب دواءك، ارفع روشتتك، وتواصل مع صيدليات البنداري.',
    images: siteUrl ? ['/apple-icon.png'] : undefined,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'صيدليات البنداري - رعاية من القلب',
    description: 'متجر وفروع صيدليات البنداري.',
    images: siteUrl ? ['/apple-icon.png'] : undefined,
  },
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Pharmacy',
              name: 'صيدليات البنداري - El-Bendary Pharmacies',
              ...(siteUrl ? { url: siteUrl } : {}),
              telephone: '+201200400094',
              slogan: 'رعاية من القلب',
              description: 'صيدليات البنداري - متجر وفروع ومخزون وشات موحد BenDa ChaT',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'EG',
                addressLocality: 'Tanta',
              },
              openingHours: 'Mo-Su 00:00-24:00',
              priceRange: 'EGP',
            }),
          }}
        />
        {process.env.NODE_ENV === 'production' && <Analytics />}
        {process.env.NODE_ENV === 'production' && <SpeedInsights />}
      </body>
    </html>
  )
}
