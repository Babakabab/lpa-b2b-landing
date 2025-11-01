import type { Block } from 'payload'

export const ProofStrip: Block = {
  slug: 'proofStrip',
  interfaceName: 'ProofStripBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      admin: {
        description: 'Optional section heading (e.g., "Trusted by leading clinics")',
      },
    },
    {
      name: 'logos',
      type: 'array',
      maxRows: 10,
      localized: false,
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: false,
          admin: {
            description: 'Company logo (will be displayed in grayscale)',
          },
        },
      ],
      admin: {
        description: 'Client/partner logos',
      },
    },
    {
      name: 'testimonials',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      localized: true,
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Testimonial quote',
          },
        },
        {
          name: 'metric',
          type: 'text',
          admin: {
            description: 'Optional metric (e.g., "−25% no-shows in 60 dagen")',
          },
        },
        {
          name: 'author',
          type: 'text',
          admin: {
            description: 'Author name',
          },
        },
        {
          name: 'company',
          type: 'text',
          admin: {
            description: 'Company name',
          },
        },
      ],
      admin: {
        description: 'Customer testimonials',
      },
    },
  ],
  labels: {
    singular: 'Proof Strip',
    plural: 'Proof Strips',
  },
}



