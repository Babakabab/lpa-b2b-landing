import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'

export const PricingFraming: Block = {
  slug: 'pricingFraming',
  interfaceName: 'PricingFramingBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Section heading (e.g., "Vervang 2-3 tools met één platform")',
      },
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      admin: {
        description: 'Optional description',
      },
    },
    {
      name: 'valuePoints',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 6,
      localized: true,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          admin: {
            description: 'Value point text',
          },
        },
      ],
      admin: {
        description: 'Key value points (e.g., features replaced, transparency)',
      },
    },
    link({
      overrides: {
        name: 'cta',
        label: 'Call to Action',
        localized: true,
        admin: {
          description: 'Link to pricing page or contact',
        },
      },
    }),
  ],
  labels: {
    singular: 'Pricing Framing',
    plural: 'Pricing Framing Sections',
  },
}






