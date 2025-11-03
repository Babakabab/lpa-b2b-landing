import React from 'react'
import type { ProofStripBlock as ProofStripBlockProps } from '@/payload-types'
import { Quote } from 'lucide-react'
import { Media } from '@/components/Media'

export const ProofStripBlock: React.FC<ProofStripBlockProps> = ({
  heading,
  logos,
  testimonials,
}) => {
  return (
    <section className="border-y border-border bg-background py-16 md:py-24">
      <div className="container">
        {heading && (
          <h2 className="mb-12 text-center text-2xl font-bold tracking-tight text-muted-foreground md:text-3xl">
            {heading}
          </h2>
        )}

        {/* Logo Grid */}
        {logos && logos.length > 0 && (
          <div className="mb-16 grid grid-cols-2 items-center gap-8 md:grid-cols-4 lg:grid-cols-5">
            {logos.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-center grayscale opacity-60 transition-all hover:grayscale-0 hover:opacity-100"
              >
                {item.logo && typeof item.logo === 'object' ? (
                  <Media resource={item.logo} className="h-16 w-auto object-contain" />
                ) : (
                  // Placeholder when no logo is uploaded
                  <div className="flex h-16 w-32 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted">
                    <span className="text-xs text-muted-foreground">Logo</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Testimonials */}
        {testimonials && testimonials.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative rounded-xl border border-border bg-card p-8 shadow-sm"
              >
                <Quote
                  className="absolute left-6 top-6 h-8 w-8 text-accent/30"
                  aria-hidden="true"
                />
                <div className="relative">
                  <blockquote className="mb-4 text-lg font-medium italic text-foreground">
                    "{testimonial.quote}"
                  </blockquote>
                  {testimonial.metric && (
                    <p className="mb-4 text-sm font-semibold text-success">{testimonial.metric}</p>
                  )}
                  <footer className="text-sm text-muted-foreground">
                    {testimonial.author && <cite className="not-italic">{testimonial.author}</cite>}
                    {testimonial.company && testimonial.author && <span className="mx-2">•</span>}
                    {testimonial.company && <span>{testimonial.company}</span>}
                  </footer>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}






