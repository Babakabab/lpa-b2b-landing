import React from 'react'
import type { CoverageHighlightBlock as CoverageHighlightBlockProps } from '@/payload-types'
import { MapPin, TrendingDown, TrendingUp, Clock } from 'lucide-react'
import RichText from '@/components/RichText'

const statIconMap = {
  'trending-down': TrendingDown,
  'trending-up': TrendingUp,
  clock: Clock,
}

export const CoverageHighlightBlock: React.FC<CoverageHighlightBlockProps> = ({
  heading,
  mainStat,
  mainStatLabel,
  description,
  statChips,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 py-16 md:py-24">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {heading && (
            <h2 className="mb-8 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {heading}
            </h2>
          )}

          {/* Main Stat */}
          <div className="mb-6 flex items-center justify-center gap-4">
            <MapPin className="h-12 w-12 text-secondary md:h-16 md:w-16" aria-hidden="true" />
            <div className="text-left">
              {mainStat && (
                <div className="text-5xl font-bold text-primary md:text-7xl">{mainStat}</div>
              )}
              {mainStatLabel && (
                <div className="text-xl text-muted-foreground md:text-2xl">{mainStatLabel}</div>
              )}
            </div>
          </div>

          {/* Description */}
          {description && (
            <div className="mb-12 text-lg text-muted-foreground">
              <RichText data={description} enableGutter={false} />
            </div>
          )}

          {/* Stat Chips */}
          {statChips && statChips.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-4">
              {statChips.map((chip, index) => {
                const Icon = statIconMap[chip.icon as keyof typeof statIconMap] || TrendingUp

                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 shadow-sm transition-all hover:shadow-md"
                  >
                    <Icon className="h-5 w-5 text-success" aria-hidden="true" />
                    <span className="text-sm font-medium text-foreground md:text-base">
                      {chip.label}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}






