require('dotenv').config({ path: '.test.env' });
const request = require('supertest');
const mongoose = require('mongoose');
const connectDB = require('../db.js');
const server = require('../index.js');

const Todo = require('../models/todo.js');

jest.setTimeout(20000);

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  //   await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('API test with MongoDB', () => {
  describe('POST /api/todos', () => {
    it('should create a new todo', async () => {
      const res = await request(server)
        .post('/api/todos')
        .send({ text: 'MongoDB test todo' });

      expect(res.statusCode).toBe(201);
      expect(res.body.text).toBe('MongoDB test todo');
      expect(res.body.done).toBe(false);
    });

    it('Should return an error', async () => {
      const res = await request(server).post('/api/todos').send({ text: '' });

      expect(res.statusCode).toBe(400);
      expect(res.body.text).toBe(undefined);
    });
  });

  describe('GET /api/todos', () => {
    it('should return a list of todos', async () => {
      const res = await request(server).get('/api/todos');

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  //   describe('PATCH api/tpdps');
});
