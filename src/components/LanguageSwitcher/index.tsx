'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Languages } from 'lucide-react'

const LOCALES = [
  { code: 'nl', label: 'NL', fullLabel: 'Nederlands' },
  { code: 'en', label: 'EN', fullLabel: 'English' },
] as const

export const LanguageSwitcher: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [currentLocale, setCurrentLocale] = useState<'nl' | 'en'>('nl')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Get stored locale or default to nl
    const stored = localStorage.getItem('locale') || 'nl'
    setCurrentLocale(stored as 'nl' | 'en')
  }, [])

  const switchLocale = useCallback(
    (newLocale: 'nl' | 'en') => {
      setCurrentLocale(newLocale)
      localStorage.setItem('locale', newLocale)
      setIsOpen(false)

      // Reload to apply new locale
      router.refresh()
    },
    [router],
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, locale: 'nl' | 'en') => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        switchLocale(locale)
      } else if (event.key === 'Escape') {
        setIsOpen(false)
      }
    },
    [switchLocale],
  )

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setIsOpen(false)
        }}
        className="flex min-h-[44px] min-w-[44px] items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="Change language"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Languages className="h-4 w-4" aria-hidden="true" />
        <span>{currentLocale.toUpperCase()}</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} aria-hidden="true" />

          {/* Dropdown */}
          <div
            className="absolute right-0 top-full z-20 mt-2 w-40 overflow-hidden rounded-lg border border-border bg-background shadow-lg"
            role="menu"
            aria-orientation="vertical"
          >
            {LOCALES.map((locale) => (
              <button
                key={locale.code}
                type="button"
                onClick={() => switchLocale(locale.code)}
                onKeyDown={(e) => handleKeyDown(e, locale.code)}
                className={`flex w-full min-h-[44px] items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-accent focus:bg-accent focus:outline-none ${
                  currentLocale === locale.code
                    ? 'bg-accent/50 font-semibold text-foreground'
                    : 'text-muted-foreground'
                }`}
                role="menuitem"
                tabIndex={0}
              >
                <span className="text-base font-bold">{locale.label}</span>
                <span className="flex-1">{locale.fullLabel}</span>
                {currentLocale === locale.code && (
                  <span className="text-primary" aria-label="Currently selected">
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}



