const newUser = (req, res, next) => {
  res.send('new user');
}

const createUser = (req, res, next) => {
  res.send('create user');
}

const editUser = (req, res, next) => {
  res.send('edit user');
}

const updateUser = (req, res, next) => {
  res.send('update user');
}

const destroyUser = (req, res, next) => {
  res.send('destroy user');
}

const showUser = (req, res, next) => {
  res.send('show user');
}

export default {
  newUser,
  createUser,
  editUser,
  updateUser,
  destroyUser,
  showUser,
}