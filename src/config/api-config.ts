// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: 2339
const VITE_BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const RUNTIME_BASE_URL = '<!--# echo var="ENV_API_BASE_URL" -->';
const DEFAULT_BASE_URL = 'http://localhost:8080/api';

export const VITE_KEYCLOAK_URL = 'http://localhost:8180';
export const VITE_KEYCLOAK_REALM = 'fmi-enroll';
export const VITE_KEYCLOAK_CLIENT_ID = 'fmi-enroll-client';

const getBaseUrl = () => {
  try {
    return new URL(RUNTIME_BASE_URL).href;
  } catch {
    return VITE_BASE_URL || DEFAULT_BASE_URL;
  }
};

export const BASE_URL = getBaseUrl();
export const WS_BASE_URL = getBaseUrl().replace('/api', '');

export const API_URLS = {
  DASHBOARD: '/dashboard',
  AUTH: '/auth_url_uvt',
  ELECTIVE_DISCIPLINES: '/elective-disciplines',
  ENROLLMENT_PERIODS: '/enrollment-periods',
  ANNOUNCEMENTS: '/announcements',
  STUDENT_PROFILE: '/student/profile',
  DISCIPLINE_PACKETS: '/',
};

export const API_CACHE_TAGS = {
  ENROLLMENT_PERIODS: 'ENROLLMENT_PERIODS',
  ELECTIVE_PERIOD_PACKETS: 'ELECTIVE_PERIOD_PACKETS',
  ANNOUNCEMENTS: 'ANNOUNCEMENTS',
};
