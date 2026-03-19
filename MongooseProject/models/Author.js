import mongoose from 'mongoose'

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: 'Биография не указана',
  },
})

const Author = mongoose.model('Author', authorSchema)

export default Author
