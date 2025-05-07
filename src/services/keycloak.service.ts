import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8180',
  realm: import.meta.env.VITE_KEYCLOAK_REALM || 'fmi-enroll',
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'fmi-enroll-client',
};

const keycloak = new Keycloak(keycloakConfig);

const KeycloakService = {
  init: () => {
    return keycloak.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
      checkLoginIframe: false,
      enableLogging: true,
    });
  },

  getInstance: () => {
    return keycloak;
  },

  isAuthenticated: () => {
    return !!keycloak.authenticated;
  },

  getToken: () => {
    return keycloak.token;
  },

  login: () => {
    keycloak.login({
      redirectUri: `${window.location.origin}/dashboard`,
    });
  },

  logout: () => {
    keycloak.logout({
      redirectUri: window.location.origin,
    });
  },

  getProfile: () => {
    return keycloak.loadUserProfile();
  },

  getUsername: () => {
    return keycloak.tokenParsed?.preferred_username;
  },

  updateToken: (minValidity = 30) => {
    return new Promise<boolean>((resolve) => {
      if (!keycloak.authenticated) {
        resolve(false);
        return;
      }

      keycloak
        .updateToken(minValidity)
        .then(() => {
          console.log('Token refreshed successfully');
          resolve(true);
        })
        .catch(() => {
          console.warn('Failed to refresh token');
          resolve(false);
        });
    });
  },
};

export default KeycloakService;
