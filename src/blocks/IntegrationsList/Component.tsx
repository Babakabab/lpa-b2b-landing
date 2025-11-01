import React from 'react'
import type { IntegrationsListBlock as IntegrationsListBlockProps } from '@/payload-types'
import { Database, FileText, PenTool, Mail, Webhook, Link2 } from 'lucide-react'
import RichText from '@/components/RichText'

const integrationIconMap = {
  database: Database,
  'file-text': FileText,
  'pen-tool': PenTool,
  mail: Mail,
  webhook: Webhook,
  link: Link2,
}

export const IntegrationsListBlock: React.FC<IntegrationsListBlockProps> = ({
  heading,
  description,
  integrations,
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

        {/* Integrations Grid */}
        {integrations && integrations.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {integrations.map((integration, index) => {
              const Icon =
                integrationIconMap[integration.icon as keyof typeof integrationIconMap] || Link2

              return (
                <div
                  key={index}
                  className="group flex items-center gap-4 rounded-lg border border-border bg-card p-6 transition-all hover:border-secondary/50 hover:shadow-md"
                >
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{integration.name}</h3>
                    {integration.description && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {integration.description}
                      </p>
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



