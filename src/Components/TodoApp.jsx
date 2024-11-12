import React from 'react';
import TodoList from './TodoList'; // Importamos el componente TodoList
import TodoForm from './TodoForm'; // Importamos el componente TodoForm
import useTodo from '../Helpers/useTodo'; // Importamos el Custom Hook

const TodoApp = () => {
    const { todos, addTodo, deleteTodo, toggleTodo, countTodos, countPendingTodos } = useTodo(); // Usamos el Custom Hook

    return (
        <div>
            <h1>Lista de Tareas</h1>
            <TodoForm addTodo={addTodo} /> {/* Pasamos la función addTodo como prop */}
            <h2>Total de Tareas: {countTodos()}</h2>
            <h2>Tareas Pendientes: {countPendingTodos()}</h2>
            <TodoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} /> {/* Pasamos las funciones como props */}
        </div>
    );
};

export default TodoApp;