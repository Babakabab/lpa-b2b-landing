import React from 'react'
import type { ClinicalGovernanceBlock as ClinicalGovernanceBlockProps } from '@/payload-types'
import { FileCheck, Shield, AlertCircle, UserCheck } from 'lucide-react'
import RichText from '@/components/RichText'

const featureIconMap = {
  'file-check': FileCheck,
  shield: Shield,
  'alert-circle': AlertCircle,
  'user-check': UserCheck,
}

export const ClinicalGovernanceBlock: React.FC<ClinicalGovernanceBlockProps> = ({
  heading,
  description,
  features,
}) => {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-12">
          {heading && (
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {heading}
            </h2>
          )}
          {description && (
            <div className="text-lg text-muted-foreground">
              <RichText data={description} enableGutter={false} />
            </div>
          )}
        </div>

        {/* Features Grid */}
        {features && features.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {features.map((feature, index) => {
              const Icon = featureIconMap[feature.icon as keyof typeof featureIconMap] || FileCheck

              return (
                <div
                  key={index}
                  className="group flex gap-4 rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
                >
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="flex-1">
                    {feature.title && (
                      <h3 className="mb-2 text-lg font-semibold text-foreground">
                        {feature.title}
                      </h3>
                    )}
                    {feature.description && (
                      <div className="text-muted-foreground">
                        <RichText data={feature.description} enableGutter={false} />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}






