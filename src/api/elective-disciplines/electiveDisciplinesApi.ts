import { API_CACHE_TAGS, API_URLS } from '../../config/api-config';

import { EnrollmentPeriod } from '../../types/disciplines/disciplines.types';
import { PacketsResponse } from '../../types/api/api.types';
import { createApi } from '@reduxjs/toolkit/query/react';
import getFetchBaseQuery from '../fetch-base-query';

export const electiveDisciplinesApi = createApi({
  reducerPath: 'electiveDisciplinesApi',
  baseQuery: getFetchBaseQuery(),
  tagTypes: [
    API_CACHE_TAGS.ELECTIVE_PERIOD_PACKETS,
    API_CACHE_TAGS.ENROLLMENT_PERIODS,
  ],
  endpoints: (builder) => ({
    getElectivePeriod: builder.query<EnrollmentPeriod, string>({
      query: (periodId) => ({
        url: `${API_URLS.ENROLLMENT_PERIODS}/${periodId}/elective-disciplines`,
        method: 'GET',
      }),
      providesTags: (_result, _error, periodId) => [
        { type: API_CACHE_TAGS.ENROLLMENT_PERIODS, id: periodId },
      ],
    }),

    getElectivePackets: builder.query<PacketsResponse, string>({
      query: (periodId) => ({
        url: `${API_URLS.ENROLLMENT_PERIODS}/${periodId}/packets`,
        method: 'GET',
      }),
      providesTags: (result, _error, periodId) => [
        { type: API_CACHE_TAGS.ELECTIVE_PERIOD_PACKETS, id: periodId },
        ...(result?.packets || []).map(({ packet }) => ({
          type: API_CACHE_TAGS.ELECTIVE_PERIOD_PACKETS,
          id: packet.id,
        })),
      ],
    }),
  }),
});

export const { useGetElectivePeriodQuery, useGetElectivePacketsQuery } =
  electiveDisciplinesApi;
