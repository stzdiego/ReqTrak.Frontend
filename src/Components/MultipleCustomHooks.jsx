import React, { useCallback } from 'react';
import useFetch from '../Helpers/useFetch';
import useCounter from '../Helpers/useCounter';

const MultipleCustomHooks = () => {
    const { count, increment } = useCounter(1);
    const { data, isLoading, error } = useFetch(`https://api.breakingbadquotes.xyz/v1/quotes/${count}`);

    const handleIncrement = useCallback(() => {
        increment(); // Usamos el método increment del hook de contador
    }, [increment]); // Dependencia para que no se re-cree

    if (isLoading) {
        return <h2>Cargando...</h2>;
    }

    if (error) {
        return <h2>Error: {error}</h2>;
    }

    return (
        <div>
            <h1>Cita de Breaking Bad</h1>
            {data && (
                <blockquote>
                    <p>{data[0].quote}</p>
                    <footer>{data[0].author}</footer>
                </blockquote>
            )}
            <button onClick={handleIncrement}>Obtener otra cita</button>
        </div>
    );
};

export default MultipleCustomHooks;
