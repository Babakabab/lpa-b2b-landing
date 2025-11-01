import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const PainPointsSolutions: Block = {
  slug: 'painPointsSolutions',
  interfaceName: 'PainPointsSolutionsBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Section heading (e.g., "Why clinics switch")',
      },
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 6,
      localized: true,
      fields: [
        {
          name: 'painPoint',
          type: 'text',
          required: true,
          admin: {
            description: 'The problem/pain point',
          },
        },
        {
          name: 'solution',
          type: 'richText',
          required: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
            },
          }),
          admin: {
            description: 'The solution your platform provides',
          },
        },
      ],
      admin: {
        description: 'Pain points and their solutions',
      },
    },
  ],
  labels: {
    singular: 'Pain Points & Solutions',
    plural: 'Pain Points & Solutions Sections',
  },
}



