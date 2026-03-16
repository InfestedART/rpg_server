import express from 'express';
import cors from 'cors';
// import { prisma } from './prisma';
import characterRoutes from './routes/characters';

const app = express()

app.use(cors())
app.use(express.json())


app.use('/characters', characterRoutes)

/* app.post('/characters', async (req, res) => {
  const { name, class: characterClass, equipment } = req.body

  const character = await prisma.character.create({
    data: {
      name,
      class: characterClass,
      equipment,
    },
  })

  res.status(201).json(character)
}) */

app.listen(3001, () => {
  console.log('Backend running on http://localhost:3001')
})