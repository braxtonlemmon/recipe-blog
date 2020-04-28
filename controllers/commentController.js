import Comment from '../models/comment';
import { body, validationResult } from 'express-validator';

const indexComments = (req, res, next) => {
  Comment.find({})
  .exec(function(err, comments) {
    if (err) { return next(err) }
    res.send(comments);
    return;
  })
}

const newComment = (req, res, next) => {
  res.send('new comment form');
}

const createComment = [
  body('content', 'Message content is required').trim().isLength({ min: 1 }).escape(),
  body('recipe', 'Recipe must be specified').isLength({ min: 1 }).escape(),
  body('name').escape(),
  
  (req, res, next) => {
    const errors = validationResult(req);
    const comment = new Comment({
      content: req.body.content,
      name: req.body.name ? req.body.name : 'Anonymous',
      created: Date.now(),
      recipe: req.body.recipe
    })
    if (!errors.isEmpty()) {
      res.send({ comment: comment, errors: errors.array() });
      return;
    }
    else {
      comment.save(function(err) {
        if (err) { return next(err) }
        res.send(comment);
      });
    }
  }
];

const destroyComment = (req, res, next) => {
  Comment.findById(req.params.id)
    .exec(function(err, comment) {
      if (err) { return next(err) }
      Comment.findByIdAndRemove(req.body.commentid, function deleteComment(err) {
        if (err) { return next(err) }
        res.send('comment deleted!')
      })
    })
}

export default {
  indexComments,
  newComment,
  createComment,
  destroyComment,
}