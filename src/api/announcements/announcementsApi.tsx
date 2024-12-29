import { API_URLS } from '../../config/api-config';
import { Announcement } from '../../types/disciplines/disciplines.types';
import { createApi } from '@reduxjs/toolkit/query/react';
import getFetchBaseQuery from '../fetch-base-query';

interface GetAnnouncementsParams {
  page: number;
  pageSize: number;
}

interface AnnouncementsResponse {
  announcements: Announcement[];
  total: number;
  page: number;
  pageSize: number;
}

export const announcementsApi = createApi({
  reducerPath: 'announcementsApi',
  baseQuery: getFetchBaseQuery(),
  tagTypes: ['Announcements'],
  endpoints: (builder) => ({
    getAnnouncements: builder.query<AnnouncementsResponse, GetAnnouncementsParams>({
      query: (params) => ({
        url: API_URLS.ANNOUNCEMENTS,
        method: 'GET',
        params,
      }),
      providesTags: ['Announcements'],
    }),
  }),
});

export const {
  useGetAnnouncementsQuery,
} = announcementsApi;