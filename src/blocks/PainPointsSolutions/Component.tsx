import React from 'react'
import type { PainPointsSolutionsBlock as PainPointsSolutionsBlockProps } from '@/payload-types'
import { ArrowRight, X, Check } from 'lucide-react'
import RichText from '@/components/RichText'

export const PainPointsSolutionsBlock: React.FC<PainPointsSolutionsBlockProps> = ({
  heading,
  items,
}) => {
  return (
    <section className="bg-card py-16 md:py-24">
      <div className="container">
        {heading && (
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {heading}
          </h2>
        )}

        <div className="space-y-8">
          {items &&
            items.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-all hover:shadow-lg"
              >
                <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-8 p-6 md:p-8">
                  {/* Pain Point */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-lg bg-destructive/10 p-2">
                      <X className="h-6 w-6 text-destructive" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 text-lg font-semibold text-foreground">
                        {item.painPoint}
                      </h3>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center justify-center">
                    <ArrowRight
                      className="h-8 w-8 text-secondary transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Solution */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-lg bg-success/10 p-2">
                      <Check className="h-6 w-6 text-success" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      {item.solution && (
                        <div className="text-muted-foreground">
                          <RichText data={item.solution} enableGutter={false} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}



