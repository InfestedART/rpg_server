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
    data: { gold: { increment: newGold } },
  })
}