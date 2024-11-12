import React, { useState } from 'react';
import styles from './LoginPage.module.css';
import logo from '../Images/BrandReqTrak.png';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useAuth } from '../Helpers/AuthContext';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            login({ email: userCredential.user.email, displayName: userCredential.user.displayName }); // Update the user state in AuthContext
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error("Login failed. Please check your credentials.");
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const userCredential = await signInWithPopup(auth, provider);
            login({ email: userCredential.user.email, displayName: userCredential.user.displayName }); // Update the user state in AuthContext
            navigate('/');
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
                                   id="floatingInputGroup1"
                                   placeholder="Email" />
                            <label htmlFor="floatingInputGroup1">Email</label>
                        </div>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text"><i className="fas fa-lock" /></span>
                        <div className="form-floating">
                            <input type="password"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   className="form-control"
                                   id="floatingInputGroup1"
                                   placeholder="Password" />
                            <label htmlFor="floatingInputGroup1">Password</label>
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