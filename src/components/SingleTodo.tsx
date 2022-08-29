import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../models/models';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import './style.scss';
import { Draggable } from 'react-beautiful-dnd';

interface Props {
    index: number;
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>; 
}

const SingleTodo = ({index, todo, todos, setTodos}: Props) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.name);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDone = (id: number) => {
        setTodos(
            todos.map(todo => todo.id === id ? {...todo, isDone: !todo.isDone} : todo)
        );
    };

    const handleDelete = (id: number) => {
        setTodos(
            todos.filter(todo => todo.id !== id)
        );
    };

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();

        setTodos(
            todos.map(todo => todo.id === id ? {...todo, name: editTodo} : todo)
        );
        setEdit(false);
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {(provided) => (
                <form className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    {
                        edit ? (
                            <input 
                                ref={inputRef}
                                type="text"
                                value={editTodo} 
                                onChange={(e) => setEditTodo(e.target.value)}
                                className="todos__single--text" 
                            />
                        ) : todo.isDone ? (
                            <s className="todos__single--text">
                                {todo.name}
                            </s>
                        ) : (
                            <span className="todos__single--text">
                                {todo.name}
                            </span>
                        )
                    }
                    <div>
                        <span 
                            className="icon" 
                            onClick={() => {
                                if (!edit && !todo.isDone) {
                                    setEdit(!edit);
                                }
                            }}>
                            <AiFillEdit />
                        </span>
                        <span className="icon" onClick={() => handleDelete(todo.id)}>
                            <AiFillDelete />
                        </span>
                        <span className="icon" onClick={() => handleDone(todo.id)}>
                            <MdDone />
                        </span>
                    </div>
                </form>
            )}
        </Draggable>
    )
}

export default SingleTodo;