import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0, // Estado inicial del contador
    },
    reducers: {
        increment: (state) => {
            state.value += 1; // Incrementa el contador en 1
        },
        decrement: (state) => {
            state.value -= 1; // Decrementa el contador en 1
        },
        incrementBy: (state, action) => {
            state.value += action.payload; // Incrementa el contador por el valor dado
        },
    },
});

// Exportar las acciones generadas
export const { increment, decrement, incrementBy } = counterSlice.actions;

// Exportar el reducer
export default counterSlice.reducer;
