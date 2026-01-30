import './assets/styles/App.css';
import { AuthProvider } from './features/auth/AuthContext';
import { LanguageProvider } from './features/i18n/LanguageContext';
import { HomePage } from './pages/HomePage';
import { AuthForm } from './features/auth/components/AuthForm';
import { useAuth } from './hooks/useAuth';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AuthForm />;
  }

  return <HomePage />;
};

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
