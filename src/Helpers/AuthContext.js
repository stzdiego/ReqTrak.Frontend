import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAuth, updateProfile, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user ? { email: user.email, displayName: user.displayName } : null);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const loginWithEmail = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
            });
    };

    const registerWithEmail = (email, password, displayName) => {
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                return updateProfile(user, { displayName }).then(() => {
                    setUser({ ...user, displayName });
                });
            });
    };

    const logout = () => {
        return signOut(auth).then(() => setUser(null));
    };

    return (
        <AuthContext.Provider value={{ user, loading, loginWithEmail, registerWithEmail, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};