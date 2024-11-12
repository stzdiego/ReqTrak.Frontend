import React, { useState } from 'react';

const CounterApp = () => {
    // Hook useState para manejar el estado del contador
    const [counter, setCounter] = useState(10); // Valor predeterminado 10

    // Función para manejar la resta del contador
    const handleSubtract = () => {
        setCounter(counter - 1);  // Resta 1 al valor actual del contador
    };

    // Función para manejar el reinicio del contador
    const handleReset = () => {
        setCounter(10);  // Restablece el contador al valor predeterminado (10)
    };

    return (
        <div>
            <h1>Contador: {counter}</h1>
            <button onClick={() => setCounter(counter + 1)}>Sumar</button>
            <button onClick={handleSubtract}>Restar</button>  {/* Botón para restar */}
            <button onClick={handleReset}>Reiniciar</button>  {/* Botón para reiniciar */}
        </div>
    );
};

export default CounterApp;
