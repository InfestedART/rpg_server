import express from 'express';
import cors from 'cors';

const app = express()

app.use(cors())
app.use(express.json())

app.post('/characters', (req, res) => {
  console.log(req.body)
  res.status(201).json({ message: 'Character saved (not really yet)' })
})

app.listen(3001, () => {
  console.log('Backend running on http://localhost:3001')
})