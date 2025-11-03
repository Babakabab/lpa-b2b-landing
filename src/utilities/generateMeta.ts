import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
  locale?: 'nl' | 'en'
}): Promise<Metadata> => {
  const { doc, locale = 'nl' } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title
    ? doc?.meta?.title + ' | Payload Website Template'
    : 'Payload Website Template'

  const baseUrl = getServerSideURL()
  const slug = Array.isArray(doc?.slug) ? doc?.slug.join('/') : doc?.slug || ''
  const pathWithoutLocale = slug === 'home' ? '' : slug

  // Generate language alternate URLs
  const languages: Record<string, string> = {
    nl: `${baseUrl}/nl${pathWithoutLocale ? `/${pathWithoutLocale}` : ''}`,
    en: `${baseUrl}/en${pathWithoutLocale ? `/${pathWithoutLocale}` : ''}`,
    'x-default': `${baseUrl}/nl${pathWithoutLocale ? `/${pathWithoutLocale}` : ''}`, // Default to Dutch
  }

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: `/${locale}${pathWithoutLocale ? `/${pathWithoutLocale}` : ''}`,
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
    }),
    title,
    alternates: {
      languages,
    },
  }
}
