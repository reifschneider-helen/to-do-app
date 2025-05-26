const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const server = express();

server.use(cors({ origin: 'http://localhost:3000' }));
server.use(express.json());

const filePath = path.join(__dirname, 'todos.json');

function loadTodos() {
  const data = fs.readFileSync(filePath, 'utf-8');
  
  return JSON.parse(data);
}

function saveTodos(todos) {
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
}

server.get('/api/todos', (req, res) => {
  const todos = loadTodos();

  res.status(200).json(todos);
});

server.post('/api/todos', (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Invalid text for new todo' });
  }

  const todos = loadTodos();
  const newTodo = {
    id: Date.now(),
    text: text.trim(),
    done: req.body.done ?? false,
  };

  todos.push(newTodo);
  saveTodos(todos);

  res.status(201).json(newTodo);
});

server.patch('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const todos = loadTodos();

  const todo = todos.find((todo) => todo.id === id);

  if (todo) {
    todo.done = !todo.done;
    saveTodos(todos);

    res.status(200).json(todo);
  } else {
    res.status(404).json({ error: 'Todo does not exist' });
  }
});

server.delete('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const todos = loadTodos();

  const todoExists = todos.some((todo) => todo.id === id);

  if (todoExists) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    saveTodos(newTodos);

    res.status(200).json(newTodos);
  } else {
    res.status(404).json({ error: 'Todo does not exist' });
  }
});

const app = server.listen(3001, () => {
  console.log('server ist gestartet', Date.now());
});

module.exports = app;
