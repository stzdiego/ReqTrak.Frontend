import React, { useState } from 'react';

const CategoryApp = () => {
    // Hook para manejar el valor del input
    const [inputValue, setInputValue] = useState('');

    // Hook para manejar la lista de categorías
    const [categories, setCategories] = useState(['Categoría 1', 'Categoría 2']);

    // Función que maneja los cambios en el input
    const handleInputChange = (e) => {
        setInputValue(e.target.value);  // Actualizamos el valor del input
    };

    // Función que agrega una nueva categoría a la lista
    const handleAddCategory = () => {
        if (inputValue.trim().length > 0) {
            setCategories([...categories, inputValue]);  // Añadir la nueva categoría
            setInputValue('');  // Limpiar el campo de entrada
        }
    };

    return (
        <div>
            <h1>Lista de Categorías</h1>

            {/* Input para ingresar nueva categoría */}
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Nueva categoría"
            />

            {/* Botón para agregar la categoría */}
            <button onClick={handleAddCategory}>Agregar Categoría</button>

            {/* Mostrar las categorías en una lista */}
            <ul>
                {categories.map((category, index) => (
                    <li key={index}>{category}</li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryApp;
