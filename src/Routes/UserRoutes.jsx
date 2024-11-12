import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../Helpers/PrivateRoute';
import RequerimentsPage from '../Pages/RequerimentsPage';
import TrackingPage from '../Pages/TrackingPage';

const UserRoutes = () => (
    <Routes>
        <Route path="/requeriments" element={<PrivateRoute element={<RequerimentsPage />} />} />
        <Route path="/tracking" element={<PrivateRoute element={<TrackingPage />} />} />
    </Routes>
);

export default UserRoutes;