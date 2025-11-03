import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { getCachedGlobal } from '@/utilities/getGlobals'

import '../globals.css'
import { getServerSideURL } from '@/utilities/getURL'

type Props = {
  children: React.ReactNode
  params: Promise<{
    lang: 'nl' | 'en'
  }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { isEnabled } = await draftMode()
  const { lang } = await params

  // Fetch footer data for the current locale
  const footerDataPromise = getCachedGlobal('footer', 1, lang)()

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable)}
      lang={lang}
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer footerDataPromise={footerDataPromise} />
        </Providers>
      </body>
    </html>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const baseUrl = getServerSideURL()

  return {
    metadataBase: new URL(baseUrl),
    openGraph: mergeOpenGraph(),
    twitter: {
      card: 'summary_large_image',
      creator: '@payloadcms',
    },
    alternates: {
      languages: {
        nl: `${baseUrl}/nl`,
        en: `${baseUrl}/en`,
      },
    },
    other: {
      'og:locale': lang,
      'og:locale:alternate': lang === 'nl' ? 'en' : 'nl',
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'nl' }, { lang: 'en' }]
}
