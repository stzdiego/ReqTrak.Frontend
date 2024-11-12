import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './Store/store';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import NavComponent from './Components/NavComponent';
import { AuthProvider, useAuth } from './Helpers/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './custom.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AppRoutes from './Routes/AppRoutes';
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/AdminRoutes';
import ChatComponent from './Components/ChatComponent';

const App = () => {
    const { user } = useAuth();

    return (
        <Router>
            <NavComponent />
            <AppRoutes />
            <UserRoutes />
            <AdminRoutes />
            {user && <ChatComponent />}
        </Router>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <AuthProvider>
            <App />
        </AuthProvider>
    </Provider>
);