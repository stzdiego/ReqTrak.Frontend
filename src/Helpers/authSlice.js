import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = {
                uid: action.payload.uid,
                email: action.payload.email,
            };
        },
        clearUser: (state) => {
            state.user = null;
        },
    },
});

// Exporta las acciones
export const { setUser, clearUser } = authSlice.actions;

// Exporta el reducer
export default authSlice.reducer;
