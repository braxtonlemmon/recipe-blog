require("regenerator-runtime/runtime");

const { MongoClient } = require('mongodb');

describe('test', () => {
  let connection;
  let db;

  beforeAll(async() => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);
  })

  afterAll(async() => {
    await connection.close();
    await db.close();
  })
  test("it works", (done) => {
    request(app)
      .get("/okay")
      .expect("Content-Type", /json/)
      .expect({ name: "frodo" })
      .expect(200, done);
  });

  test("get recipes works", (done) => {
    request(app).get("/").expect("Content-Type", /json/).expect(200, done);
  });

})

// require('../config/databaseTesting');
// import router from '../routes/recipes';
// import { Mongoose } from 'mongoose';

// const request = require('supertest');
// const express = require('express');
// const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use('/', router);

// beforeAll(done => {
//   done()
// })

// afterAll(done => {
//   Mongoose.connection.close();
//   done;
// })

// test('it works', done => {
//   request(app)
//   .get('/okay')
//   .expect('Content-Type', /json/)
//   .expect({ name: 'frodo' })
//   .expect(200, done);
// });

// test('get recipes works', done => {
//   request(app)
//   .get('/')
//   .expect('Content-Type', /json/)
//   .expect(200, done)
// });
// it('testing to see if jest works', () => {
//   expect(1).toBe(1);
// });

// test('GET /recipes', () => {
//   it('respons with json containing list of all recipes', done => {
//     request(app)
//       .get('/')
//       .set('Accept', 'application/json')
//       .expect('Content-Type', /json/)
//       .expect(200, done);

//   });
// });