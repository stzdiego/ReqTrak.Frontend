import { useState } from 'react';

const useTodo = () => {
    const [todos, setTodos] = useState([]); // Estado para la lista de tareas

    const addTodo = (newTodo) => {
        setTodos([...todos, { text: newTodo, completed: false }]); // Agrega la nueva tarea como un objeto
    };

    const deleteTodo = (index) => {
        setTodos(todos.filter((_, i) => i !== index)); // Elimina la tarea en el índice especificado
    };

    const toggleTodo = (index) => {
        setTodos(todos.map((todo, i) =>
            i === index ? { ...todo, completed: !todo.completed } : todo
        )); // Alterna el estado de completado
    };

    const countTodos = () => todos.length; // Cuenta total de tareas

    const countPendingTodos = () => todos.filter(todo => !todo.completed).length; // Cuenta de tareas pendientes

    return {
        todos,
        addTodo,
        deleteTodo,
        toggleTodo,
        countTodos,
        countPendingTodos,
    };
};

export default useTodo;
