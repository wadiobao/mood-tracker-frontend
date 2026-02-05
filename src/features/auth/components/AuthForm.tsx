import React, { useState } from 'react';
import axios from 'axios';
import { LogIn, UserPlus, Languages } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { useLanguage } from '../../../hooks/useLanguage';
import { API_URL } from '../../../config/constants';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet-async';

export const AuthForm: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const { t, language, setLanguage } = useLanguage();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (isLogin) {
                const response = await axios.post(`${API_URL}/auth/login`, { username, password });
                login(response.data.token, username);
                ReactGA.event({
                    category: "User",
                    action: "Login",
                    label: username
                });
            } else {
                await axios.post(`${API_URL}/auth/register`, { username, password });
                ReactGA.event({
                    category: "User",
                    action: "Register",
                    label: username
                });
                setIsLogin(true);
                setError(t.registeredSuccess);
            }
        } catch (err: any) {
            setError(err.response?.data?.error || t.authFailed);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <Helmet>
                <title>{isLogin ? 'Login' : 'Register'} | MoodTracker</title>
            </Helmet>
            <div className="language-selector-floating">
                <button onClick={() => setLanguage(language === 'en' ? 'vi' : 'en')} className="lang-btn">
                    <Languages size={20} />
                    <span>{language === 'en' ? 'Tiếng Việt' : 'English'}</span>
                </button>
            </div>
            <div className="card auth-card">
                <h2>{isLogin ? t.welcomeBack : t.createAccount}</h2>
                <p className="subtitle">{isLogin ? t.loginDetails : t.signupDetails}</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder={t.username}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder={t.password}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className={`auth-msg ${error.includes('successfully') || error.includes('thành công') ? 'success' : 'error'}`}>{error}</p>}

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? t.processing : (isLogin ? t.login : t.register)}
                        {isLogin ? <LogIn size={18} /> : <UserPlus size={18} />}
                    </button>
                </form>

                <p className="auth-toggle">
                    {isLogin ? t.noAccount : t.hasAccount}
                    <button onClick={() => { setIsLogin(!isLogin); setError(''); }}>
                        {isLogin ? t.registerNow : t.loginHere}
                    </button>
                </p>
            </div>
        </div>
    );
};
