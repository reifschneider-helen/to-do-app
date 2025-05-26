import Todo from './components/todos/todos';
import DateTime from './components/dateTime/dateTime';
import './App.css';

function App() {
  return (
    <div className="app">
      <header>
        <DateTime />
      </header>
      <div className="body">
        <Todo />
      </div>
      <footer></footer>
    </div>
  );
}

export default App;
