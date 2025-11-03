import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const locales = ['nl', 'en'] as const

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    const dateFallback = new Date().toISOString()
    const sitemap: Array<{
      loc: string
      lastmod: string
      alternateRefs?: Array<{ href: string; hreflang: string }>
    }> = []

    // Add default pages for each locale
    for (const locale of locales) {
      sitemap.push({
        loc: `${SITE_URL}/${locale}/search`,
        lastmod: dateFallback,
        alternateRefs: locales.map((lang) => ({
          href: `${SITE_URL}/${lang}/search`,
          hreflang: lang,
        })),
      })
      sitemap.push({
        loc: `${SITE_URL}/${locale}/posts`,
        lastmod: dateFallback,
        alternateRefs: locales.map((lang) => ({
          href: `${SITE_URL}/${lang}/posts`,
          hreflang: lang,
        })),
      })
    }

    // Add pages for each locale
    for (const locale of locales) {
      const results = await payload.find({
        collection: 'pages',
        overrideAccess: false,
        draft: false,
        depth: 0,
        limit: 1000,
        pagination: false,
        locale,
        where: {
          _status: {
            equals: 'published',
          },
        },
        select: {
          slug: true,
          updatedAt: true,
        },
      })

      if (results.docs) {
        for (const page of results.docs) {
          if (page?.slug) {
            const path = page.slug === 'home' ? '' : `/${page.slug}`
            sitemap.push({
              loc: `${SITE_URL}/${locale}${path}`,
              lastmod: page.updatedAt || dateFallback,
              alternateRefs: locales.map((lang) => ({
                href: `${SITE_URL}/${lang}${path}`,
                hreflang: lang,
              })),
            })
          }
        }
      }
    }

    return sitemap
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()

  return getServerSideSitemap(sitemap)
}
