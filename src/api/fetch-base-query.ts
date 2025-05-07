import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

import { BASE_URL } from '../config/api-config';
import KeycloakService from '../services/keycloak.service';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export default function getFetchBaseQuery(urlPrefix = '') {
  const baseUrl = urlPrefix
    ? `${BASE_URL}${urlPrefix}`.replace(/\/+$/, '')
    : BASE_URL;

  const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      if (KeycloakService.isAuthenticated()) {
        const token = KeycloakService.getToken();
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
      }

      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');

      return headers;
    },
  });

  const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
  > = async (args, api, extraOptions) => {
    if (KeycloakService.isAuthenticated()) {
      try {
        await KeycloakService.updateToken();
      } catch (error) {
        console.warn('Failed to refresh token before request');
      }
    }

    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
      console.log('Received 401 error, attempting to refresh token');

      try {
        const refreshed = await KeycloakService.updateToken();

        if (refreshed) {
          console.log('Token refreshed, retrying request');
          result = await baseQuery(args, api, extraOptions);
        } else {
          console.log('Token refresh failed, redirecting to login');
          KeycloakService.login();
        }
      } catch (error) {
        console.error('Error refreshing token', error);
      }
    }

    return result;
  };

  return baseQueryWithReauth;
}
