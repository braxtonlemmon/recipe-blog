import moment from 'moment';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: { type: String, required: true, max: 1000 },
  name:    { type: String, max: 100 },
  created: { type: Date, required: true },
  recipe:  { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

CommentSchema.virtual('dateFormatted')
.get(function () {
  return moment(this.created).format('MMMM Do YYYY, h:mm a');
});

module.exports = mongoose.model('Comment', CommentSchema);

