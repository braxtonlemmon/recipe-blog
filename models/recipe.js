import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  title: { type: String, required: true },
  ingredients: { type: Array, required: true },
  steps: { type: Array, required: true },
  intro: { type: String },
  image: { type: String }
});

RecipeSchema.virtual('url')
.get(function () {
  return `/recipe/${this._id}`;
});

module.exports = mongoose.model('Recipe', RecipeSchema);