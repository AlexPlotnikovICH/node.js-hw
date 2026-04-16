import mongoose from 'mongoose'

const magazineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  issueNumber: {
    type: Number,
    required: true,
  },
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Publisher',
    required: true,
  },
})

export const Magazine = mongoose.model('Magazine', magazineSchema)
