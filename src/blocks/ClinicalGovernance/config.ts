import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const ClinicalGovernance: Block = {
  slug: 'clinicalGovernance',
  interfaceName: 'ClinicalGovernanceBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Section heading (e.g., "Clinically governed ordering")',
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
          defaultValue: 'file-check',
          options: [
            {
              label: 'File Check (Protocol)',
              value: 'file-check',
            },
            {
              label: 'Shield (Security)',
              value: 'shield',
            },
            {
              label: 'Alert Circle (Critical Values)',
              value: 'alert-circle',
            },
            {
              label: 'User Check (BIG Authorization)',
              value: 'user-check',
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
          type: 'richText',
          required: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
            },
          }),
          admin: {
            description: 'Feature description',
          },
        },
      ],
      admin: {
        description: 'Clinical governance features',
      },
    },
  ],
  labels: {
    singular: 'Clinical Governance',
    plural: 'Clinical Governance Sections',
  },
}



