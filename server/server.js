import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 4000
const app = express()

app.use(express.json())
app.use(cors())

await connectDB()

app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)

// API test route
app.get('/', (req, res) => res.send("API working"))

// Serve React frontend static files
app.use(express.static(path.join(__dirname, '../client/build')))

// For any other route, serve React's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
})

app.listen(PORT, () => console.log('server running on port ' + PORT))
