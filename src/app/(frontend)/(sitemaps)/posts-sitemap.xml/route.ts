import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const locales = ['nl', 'en'] as const

const getPostsSitemap = unstable_cache(
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

    // Add posts for each locale
    for (const locale of locales) {
      const results = await payload.find({
        collection: 'posts',
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
        for (const post of results.docs) {
          if (post?.slug) {
            sitemap.push({
              loc: `${SITE_URL}/${locale}/posts/${post.slug}`,
              lastmod: post.updatedAt || dateFallback,
              alternateRefs: locales.map((lang) => ({
                href: `${SITE_URL}/${lang}/posts/${post.slug}`,
                hreflang: lang,
              })),
            })
          }
        }
      }
    }

    return sitemap
  },
  ['posts-sitemap'],
  {
    tags: ['posts-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPostsSitemap()

  return getServerSideSitemap(sitemap)
}
