#! /usr/bin/env node

console.log(
  "This script populates some test recipes, comments, and user to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require("async");
const bcrypt = require('bcryptjs');

const User = require('./models/user');
const Comment = require('./models/comment');
const Recipe = require('./models/recipe');

const mongoose = require("mongoose");
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

let users = [];
let recipes = [];
let comments = [];

function userCreate(username, password, cb) {
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      cb(err, null);
      return;
    }
    userdetail = { username, password: hashedPassword };
    const user = new User(userdetail);
    user.save(err => {
      if (err) {
        cb(err, null);
        return;
      }
      console.log(`New User: ${user}`);
      users.push(user);
      cb(null, user);
    });
  });
}

function recipeCreate(title, ingredients, steps, intro, image, published, created, cb) {
  recipedetail = { title, ingredients, steps, intro, image, published, created };
  const recipe = new Recipe(recipedetail);
  recipe.save(err => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New Recipe: ${recipe}`);
    recipes.push(recipe);
    cb(null, recipe);
  });
}

function commentCreate(content, name, recipe, created, cb) {
  commentdetail = { content, name, recipe, created };
  const comment = new Comment(commentdetail);
  comment.save(err => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New Comment: ${comment}`);
    comments.push(comment);
    cb(null, comment);
  });
}

function createUser(cb) {
  async.parallel(
    [
      function(callback) {
        userCreate(
          'braxton', 
          'foobar', 
          callback
        );
      }
    ],
    cb
  )
}

function createRecipes(cb) {
  async.parallel(
    [
      function(callback) {
        recipeCreate(
          "Bread",
          ["Flour", "Water", "Yeast", "Salt"],
          ["Mix dry", "Mix wet", "Knead for 10 minutes", "Bake at 350"],
          "Simple homemade bread",
          'https://cdn.pixabay.com/photo/2020/02/17/17/10/bread-4857068_960_720.jpg',
          false,
          Date.now(),
          callback
        );
      },
      function(callback) {
        recipeCreate(
          'Spanish Tortilla',
          ['6 eggs', '500g potatoes', '1 yellow onion', '1/2 bunch parsley', 'salt'],
          ['Slice potatoes and onion.', 'Cook potatoes and onion in oil', 'Mix with eggs', 'Add parsley', 'Cook for 15 minutes'],
          'Great way to use up leftover potatoes and onions',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Spanish_Tortilla_%285845088254%29.jpg/800px-Spanish_Tortilla_%285845088254%29.jpg',
          false,
          Date.now(),
          callback
        );
      },
      function(callback) {
        recipeCreate(
          'Cereal',
          ['Milk', 'Box of cereal', 'Sugar'],
          ['Pour dry cereal into bowl', 'Add desired amount of milk', 'Add spoonfuls of sugar', 'Eat'],
          'This is what you should eat every day',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bowl_of_Cereal_%28Unsplash%29.jpg/800px-Bowl_of_Cereal_%28Unsplash%29.jpg',
          false,
          Date.now(),
          callback
        );
      },
    ],
    cb
  );
};

function createComments(cb) {
  async.parallel(
    [
      function (callback) {
        commentCreate(
          'It did not work for me',
          'Jane',
          recipes[0],
          Date.now(),
          callback
        );
      },
      function (callback) {
        commentCreate(
          'This is really good with butter!',
          'Frank P',
          recipes[0],
          Date.now(),
          callback
        );
      },
      function (callback) {
        commentCreate(
          'Reminds me of when I was a kid or when I was 32 also',
          'Ted',
          recipes[2],
          Date.now(),
          callback
        );
      },
    ],
    cb
  );
};



async.series(
  [createUser, createRecipes, createComments],
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    } else {
      console.log('COMMENTS: ' + comments);
    }
    mongoose.connection.close();
  }
);