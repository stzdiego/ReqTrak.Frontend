import React from 'react';

const TodoList = ({ todos, deleteTodo, toggleTodo }) => {
    return (
        <ul>
            {todos.map((todo, index) => (
                <li key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                    <span onClick={() => toggleTodo(index)}>{todo.text}</span> {/* Alternar estado de completado */}
                    <button onClick={() => deleteTodo(index)}>Eliminar</button> {/* Botón para eliminar tarea */}
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
