import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'
import { link } from '@/fields/link'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'B2B Hero',
          value: 'b2bHero',
        },
      ],
      required: true,
    },
    // B2B Hero specific fields
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === 'b2bHero',
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
        condition: (_, { type } = {}) => type === 'b2bHero',
        description: 'Supporting text below the headline',
      },
    },
    link({
      overrides: {
        name: 'primaryCTA',
        label: 'Primary CTA',
        localized: true,
        admin: {
          condition: (_, { type } = {}) => type === 'b2bHero',
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
          condition: (_, { type } = {}) => type === 'b2bHero',
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
        condition: (_, { type } = {}) => type === 'b2bHero',
        description: 'Trust indicators (e.g., "NEN 7510/7512/7513 aligned")',
        initCollapsed: true,
      },
    },
    // Existing hero fields (for non-B2B types)
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
      admin: {
        condition: (_, { type } = {}) => type !== 'b2bHero' && type !== 'none',
      },
    },
    {
      ...linkGroup({
        overrides: {
          maxRows: 2,
          admin: {
            condition: (_, { type } = {}) => type !== 'b2bHero' && type !== 'none',
          },
        },
      }),
    },
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
  ],
  label: false,
}
