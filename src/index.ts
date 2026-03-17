import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import characterRoutes from './routes/characters';

const app = express()

app.use(cors())
app.use(express.json())
app.use('/characters', characterRoutes)

app.listen(3001, () => {
  console.log('Backend running on http://localhost:3001')
})