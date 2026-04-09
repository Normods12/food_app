import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            fetchUserProfile();
        } else {
            localStorage.removeItem('token');
            setUser(null);
            setLoading(false);
        }
    }, [token]);

    const fetchUserProfile = async () => {
        try {
            const data = await authService.getProfile();
            setUser(data);
        } catch (error) {
            console.error("Failed to fetch user profile", error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        const data = await authService.login(email, password);
        setToken(data.token);
        return data;
    };

    const register = async (userData) => {
        const data = await authService.register(userData);
        setToken(data.token);
        return data;
    };

    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, register, logout, loading, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};