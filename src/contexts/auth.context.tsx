import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import KeycloakService from '../services/keycloak.service';
import { completedEnrollmentsUtils } from '../utils/enrollmentUtils';
import { redirect } from 'react-router-dom';
import { showToast } from '../utils/toastUtils';

interface AuthContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  keycloak: any;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  isLoading: true,
  keycloak: null,
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [keycloak, setKeycloak] = useState<any>(null);

  // we init Keycloak once on component mount
  useEffect(() => {
    const initKeycloak = async () => {
      try {
        console.log('Initializing Keycloak...');
        const authenticated = await KeycloakService.init();

        console.log('Keycloak initialized, authenticated:', authenticated);
        setIsAuthenticated(authenticated);
        setKeycloak(KeycloakService.getInstance());

        if (authenticated) {
          showToast.success('Login successful');

          KeycloakService.getInstance().onTokenExpired = () => {
            console.log('Token expired, refreshing...');
            KeycloakService.updateToken();
            console.log('Token refreshed successfully');
          };
        }
      } catch (error) {
        console.error('Failed to initialize Keycloak:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initKeycloak();

    return () => {
      if (KeycloakService.getInstance()) {
        KeycloakService.getInstance().onTokenExpired = undefined;
      }
    };
  }, []);

  const login = () => {
    KeycloakService.login();
  };

  const logout = () => {
    completedEnrollmentsUtils.clearCompletedEnrollments();
    redirect('/login');
    KeycloakService.logout();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        keycloak,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
