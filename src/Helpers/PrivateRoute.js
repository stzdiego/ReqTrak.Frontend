import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Helpers/AuthContext';

const PrivateRoute = ({ element }) => {
    const { user } = useAuth();

    if (user) {
        return element; // Si el usuario está autenticado, retornamos el elemento (ruta protegida)
    } else {
        return <Navigate to="/login" replace />; // Usar 'replace' para no dejar rastro en el historial
    }
};

export default PrivateRoute;