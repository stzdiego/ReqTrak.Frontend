// src/Helpers/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { updateProfile as firebaseUpdateProfile, updatePassword as firebaseUpdatePassword, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { callApiRegister } from './AuthenticationApiHelper';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [apiUserId, setApiUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user ? { email: user.email, displayName: user.displayName } : null);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const loginWithEmail = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        const apiUserId = await callApiRegister(userCredential.user.displayName, email, password);
        setApiUserId(apiUserId);
    };

    const registerWithEmail = async (email, password, displayName) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await firebaseUpdateProfile(user, { displayName });
        setUser({ ...user, displayName });
        const apiUserId = await callApiRegister(displayName, email, password);
        setApiUserId(apiUserId);
    };

    const loginWithGoogle = async (email, displayName) => {
        const apiUserId = await callApiRegister(displayName, email, email);
        setApiUserId(apiUserId);
    };

    const updateProfile = (profile) => {
        if (user) {
            return firebaseUpdateProfile(auth.currentUser, profile).then(() => {
                setUser({ ...auth.currentUser, ...profile });
            });
        }
    };

    const updatePassword = (newPassword) => {
        if (auth.currentUser) {
            return firebaseUpdatePassword(auth.currentUser, newPassword);
        }
    };

    const reauthenticate = (email, password) => {
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(email, password);
        return reauthenticateWithCredential(user, credential);
    };

    const logout = () => {
        return signOut(auth).then(() => {
            setUser(null);
            setApiUserId(null);
        });
    };

    return (
        <AuthContext.Provider value={{ user, apiUserId, loading, loginWithEmail, registerWithEmail, loginWithGoogle, updateProfile, updatePassword, reauthenticate, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};