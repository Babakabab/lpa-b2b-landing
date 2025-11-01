import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const HowItWorks: Block = {
  slug: 'howItWorks',
  interfaceName: 'HowItWorksBlock',
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
      name: 'steps',
      type: 'array',
      required: true,
      minRows: 3,
      maxRows: 3,
      localized: true,
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          defaultValue: 'clipboard',
          options: [
            {
              label: 'Clipboard (Order)',
              value: 'clipboard',
            },
            {
              label: 'Activity (Collect & Review)',
              value: 'activity',
            },
            {
              label: 'Trending (Act & Follow)',
              value: 'trending',
            },
          ],
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Step title',
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
            description: 'Step description',
          },
        },
      ],
      admin: {
        description: 'Exactly 3 steps describing the process',
      },
    },
  ],
  labels: {
    singular: 'How It Works',
    plural: 'How It Works Sections',
  },
}



