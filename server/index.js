require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const Todo = require('./models/todo');

const server = express();
server.use(cors({ origin: 'http://localhost:3000' }));
server.use(express.json());

connectDB();

server.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Error while loadind Todos' });
  }
});

server.post('/api/todos', async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Invalid text for new todo' });
  }

  try {
    const newTodo = new Todo({ text: text.trim() });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    return res.status(500).json({ error: 'Error while saving Todos' });
  }
});

server.patch('/api/todos/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo is not found' });
    }

    todo.done = !todo.done;
    await todo.save();

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Error while updating' });
  }
});

server.delete('/api/todos/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Todo.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Todo is not found' });
    }
    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ error: 'Error while deleting' });
  }
});

const app = server.listen(3001, () => {
  console.log('server ist gestartet', Date.now());
});

module.exports = app;
