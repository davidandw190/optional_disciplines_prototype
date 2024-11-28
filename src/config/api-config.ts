// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: 2339
const VITE_BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const RUNTIME_BASE_URL = '<!--# echo var="ENV_API_BASE_URL" -->';
const DEFAULT_BASE_URL = 'http://localhost:3000/api';



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
  
};