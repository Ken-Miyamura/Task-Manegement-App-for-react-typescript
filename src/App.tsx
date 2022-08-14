import { useState } from 'react';
import './App.scss';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from './models/models';

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("");
  const [todos, settodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      settodos([...todos, {id: Date.now(), name: todo, isDone: false}]);
      setTodo("");
    };
  };

  return (
    <div className="App">
      <span className="heading text-gray-600 font-neucha">Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.name}</li>
      ))}
      {/* <TodoList /> */}
    </div>
  )
}

export default App
