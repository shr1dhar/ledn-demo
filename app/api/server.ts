import { app } from './app'
import * as http from 'http'
import mongoose from 'mongoose'

const port = process.env.PORT || 3001
const server = http.createServer(app)

server.listen(port, () => console.log(`Started at http://localhost:${port}`))

//const MONGO_URI = 'mongodb://127.0.0.1:27017/ledn'
const MONGO_URI = 'mongodb://mongodb_container:27017/ledn'

server.on('listening', async () => {
  mongoose.connect(MONGO_URI, {})
  mongoose.connection.once('open', () => {
    console.info('Connected to Mongo via Mongoose')
  })
  mongoose.connection.on('error', (err) => {
    console.error('Unable to connect to Mongo via Mongoose', err)
  })
})
