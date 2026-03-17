import { z } from 'zod'

export const createCharacterSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(32, "Name too long"),
  class: z.enum(['soldier', 'wizard', 'ranger', 'warrior', 'bandit']),
  equipment: z.string(),
})

export type CreateCharacterInput = z.infer<typeof createCharacterSchema>