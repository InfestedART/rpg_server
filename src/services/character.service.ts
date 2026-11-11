import { prisma } from '../prisma'
import type { CreateCharacterInput, EquipmentType } from '../schemas/character.schema'

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
    data: { xp: newXp },
  })
}

export async function levelUp(charId: number) {
  const character = await prisma.character.findUnique({ where: { id: charId } });
  if (!character) throw new Error('Character not found');

  return prisma.character.update({
    where: { id: charId },
    data: {
      level: { increment: 1 },
      xp: 0,
    },
  })
}

export async function updateItems(charId: number, equipment: EquipmentType, inventory: string[]) {
  const character = await prisma.character.findUnique({ where: { id: charId } });
  if (!character) throw new Error('Character not found');

  return prisma.character.update({
    where: { id: charId },
    data: { 
      equipment,
      inventory,
    }
  })
}

export async function updateInventory(charId: number, inventory: string[]) {
  const character = await prisma.character.findUnique({ where: { id: charId } });
  if (!character) throw new Error('Character not found');

  return prisma.character.update({
    where: { id: charId },
    data: { inventory: inventory }
  })
}

export async function updateEquipment(charId: number, equipment: EquipmentType) {
  const character = await prisma.character.findUnique({ where: { id: charId } });
  if (!character) throw new Error('Character not found');

  return prisma.character.update({
    where: { id: charId },
    data: { equipment: equipment }
  })
}

export async function getCharInventory(charId: number) {
  const character = await prisma.character.findUnique({ where: { id: charId } });
  if (!character) throw new Error('Character not found');
  
  return character.inventory
}