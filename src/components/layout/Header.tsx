import React from 'react';
import { LogOut, User, Languages } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../hooks/useLanguage';

export const Header: React.FC = () => {
    const { logout, username } = useAuth();
    const { t, language, setLanguage } = useLanguage();

    return (
        <header>
            <div className="header-actions">
                <button onClick={() => setLanguage(language === 'en' ? 'vi' : 'en')} className="lang-btn-simple">
                    <Languages size={18} />
                    <span>{language === 'en' ? 'VN' : 'EN'}</span>
                </button>
                <div className="user-profile">
                    <div className="user-info">
                        <User size={18} />
                        <span>{username}</span>
                    </div>
                    <button onClick={logout} className="logout-btn" title={t.logout}>
                        <LogOut size={18} />
                    </button>
                </div>
            </div>
            <h1>{t.title}</h1>
            <p className="subtitle">{t.subtitle}</p>
        </header>
    );
};
