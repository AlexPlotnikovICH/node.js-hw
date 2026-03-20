import mongoose from 'mongoose'

const actorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthdate: { type: Date }, // Тип Date для точности
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
})

export default mongoose.model('Actor', actorSchema)
