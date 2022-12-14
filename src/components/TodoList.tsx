import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Todo } from '../models/models';
import SingleTodo from './SingleTodo';
import './style.scss';

interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completeTodos: Todo[];
    setCompleteTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodoList: React.FC<Props> = ({todos, setTodos, completeTodos, setCompleteTodos}) => {
  return (
    <div className="container">
        <Droppable droppableId='TodoList'>
            {(provided, snapshot) => (
                <div 
                    className={`todos ${snapshot.isDraggingOver ? 'drag-active' : ''}`} 
                    ref={provided.innerRef} 
                    {...provided.droppableProps}
                >
                    <span className="todos__heading">
                        Active Tasks
                    </span>
                    {todos.map((todo, index) => (
                        <SingleTodo
                            index={index}
                            todo={todo} 
                            key={todo.id}
                            todos={todos}
                            setTodos={setTodos}
                        />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
        <Droppable droppableId='TodoComplete'>
            {(provided, snapshot) => (
                <div 
                    className={`todos remove ${snapshot.isDraggingOver ? 'drag-complete' : ''}`}
                    ref={provided.innerRef} 
                    {...provided.droppableProps}
                >
                    <span className="todos__heading">
                        Completed Tasks
                    </span>
                    {completeTodos.map((todo, index) => (
                        <SingleTodo 
                            index={index}
                            todo={todo} 
                            key={todo.id}
                            todos={completeTodos}
                            setTodos={setCompleteTodos}
                        />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    </div>
  );
}

export default TodoList;