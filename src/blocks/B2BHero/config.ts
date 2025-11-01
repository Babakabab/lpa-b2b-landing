import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'

export const B2BHero: Block = {
  slug: 'b2bHero',
  interfaceName: 'B2BHeroBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Main headline (H1)',
      },
    },
    {
      name: 'subheading',
      type: 'richText',
      required: true,
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      admin: {
        description: 'Supporting text below the headline',
      },
    },
    link({
      overrides: {
        name: 'primaryCTA',
        label: 'Primary CTA',
        localized: true,
        admin: {
          description: 'Primary call-to-action button',
        },
      },
    }),
    link({
      overrides: {
        name: 'secondaryCTA',
        label: 'Secondary CTA',
        localized: true,
        admin: {
          description: 'Secondary call-to-action button',
        },
      },
    }),
    {
      name: 'trustBadges',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Trust indicators (e.g., "NEN 7510/7512/7513 aligned")',
        initCollapsed: true,
      },
    },
  ],
  labels: {
    singular: 'B2B Hero',
    plural: 'B2B Heroes',
  },
}
