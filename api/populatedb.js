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
          ['500g (1lb) Yukon Gold potatoes', '100g (1/2 cup) vegetable oil', '1 large yellow onion',  '6 eggs', '1/2 bunch parsley', '1/2 teaspoon salt', '1/4 teaspoon black pepper'],
          [
            'Peel the potatoes and slice into 5mm (1/4 inch) rounds.',
            'Peel and dice the onion.',
            'Chop the parsley.',
            'Heat a medium (~23cm / 9in) non-stick skillet over medium heat. Add the oil once the pan is hot.',
            'Add the onion to the pan and cook for 2-3 minutes.', 
            'Add the potatoes and reduce the heat to medium-low.',
            'Frequently stir the potatoes and onion and cook for about 30 minutes or until the potato rounds are cooked through.',
            'Remove the pan from heat and transfer the potatoes and onion to a separate bowl to cool.',
            'In a clean bowl, add the eggs and briefly beat.',
            'Stir in the potatoes, onion, parsley, salt, and pepper and stir until combined.',
            'Put the skillet on the stove over medium heat and add enough oil to coat the bottom.',
            'Pour the bowl of egg mixture into the pan and let cook for about 5-8 minutes. Use a rubber spatula to occasionally lift and check the bottom of the tortilla.',
            'Once the bottom of the tortilla is browned (the top surface of the tortilla may still be quite runny), use a spatula to quickly and gently slide the entire tortilla to a clean heatproof plate that has a diameter larger than the pan.',
            'Flip the skillet upside down and place on top of the tortilla on the plate. Using hotpads, grab the skillet and plate (with the tortilla inside) like you would a sandwich and quickly flip the entire thing so that the plate is now on top.',
            'Return the pan to the stovetop and cook for another 5-8 minutes until the bottom is browned and the inside of the tortilla is no longer runny.',
            'Remove the tortilla from the pan and allow to cool. Serve warm or at room temperature.',
            'Store leftovers in the refrigerator.'

          ],
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