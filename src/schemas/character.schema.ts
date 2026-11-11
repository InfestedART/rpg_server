import { z } from 'zod'

export const equipmentSchema = z.object({
  weapon: z.string().nullable(),
  offhand: z.string().nullable(),
  armor: z.string().nullable(),
  helmet: z.string().nullable(),
  boots: z.string().nullable(),
  gloves: z.string().nullable(),
  amulet: z.string().nullable(),
  accessory: z.string().nullable(),
})

export type EquipmentType = z.infer<typeof equipmentSchema>
export type SlotType = keyof EquipmentType

export const emptyEquipment: EquipmentType = {
  weapon: null,
  offhand: null,
  armor: null,
  helmet: null,
  boots: null,
  gloves: null,
  amulet: null,
  accessory: null,
}

export const createCharacterSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(24, "Name too long"),
  class: z.enum(['soldier', 'wizard', 'ranger', 'warrior', 'bandit']),
  equipment: equipmentSchema.default(emptyEquipment),
  inventory: z.array(z.string()).default([]),
  gold: z.number().default(0),
  xp: z.number().default(0),
  level: z.number().default(1),
})

export type CreateCharacterInput = z.infer<typeof createCharacterSchema>