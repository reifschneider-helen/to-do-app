# 📝 ToDo App with JavaScript & Redux

This ToDo application is built with React, JavaScript, and Redux. It allows users to add, delete, and mark tasks as completed. The app features task filtering, a Dark Mode toggle, and a count of open tasks.

## 🚀 Features

- Add, delete, and check off tasks  
- Counter for open tasks  
- Dark Mode toggle  
- Keyboard support (press Enter to add a task)  
- Data persistence using MongoDB through a custom backend REST API  

## 🛠️ Technologies Used

- React  
- JavaScript  
- Redux Toolkit  
- CSS Modules  
- Node.js + Express (Backend)  
- MongoDB + Mongoose (Database)  

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/reifschneider-helen/to-do-app.git
cd to-do-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup MongoDB
   You need to have access to a MongoDB instance. This can be a local MongoDB server or a cloud MongoDB service like MongoDB Atlas.
- Create a MongoDB database and get the connection URI.
- Create a .env file in the backend folder with your MongoDB connection string, for example:
MONGO_URI=your_mongodb_connection_string
PORT=5000

### 4. Start the backend server
```bash
npm run server
```

### 5. Start the frontend development server
```bash
npm start
```
