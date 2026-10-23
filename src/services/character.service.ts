import { prisma } from '../prisma'
import type { CreateCharacterInput } from '../schemas/character.schema'

export async function createCharacter(data: CreateCharacterInput) {
  return prisma.character.create({
    data,
  })
}

export async function getAllCharacters() {
  return prisma.character.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export async function getCharacterById(id: number) {
  return prisma.character.findUnique({
    where: { id },
  })
}

export async function deleteCharacter(id: number) {
  return prisma.character.delete({
    where: { id },
  })
}

export async function addGold(id: number, goldAmount: number) {
  const character = await prisma.character.findUnique({ where: { id } });
  if (!character) throw new Error('Character not found');

  const newGold = Math.max(0, character.gold + goldAmount);
  return prisma.character.update({
    where: { id },
    data: { gold: newGold },
  })
}

export async function addXp(charId: number, xp: number) {
  const character = await prisma.character.findUnique({ where: { id: charId } });
  if (!character) throw new Error('Character not found');

  const newXp = Math.max(0, character.xp + xp);
  return prisma.character.update({
    where: { id: charId },
    data: { xp: { increment: newXp } },
  })
}

export async function updateItems(charId: number, equipment: string, inventory: string) {
  const character = await prisma.character.findUnique({ where: { id: charId } });
  if (!character) throw new Error('Character not found');

  console.log('==> inside service', equipment, inventory)

  return prisma.character.update({
    where: { id: charId },
    data: { 
      equipment: JSON.stringify(equipment),
      inventory: JSON.stringify(inventory),
    }
  })
}

export async function updateInventory(charId: number, inventory: string) {
  const character = await prisma.character.findUnique({ where: { id: charId } });
  if (!character) throw new Error('Character not found');

  return prisma.character.update({
    where: { id: charId },
    data: { inventory: JSON.stringify(inventory) }
  })
}

export async function updateEquipment(charId: number, equipment: string) {
  const character = await prisma.character.findUnique({ where: { id: charId } });
  if (!character) throw new Error('Character not found');

  return prisma.character.update({
    where: { id: charId },
    data: { equipment: JSON.stringify(equipment) }
  })
}

export async function getCharInventory(charId: number) {
  const character = await prisma.character.findUnique({ where: { id: charId } });
  if (!character) throw new Error('Character not found');
  
  return character.inventory
}