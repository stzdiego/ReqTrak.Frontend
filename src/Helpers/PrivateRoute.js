import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import LoadingComponent from '../Components/LoadingComponent';

const PrivateRoute = ({ element }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <LoadingComponent />;
    }

    if (user) {
        return element;
    } else {
        return <Navigate to="/login" replace />;
    }
};

export default PrivateRoute;