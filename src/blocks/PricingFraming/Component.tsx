import React from 'react'
import type { PricingFramingBlock as PricingFramingBlockProps } from '@/payload-types'
import { CheckCircle2 } from 'lucide-react'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const PricingFramingBlock: React.FC<PricingFramingBlockProps> = ({
  heading,
  description,
  valuePoints,
  cta,
}) => {
  return (
    <section className="bg-gradient-to-br from-card to-background py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-xl md:p-12">
            {heading && (
              <h2 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                {heading}
              </h2>
            )}

            {description && (
              <div className="mb-8 text-center text-lg text-muted-foreground">
                <RichText data={description} enableGutter={false} />
              </div>
            )}

            {/* Value Points */}
            {valuePoints && valuePoints.length > 0 && (
              <div className="mb-8 space-y-4">
                {valuePoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-1 h-6 w-6 flex-shrink-0 text-success"
                      aria-hidden="true"
                    />
                    <div className="flex-1">
                      <p className="text-base font-medium text-foreground md:text-lg">
                        {point.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            {cta && (
              <div className="mt-8 text-center">
                <CMSLink
                  {...cta}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-primary px-8 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary/50"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}






