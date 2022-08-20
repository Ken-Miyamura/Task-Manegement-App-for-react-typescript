import React from 'react';
import { Todo } from '../models/models';
import SingleTodo from './SingleTodo';
import './style.scss';

interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodoList: React.FC<Props> = ({todos, setTodos}) => {
  return (
    <div className="todos">
        {todos.map((todo) => (
            // <li key={todo.id}>{todo.name}</li>
            <SingleTodo 
                todo={todo} 
                key={todo.id}
                todos={todos}
                setTodos={setTodos}
            />
        ))}
    </div>
  );
}

export default TodoList;