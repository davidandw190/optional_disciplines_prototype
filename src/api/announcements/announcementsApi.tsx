import { API_URLS } from '../../config/api-config';
import { Announcement } from '../../types/disciplines/disciplines.types';
import { createApi } from '@reduxjs/toolkit/query/react';
import getFetchBaseQuery from '../fetch-base-query';

interface PageResponse<T> {
  content: T[];              
  totalElements: number;     
  number: number;            
  size: number;              
}

export const announcementsApi = createApi({
  reducerPath: 'announcementsApi',
  baseQuery: getFetchBaseQuery(),
  tagTypes: ['Announcements'],
  endpoints: (builder) => ({
    getAnnouncements: builder.query<PageResponse<Announcement>, { page: number, pageSize: number }>({
      query: ({ page, pageSize }) => ({
        url: API_URLS.ANNOUNCEMENTS,
        method: 'GET',
        params: {
          page: page - 1, 
          size: pageSize,
          sort: 'date,desc'
        },
      }),
    }),
  }),
});

export const {
  useGetAnnouncementsQuery,
} = announcementsApi;