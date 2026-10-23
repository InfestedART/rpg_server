import { z } from 'zod'

export const createCharacterSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(24, "Name too long"),
  class: z.enum(['soldier', 'wizard', 'ranger', 'warrior', 'bandit']),
  equipment: z.string(),
  inventory: z
    .string()
    .default('[]')
    .refine(val => {
      try {
        const parsed = JSON.parse(val)
        return Array.isArray(parsed)
      } catch { return false }
    }, {message: 'value must be JSON array'}),
  gold: z.number().default(0),
  xp: z.number().default(0),
})

export type CreateCharacterInput = z.infer<typeof createCharacterSchema>