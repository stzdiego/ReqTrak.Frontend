import React, { useState } from 'react';
import styles from './RegisterPage.module.css';
import logo from '../Images/BrandReqTrak.png';
import { useAuth } from '../Helpers/AuthContext';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const { registerWithEmail } = useAuth();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }
        try {
            await registerWithEmail(email, password, name);
            navigate('/');
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                toast.error("The email address is already in use by another account.");
            } else if (error.code === 'auth/weak-password') {
                toast.error("Password should be at least 6 characters.");
            } else {
                toast.error("Registration failed. Please try again.");
                console.error(error);
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <img src={logo} className="card-img-top" alt="Brand Logo" />
                <h2 className={styles.title}>Register</h2>

                <form onSubmit={handleRegister}>
                    <div className="input-group mb-3">
                        <span className="input-group-text"><i className="fas fa-user" /></span>
                        <div className="form-floating">
                            <input type="text"
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}
                                   className="form-control"
                                   id="floatingInputGroup1"
                                   placeholder="Name" />
                            <label htmlFor="floatingInputGroup1">Name</label>
                        </div>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text"><i className="fas fa-envelope" /></span>
                        <div className="form-floating">
                            <input type="email"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   className="form-control"
                                   id="floatingInputGroup2"
                                   placeholder="Email" />
                            <label htmlFor="floatingInputGroup2">Email</label>
                        </div>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text"><i className="fas fa-lock" /></span>
                        <div className="form-floating">
                            <input type="password"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   className="form-control"
                                   id="floatingInputGroup3"
                                   placeholder="Password" />
                            <label htmlFor="floatingInputGroup3">Password</label>
                        </div>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text"><i className="fas fa-lock" /></span>
                        <div className="form-floating">
                            <input type="password"
                                   value={confirmPassword}
                                   onChange={(e) => setConfirmPassword(e.target.value)}
                                   className="form-control"
                                   id="floatingInputGroup4"
                                   placeholder="Confirm Password" />
                            <label htmlFor="floatingInputGroup4">Confirm Password</label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-outline-primary w-100">Register</button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default RegisterPage;