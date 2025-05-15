const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const server = express();

const filePath = path.join(__dirname, "todos.json");

server.use(cors({ origin: "http://localhost:3000" }));
server.use(express.json());

function loadTodos() {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data)
}

function saveTodos(todos) {
    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2))
}

server.get('/api/todos', (req, res) => {
    const todos = loadTodos();
    res.json(todos);
})

server.post('/api/todos', (req, res) => {
    const todos = loadTodos();
    const newTodo = {
        id: Date.now(), text: req.body.text, done: false
    }
    todos.push(newTodo);
    saveTodos(todos);
    res.json(newTodo)
})

server.listen(3001, console.log('server ist gestartet'))