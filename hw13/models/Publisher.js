import mongoose from 'mongoose'

const publisherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
})

export const Publisher = mongoose.model('Publisher', publisherSchema)
