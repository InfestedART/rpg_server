import { Router } from 'express'
import { createCharacterSchema, equipmentSchema } from '../schemas/character.schema'
import { z } from 'zod'

import {
  createCharacter,
  getAllCharacters,
  deleteCharacter,
  getCharacterById,
  addGold,
  addXp,
  updateInventory,
  updateEquipment,
  updateItems,
  levelUp,
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

  const char = await getCharacterById(id);
  res.json(char);
})

router.patch('/:id/add_gold/:gold', async (req, res) => {
  const id = Number(req.params.id);
  const gold = Number(req.params.gold);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid character id' })
  }

  if (isNaN(gold) || gold < 0) {
    return res.status(400).json({ error: 'Invalid Gold Amount' })
  }

  const char = await addGold(id, gold);
  res.json(char);
})

router.patch('/:id/add_xp/:xp', async (req, res) => {
  const id = Number(req.params.id);
  const xp = Number(req.params.xp);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid character id' })
  }

  if (isNaN(xp) || xp < 0) {
    return res.status(400).json({ error: 'Invalid XP Amount' })
  }

  const char = await addXp(id, xp);
  res.json(char);
})

router.patch('/:id/level_up', async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid character id' })
  }

  try {
    const char = await levelUp(id);
    return res.json(char);
  } catch(err) {
    res.status(404).json({ error: `==> Could not level up character with id ${id}` });
  }
})

router.patch('/:id/update_inventory', async(req, res) => {
  const id = Number(req.params.id);
  const { inventory } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid character id' })
  }

  try {
    const char = await updateInventory(id, inventory);
    return res.json(char);
  } catch(err) {
    res.status(404).json({ error: `==> Could not update character with id ${id}` });
  }
}) 

router.patch('/:id/update_equipment', async(req, res) => {
  const id = Number(req.params.id);
  const { equipment } = req.body;
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid character id' })
  }

  try {
    const char = await updateEquipment(id, equipment);
    return res.json(char);
  } catch(err) {
    res.status(404).json({ error: `==> Could not update character with id ${id}` });
  }
}) 

router.patch('/:id/update_items', async(req, res) => {
  const id = Number(req.params.id);
  // const { equipment, inventory } = req.body;
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid character id' })
  }

  const updateItemsSchema = z.object({
    equipment: equipmentSchema,
    inventory: z.array(z.string()),
  });

  const parsed = updateItemsSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid equipment or inventory' });
  }

  try {
    const char = await updateItems(id, parsed.data.equipment, parsed.data.inventory);
    return res.json(char);
  } catch(err) {
    res.status(404).json({ error: `==> Could not update character with id ${id}` });
  }
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