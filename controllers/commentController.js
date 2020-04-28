const indexComments = (req, res, next) => {
  res.send('comments index');
}

const newComment = (req, res, next) => {
  res.send('new comment form');
}

const createComment = (req, res, next) => {
  res.send('create new comment');
}

const destroyComment = (req, res, next) => {
  res.send('destroy comment');
}

export default {
  indexComments,
  newComment,
  createComment,
  destroyComment,
}