import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('raize_java_token') || null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMe = async () => {
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const res = await fetch('/api/auth/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                    localStorage.setItem('raize_java_username', data.user.username);
                } else {
                    // Token expired or invalid
                    logout();
                }
            } catch (err) {
                console.error("Lỗi xác thực token:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMe();
    }, [token]);

    const login = (newToken, newUser) => {
        setToken(newToken);
        setUser(newUser);
        localStorage.setItem('raize_java_token', newToken);
        localStorage.setItem('raize_java_username', newUser.username);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('raize_java_token');
        localStorage.removeItem('raize_java_username');
        
        // Dọn dẹp cục bộ
        localStorage.removeItem('raize_java_codes');
        localStorage.removeItem('raize_java_completed');
        localStorage.removeItem('raize_java_completed_exercises');
        localStorage.removeItem('raize_java_last_lesson');
        localStorage.removeItem('raize_java_last_exercise');
    };

    const register = async (username, password) => {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error || "Lỗi đăng ký tài khoản");
        }
        return data;
    };

    const triggerLogin = async (username, password) => {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error || "Tài khoản hoặc mật khẩu không chính xác");
        }
        login(data.token, data.user);
        return data;
    };

    return (
        <AuthContext.Provider value={{ token, user, loading, isLoggedIn: !!token, login, logout, register, triggerLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
