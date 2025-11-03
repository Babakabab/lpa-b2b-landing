import React from 'react'
import type { HowItWorksBlock as HowItWorksBlockProps } from '@/payload-types'
import { ClipboardList, Activity, TrendingUp } from 'lucide-react'
import RichText from '@/components/RichText'

const iconMap = {
  clipboard: ClipboardList,
  activity: Activity,
  trending: TrendingUp,
}

export const HowItWorksBlock: React.FC<HowItWorksBlockProps> = ({ heading, steps }) => {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container">
        {heading && (
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {heading}
          </h2>
        )}

        <div className="grid gap-8 md:grid-cols-3 md:gap-12">
          {steps &&
            steps.map((step, index) => {
              const Icon = iconMap[step.icon as keyof typeof iconMap] || ClipboardList

              return (
                <div
                  key={index}
                  className="group relative flex flex-col items-center text-center transition-all hover:scale-105"
                >
                  {/* Step Number Badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-xl font-bold text-white shadow-lg">
                      {index + 1}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="mb-6 mt-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary transition-colors group-hover:from-primary/20 group-hover:to-accent/20">
                    <Icon className="h-10 w-10" aria-hidden="true" />
                  </div>

                  {/* Title */}
                  {step.title && (
                    <h3 className="mb-4 text-xl font-semibold text-foreground md:text-2xl">
                      {step.title}
                    </h3>
                  )}

                  {/* Description */}
                  {step.description && (
                    <div className="text-muted-foreground">
                      <RichText data={step.description} enableGutter={false} />
                    </div>
                  )}

                  {/* Arrow connector (not on last item on desktop) */}
                  {index < (steps?.length || 0) - 1 && (
                    <div className="absolute right-0 top-1/2 hidden h-0.5 w-full -translate-y-1/2 translate-x-1/2 transform md:block">
                      <svg
                        className="h-full w-12 text-border"
                        fill="none"
                        viewBox="0 0 48 2"
                        aria-hidden="true"
                      >
                        <path
                          d="M0 1h46m0 0l-4-4m4 4l-4 4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}






