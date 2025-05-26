import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch("http://localhost:3001/api/todos");
  const data = await response.json();
  return data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (text) => {
  const response = await fetch("http://localhost:3001/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  const newTodo = await response.json();
  return newTodo;
});

export const toggleTodo = createAsyncThunk("todos/toggleTodo", async (id) => {
  const response = await fetch(`http://localhost:3001/api/todos/${id}`, {
    method: "PATCH",
  });
  const todo = await response.json();
  return todo;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await fetch(`http://localhost:3001/api/todos/${id}`, {
    method: "DELETE",
  });
  return id;
});
