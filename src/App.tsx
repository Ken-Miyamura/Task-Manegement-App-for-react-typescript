import { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import './App.scss';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from './models/models';

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completeTodos, setCompleteTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, {id: Date.now(), name: todo, isDone: false}]);
      setTodo("");
    };
  };

  const onDragEnd = (result: DropResult) => {
    const {destination, source} = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    
    let add;
    // todosのコピー
    const active = [...todos];
    // comcompleteTodosのコピー
    const completed = [...completeTodos];

    // sourceプロパティ（dnd前の対象todoの状態）のロジック
    if (source.droppableId === 'TodoList') {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = completed[source.index];
      completed.splice(source.index, 1);
    }

    // destinationプロパティ（dnd後の対象todoの状態）のロジック
    if (destination.droppableId === 'TodoList') {
      active.splice(destination.index, 0, add);
    } else {
      completed.splice(destination.index, 0, add);
    }

    setTodos(active);
    setCompleteTodos(completed);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading text-gray-600 font-neucha">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
        <TodoList todos={todos} setTodos={setTodos} completeTodos={completeTodos} setCompleteTodos={setCompleteTodos} />
      </div>
    </DragDropContext>
  )
}

export default App
