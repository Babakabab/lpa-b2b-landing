'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { CheckCircle2 } from 'lucide-react'

export const B2BHero: React.FC<Page['hero']> = ({
  heading,
  subheading,
  primaryCTA,
  secondaryCTA,
  trustBadges,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative -mt-[10.4rem] overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary py-20 md:py-28 lg:py-36"
      data-theme="dark"
    >
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
      </div>

      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Heading */}
          {heading && (
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              {heading}
            </h1>
          )}

          {/* Subheading */}
          {subheading && (
            <div className="mb-8 text-lg text-white/90 md:text-xl lg:text-2xl">
              <RichText data={subheading} enableGutter={false} />
            </div>
          )}

          {/* CTAs */}
          <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {primaryCTA && (
              <CMSLink
                {...primaryCTA}
                className="inline-flex min-h-[44px] min-w-[200px] items-center justify-center rounded-lg bg-white px-8 py-3 text-base font-semibold text-primary shadow-lg transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white/50"
              />
            )}
            {secondaryCTA && (
              <CMSLink
                {...secondaryCTA}
                className="inline-flex min-h-[44px] min-w-[200px] items-center justify-center rounded-lg border-2 border-white bg-transparent px-8 py-3 text-base font-semibold text-white transition-all hover:bg-white hover:text-primary focus:outline-none focus:ring-4 focus:ring-white/50"
              />
            )}
          </div>

          {/* Trust Badges */}
          {trustBadges && trustBadges.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-white/20 pt-8">
              {trustBadges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-white/90 md:text-base"
                >
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-accent" aria-hidden="true" />
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
