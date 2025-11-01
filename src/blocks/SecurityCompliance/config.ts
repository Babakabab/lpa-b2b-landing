import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const SecurityCompliance: Block = {
  slug: 'securityCompliance',
  interfaceName: 'SecurityComplianceBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Section heading (e.g., "AVG & NEN by design")',
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
        description: 'Optional section description',
      },
    },
    {
      name: 'features',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 6,
      localized: true,
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          defaultValue: 'lock',
          options: [
            {
              label: 'Lock (Security)',
              value: 'lock',
            },
            {
              label: 'Server (Hosting)',
              value: 'server',
            },
            {
              label: 'File Text (Documentation)',
              value: 'file-text',
            },
            {
              label: 'Users (Access Control)',
              value: 'users',
            },
          ],
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Feature title',
          },
        },
        {
          name: 'description',
          type: 'text',
          required: true,
          admin: {
            description: 'Feature description (plain text)',
          },
        },
      ],
      admin: {
        description: 'Security and compliance features',
      },
    },
  ],
  labels: {
    singular: 'Security & Compliance',
    plural: 'Security & Compliance Sections',
  },
}



