import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const CoverageHighlight: Block = {
  slug: 'coverageHighlight',
  interfaceName: 'CoverageHighlightBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Section heading',
      },
    },
    {
      name: 'mainStat',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Main statistic (e.g., "750+")',
      },
    },
    {
      name: 'mainStatLabel',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Label for main stat (e.g., "priklocaties in NL")',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      admin: {
        description: 'Supporting description',
      },
    },
    {
      name: 'statChips',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          defaultValue: 'trending-down',
          options: [
            {
              label: 'Trending Down (Reduction)',
              value: 'trending-down',
            },
            {
              label: 'Trending Up (Increase)',
              value: 'trending-up',
            },
            {
              label: 'Clock (Time)',
              value: 'clock',
            },
          ],
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'Chip label (e.g., "↓ no-shows")',
          },
        },
      ],
      admin: {
        description: 'Small metric chips (e.g., reduced no-shows, increased adherence)',
      },
    },
  ],
  labels: {
    singular: 'Coverage Highlight',
    plural: 'Coverage Highlights',
  },
}



