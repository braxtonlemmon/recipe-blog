const express = require('express');
const router = express.Router();
import Comment from '../models/comment';
import { body, validationResult } from 'express-validator';

// Get comments for specific recipe
router.get('/comments/:recipeid', (req, res, next) => {
  Comment.find({ recipe: req.params.recipeid })
  .exec((err, comments) => {
    if (err) {
      return next(err);
    }
    res.json({ success: true, data: comments});
    return;
  })
})

// Create comment
router.post('/comments', [
  body('content', 'Content is required').trim().isLength({ min: 1, max: 1000 }),
  body('name').escape(),
  body('recipe', 'Recipe is required').trim().isLength({ min: 1 }),

  (req, res, next) => {
    console.log('made it to here')
    const errors = validationResult(req);
    const comment = new Comment({
      content: req.body.content,
      name: req.body.name === '' ? 'Anonymous' : req.body.name,
      created: Date.now(),
      recipe: req.body.recipe
    });
    if (!errors.isEmpty()) {
      res.send({ comment: comment, errors: errors.array() });
      return;
    }
    comment.save(err => {
      if (err) {
        return next(err);
      }
      res.send(comment);
    })
  }
])


module.exports = router;