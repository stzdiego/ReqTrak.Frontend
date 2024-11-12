import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
    const [inputValue, setInputValue] = useState(''); // Estado para el valor de entrada

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario
        if (inputValue.trim()) {
            addTodo(inputValue); // Llama a la función addTodo del padre
            setInputValue(''); // Limpia el campo de entrada
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)} // Actualiza el estado con el valor del input
                placeholder="Nueva tarea"
            />
            <button type="submit">Agregar Tarea</button>
        </form>
    );
};

export default TodoForm;
