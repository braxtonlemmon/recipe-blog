const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const RecipeSchema = new Schema({
  title: { type: String, required: true },
  ingredients: { type: Array, required: true },
  steps: { type: Array, required: true },
  intro: { type: String },
  quote: { type: String },
  image: { type: String },
  is_published: { type: Boolean, default: false },
  publish_date: { type: Date, default: '' },
  created: { type: Date, default: Date.now() }
});

RecipeSchema.set('toObject', { virtuals: true });
RecipeSchema.set('toJSON', { virtuals: true })

RecipeSchema.virtual('url')
.get(function () {
  return `/recipe/${this._id}`;
});

RecipeSchema.virtual('date_formatted')
.get(function () {
  return moment(this.created).format('MMMM Do YYYY')
});

RecipeSchema.virtual('publish_date_formatted')
.get(function() {
  return moment(this.publish_date).format('MMMM Do YYYY')
});

module.exports = mongoose.model('Recipe', RecipeSchema);