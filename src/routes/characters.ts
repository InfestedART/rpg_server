import { Router } from 'express'
import { createCharacterSchema } from '../schemas/character.schema'

import {
  createCharacter,
  getAllCharacters,
  deleteCharacter,
  getCharacterById,
} from '../services/character.service'

const router = Router()

router.post('/', async (req, res) => {
  const parsed = createCharacterSchema.safeParse(req.body);

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

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);  
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID' })
  }

  const char = await getCharacterById(id)
  res.json(char);
})

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID' })
    }

    await deleteCharacter(id);
    return res.status(204).send()

  } catch (error: any) {
    console.error(error)
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Character not found' })
    }

    return res.status(500).json({ error: 'Internal server error' })

  }
})

export default router