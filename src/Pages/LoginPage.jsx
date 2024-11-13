// src/Pages/LoginPage.jsx
import React, { useState } from 'react';
import styles from './LoginPage.module.css';
import logo from '../Images/BrandReqTrak.png';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useAuth } from '../Helpers/AuthContext';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginWithEmail, loginWithGoogle, login } = useAuth();
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            await loginWithEmail(email, password);
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error("Login failed. Please check your credentials.");
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const userCredential = await signInWithPopup(auth, provider);
            const { email, displayName } = userCredential.user;
            await loginWithGoogle(email, displayName);
            navigate('/');
            if (window.opener) {
                window.opener.postMessage('close', '*');
            } else {
                window.close();
            }
        } catch (error) {
            console.error(error);
            toast.error("Google login failed. Please try again.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <img src={logo} className="card-img-top" alt="Brand Logo" />

                <form onSubmit={handleEmailLogin}>
                    <div className="input-group mb-3">
                        <span className="input-group-text"><i className="fas fa-envelope" /></span>
                        <div className="form-floating">
                            <input type="email"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   className="form-control"
                                   id="floatingInputGroupEmail"
                                   placeholder="Email" />
                            <label htmlFor="floatingInputGroupEmail">Email</label>
                        </div>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text"><i className="fas fa-lock" /></span>
                        <div className="form-floating">
                            <input type="password"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   className="form-control"
                                   id="floatingInputGroupPassword"
                                   placeholder="Password" />
                            <label htmlFor="floatingInputGroupPassword">Password</label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-outline-primary w-100">Login</button>
                    <hr />
                    <button type="button" onClick={handleGoogleLogin} className="btn btn-outline-danger w-100">Login with Google</button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default LoginPage;