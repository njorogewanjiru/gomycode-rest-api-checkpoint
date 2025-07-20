const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const User = require('./models/User')

// Load env vars
dotenv.config({ path: './config/.env' })

const app = express()

// Middleware to parse JSON
app.use(express.json())

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err))

// Routes

// GET all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// POST a new user
app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body)
    await newUser.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// PUT (update) user by ID
app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.json(updatedUser)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE user by ID
app.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.json({ message: 'User deleted' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`))
