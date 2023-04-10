import { z } from 'zod'

export const contactSchema = z.object({
  id: z.string().default('1'),
  name: z.string().min(1, { message: 'Name is required' }),
  occupation: z.string().min(1, { message: 'Occupation is required' }),
  email: z.string().min(1, { message: 'Email is required' }).email({
    message: 'Must be a valid email',
  }),
  company: z.string().min(1, { message: 'Company is required' }),
  phoneNumber: z
    .string()
    .min(1, { message: 'Phone number is required' })
    .refine((val) => /^\d+$/.test(val), {
      message: 'Phone number is invalid',
    }),
  linkedInUrl: z
    .string()
    .trim()
    .toLowerCase()
    .includes('linkedin.com', { message: 'Must include "linkedin.com"' })
    .optional()
    .or(z.literal('')),
})

// extracting the type
type Contact = z.infer<typeof contactSchema>

export default Contact
