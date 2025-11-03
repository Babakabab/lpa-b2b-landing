import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const IntegrationsList: Block = {
  slug: 'integrationsList',
  interfaceName: 'IntegrationsListBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Section heading (e.g., "Werkt met uw stack")',
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
      name: 'integrations',
      type: 'array',
      required: true,
      minRows: 3,
      maxRows: 12,
      localized: true,
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          defaultValue: 'link',
          options: [
            {
              label: 'Database (PMS/EPD)',
              value: 'database',
            },
            {
              label: 'File Text (UBL/CSV)',
              value: 'file-text',
            },
            {
              label: 'Pen Tool (E-sign)',
              value: 'pen-tool',
            },
            {
              label: 'Mail (Email/SMS)',
              value: 'mail',
            },
            {
              label: 'Webhook (Webhooks/API)',
              value: 'webhook',
            },
            {
              label: 'Link (General Integration)',
              value: 'link',
            },
          ],
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: 'Integration name',
          },
        },
        {
          name: 'description',
          type: 'text',
          admin: {
            description: 'Optional short description',
          },
        },
      ],
      admin: {
        description: 'List of integrations',
      },
    },
  ],
  labels: {
    singular: 'Integrations List',
    plural: 'Integrations Lists',
  },
}






