import { Router } from 'express'
import { createCharacterSchema } from '../schemas/character.schema'
import { prisma } from '../prisma'
import {
  createCharacter,
  getAllCharacters,
} from '../services/character.service'

const router = Router()

router.post('/', async (req, res) => {
  const parsed = createCharacterSchema.safeParse(req.body)

if (!parsed.success) {
  return res.status(400).json({
    errors: parsed.error.issues,
  })
}

  const character = await createCharacter(parsed.data)
  res.status(201).json(character)
})

router.get('/', async (_req, res) => {
  const characters = await getAllCharacters()
  res.json(characters)
})

export default router