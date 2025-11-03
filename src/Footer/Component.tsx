'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { use } from 'react'

import type { Footer as FooterType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { Shield, FileText, Users } from 'lucide-react'

export function Footer({ footerDataPromise }: { footerDataPromise: Promise<FooterType> }) {
  const footerData = use(footerDataPromise)
  const pathname = usePathname()

  // Extract current locale from pathname
  const currentLocale = pathname?.startsWith('/nl')
    ? 'nl'
    : pathname?.startsWith('/en')
      ? 'en'
      : 'nl'

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-border bg-primary text-white">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Company */}
          <div>
            <Link className="mb-4 inline-block" href={`/${currentLocale}`}>
              <Logo />
            </Link>
            <p className="text-sm text-white/80">
              Labordering & uitslagen platform voor Nederlandse klinieken en zorgverleners.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Navigatie
            </h3>
            <nav className="flex flex-col gap-2">
              {navItems.map(({ link }, i) => {
                return (
                  <CMSLink className="text-sm text-white/80 hover:text-white" key={i} {...link} />
                )
              })}
            </nav>
          </div>

          {/* Privacy & Compliance */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Privacy & Compliance
            </h3>
            <nav className="flex flex-col gap-2">
              <Link
                href={`/${currentLocale}/privacy`}
                className="flex items-center gap-2 text-sm text-white/80 hover:text-white"
              >
                <Shield className="h-4 w-4" aria-hidden="true" />
                <span>Privacyverklaring</span>
              </Link>
              <Link
                href={`/${currentLocale}/dpa`}
                className="flex items-center gap-2 text-sm text-white/80 hover:text-white"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                <span>DPA / Verwerkersovereenkomst</span>
              </Link>
              <Link
                href={`/${currentLocale}/dpia`}
                className="flex items-center gap-2 text-sm text-white/80 hover:text-white"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                <span>DPIA Samenvatting</span>
              </Link>
              <Link
                href={`/${currentLocale}/subprocessors`}
                className="flex items-center gap-2 text-sm text-white/80 hover:text-white"
              >
                <Users className="h-4 w-4" aria-hidden="true" />
                <span>Subverwerkers</span>
              </Link>
            </nav>
          </div>

          {/* Compliance Badges */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Compliance
            </h3>
            <div className="flex flex-col gap-2 text-sm text-white/80">
              <p>✓ NEN 7510/7512/7513 aligned</p>
              <p>✓ AVG compliant</p>
              <p>✓ EU data residentie</p>
              <p>✓ ISO 27001 gecertificeerd</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} LabPlusArts. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  )
}
