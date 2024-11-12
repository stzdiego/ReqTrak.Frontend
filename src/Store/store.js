import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../Helpers/counterSlice'; // Tu reducer de contador
import authReducer from './authSlice'; // Importa el reducer de autenticación

const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer, // Registra el reducer de autenticación
    },
});

export default store;
