import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDb from './configs/db.js'
import { clerkMiddleware } from '@clerk/express'
import clerkWebHooks from './controllers/clerkWebhooks.js'

connectDb()

const app = express()
app.use(cors())
//  Middleware
app.use(express.json())
app.use(clerkMiddleware())

// API to listen to Clerk Webhooks
app.use("/api/clerk", clerkWebHooks)

app.get('/', (req,res)=>res.send("API is working"))

const PORT =process.env.PORT || 3000;

app.listen(3000, () => {
  console.log("Server running on port 3000");
})
