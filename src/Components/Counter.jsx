import React from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Importamos los hooks de Redux
import { increment, decrement, incrementBy } from '../Helpers/counterSlice'; // Importamos las acciones

const Counter = () => {
    const count = useSelector((state) => state.counter.value); // Obtenemos el valor del contador
    const dispatch = useDispatch(); // Hook para despachar acciones

    return (
        <div>
            <h1>Contador: {count}</h1>
            <button onClick={() => dispatch(increment())}>Incrementar</button>
            <button onClick={() => dispatch(decrement())}>Decrementar</button>
            <button onClick={() => dispatch(incrementBy(5))}>Incrementar por 5</button>
        </div>
    );
};

export default Counter;
