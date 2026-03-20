import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  releaseYear: { type: Number },
  actors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Actor' }],
})

export default mongoose.model('Movie', movieSchema)
