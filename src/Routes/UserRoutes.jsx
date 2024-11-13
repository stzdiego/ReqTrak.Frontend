import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../Helpers/PrivateRoute';
import RequerimentsPage from '../Pages/RequerimentsPage';
import TrackingPage from '../Pages/TrackingPage';
import ProfilePage from '../Pages/ProfilePage';

const UserRoutes = () => (
    <Routes>
        <Route path="/requeriments" element={<PrivateRoute element={<RequerimentsPage />} />} />
        <Route path="/tracking" element={<PrivateRoute element={<TrackingPage />} />} />
        <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} />
    </Routes>
);

export default UserRoutes;