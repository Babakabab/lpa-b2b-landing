import React from 'react'
import type { SecurityComplianceBlock as SecurityComplianceBlockProps } from '@/payload-types'
import { Lock, Server, FileText, Users } from 'lucide-react'
import RichText from '@/components/RichText'

const featureIconMap = {
  lock: Lock,
  server: Server,
  'file-text': FileText,
  users: Users,
}

export const SecurityComplianceBlock: React.FC<SecurityComplianceBlockProps> = ({
  heading,
  description,
  features,
}) => {
  return (
    <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16 md:py-24">
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

        {/* Features List */}
        {features && features.length > 0 && (
          <div className="mx-auto max-w-4xl space-y-4">
            {features.map((feature, index) => {
              const Icon = featureIconMap[feature.icon as keyof typeof featureIconMap] || Lock

              return (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-lg border border-border bg-background p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="flex-1">
                    {feature.title && (
                      <h3 className="mb-1 text-lg font-semibold text-foreground">
                        {feature.title}
                      </h3>
                    )}
                    {feature.description && (
                      <div className="text-sm text-muted-foreground">{feature.description}</div>
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



