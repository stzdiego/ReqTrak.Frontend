import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './Store/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import TodoApp from './Components/TodoApp';
import NavComponent from './Components/NavComponent';
import { AuthProvider, useAuth } from './Helpers/AuthContext';
import PrivateRoute from './Helpers/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './custom.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import HomePage from './Pages/HomePage';
import LoginPage from "./Pages/LoginPage";
import AboutPage from "./Pages/AboutPage";
import RequerimentsPage from "./Pages/RequerimentsPage";
import ChatComponent from "./Components/ChatComponent";

const App = () => {
    const { user } = useAuth();

    return (
        <Router>
            <NavComponent />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/requeriments" element={<PrivateRoute element={<RequerimentsPage />} />} />
                <Route path="/todos" element={<PrivateRoute element={<TodoApp />} />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
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