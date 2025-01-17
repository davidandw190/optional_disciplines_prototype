import { API_CACHE_TAGS, API_URLS } from '../../config/api-config';

import { Announcement } from '../../types/disciplines/disciplines.types';
import { PageResponse } from '../../types/api/api.types';
import { createApi } from '@reduxjs/toolkit/query/react';
import getFetchBaseQuery from '../fetch-base-query';

export const announcementsApi = createApi({
  reducerPath: 'announcementsApi',
  baseQuery: getFetchBaseQuery(),
  tagTypes: [API_CACHE_TAGS.ANNOUNCEMENTS],
  endpoints: (builder) => ({
    getAnnouncements: builder.query<
      PageResponse<Announcement>,
      { page: number; pageSize: number }
    >({
      query: ({ page, pageSize }) => ({
        url: API_URLS.ANNOUNCEMENTS,
        method: 'GET',
        params: {
          page: page - 1,
          size: pageSize,
          sort: 'date,desc',
        },
      }),
      providesTags: () => [{ type: 'Announcements' }],
    }),
  }),
});

export const { useGetAnnouncementsQuery } = announcementsApi;
