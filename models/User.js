const mongoose = require('mongoose')

// Define User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: Number,
})

// Export the model
module.exports = mongoose.model('User', userSchema)
