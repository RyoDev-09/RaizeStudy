import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, User, Lock, ShieldCheck, ArrowRight, UserPlus } from 'lucide-react';

const AuthModal = ({ isOpen, onClose }) => {
    const { triggerLogin, register } = useAuth();
    const [activeTab, setActiveTab] = useState('login'); // 'login' hoặc 'register'
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    if (!isOpen) return null;

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        try {
            await triggerLogin(username, password);
            onClose();
        } catch (err) {
            setErrorMsg(err.message || "Tài khoản hoặc mật khẩu không chính xác!");
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setSuccessMsg('');
        
        if (password !== confirmPassword) {
            setErrorMsg("Mật khẩu xác nhận không khớp!");
            return;
        }
        
        try {
            await register(username, password);
            setSuccessMsg("Đăng ký tài khoản thành công! Hãy chuyển sang Đăng nhập.");
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            setTimeout(() => {
                setActiveTab('login');
                setSuccessMsg('');
            }, 2000);
        } catch (err) {
            setErrorMsg(err.message || "Đăng ký không thành công!");
        }
    };

    return (
        <div className="auth-modal-overlay" style={{ display: 'flex' }}>
            <div className="auth-modal-card">
                <div className="auth-modal-header">
                    <div className="auth-tabs">
                        <button 
                            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
                            onClick={() => { setActiveTab('login'); setErrorMsg(''); }}
                        >
                            Đăng Nhập
                        </button>
                        <button 
                            className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
                            onClick={() => { setActiveTab('register'); setErrorMsg(''); }}
                        >
                            Đăng Ký
                        </button>
                    </div>
                    <button className="auth-modal-close" onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                {activeTab === 'login' ? (
                    <form className="auth-form active" onSubmit={handleLoginSubmit}>
                        <div className="form-group">
                            <label htmlFor="login-username">Tài khoản</label>
                            <div className="input-with-icon">
                                <User size={16} />
                                <input 
                                    type="text" 
                                    id="login-username" 
                                    placeholder="Nhập tài khoản học tập" 
                                    required 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    autoComplete="username" 
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-password">Mật khẩu</label>
                            <div className="input-with-icon">
                                <Lock size={16} />
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    id="login-password" 
                                    placeholder="Nhập mật khẩu" 
                                    required 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password" 
                                />
                            </div>
                        </div>
                        {errorMsg && <div className="auth-error-msg">{errorMsg}</div>}
                        <button type="submit" className="btn-auth-submit">
                            <span>Vào Học Ngay</span>
                            <ArrowRight size={16} />
                        </button>
                    </form>
                ) : (
                    <form className="auth-form active" onSubmit={handleRegisterSubmit}>
                        <div className="form-group">
                            <label htmlFor="register-username">Tên tài khoản</label>
                            <div className="input-with-icon">
                                <User size={16} />
                                <input 
                                    type="text" 
                                    id="register-username" 
                                    placeholder="Tên đăng nhập (viết liền không dấu)" 
                                    required 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    autoComplete="username" 
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="register-password">Mật khẩu</label>
                            <div className="input-with-icon">
                                <Lock size={16} />
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    id="register-password" 
                                    placeholder="Tạo mật khẩu an toàn" 
                                    required 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="new-password" 
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="register-confirm-password">Xác nhận mật khẩu</label>
                            <div className="input-with-icon">
                                <ShieldCheck size={16} />
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    id="register-confirm-password" 
                                    placeholder="Nhập lại mật khẩu" 
                                    required 
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    autoComplete="new-password" 
                                />
                            </div>
                        </div>
                        {errorMsg && <div className="auth-error-msg">{errorMsg}</div>}
                        {successMsg && <div className="auth-success-msg">{successMsg}</div>}
                        <button type="submit" className="btn-auth-submit">
                            <span>Đăng Ký Tài Khoản</span>
                            <UserPlus size={16} />
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AuthModal;
