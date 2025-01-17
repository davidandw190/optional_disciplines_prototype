import { API_CACHE_TAGS, API_URLS } from '../../config/api-config';

import { EnrollmentPeriod } from '../../types/disciplines/disciplines.types';
import { EnrollmentPeriodsQueryParams } from '../../types/api/api.types';
import { createApi } from '@reduxjs/toolkit/query/react';
import getFetchBaseQuery from '../fetch-base-query';

export const enrollmentPeriodsApi = createApi({
  reducerPath: 'enrollmentPeriodsApi',
  baseQuery: getFetchBaseQuery(),
  tagTypes: [API_CACHE_TAGS.ENROLLMENT_PERIODS],
  endpoints: (builder) => ({
    getEligibleEnrollmentPeriods: builder.query<
      EnrollmentPeriod[],
      EnrollmentPeriodsQueryParams
    >({
      query: (params: EnrollmentPeriodsQueryParams) => ({
        url: API_URLS.ENROLLMENT_PERIODS,
        method: 'GET',
        params: {
          targetYearOfStudy: params.yearOfStudy,
          targetSemester: params.semester,
          targetSpecialization: params.specialization,
        },
      }),
      providesTags: (result) => {
        if (!result) {
          return [{ type: API_CACHE_TAGS.ENROLLMENT_PERIODS, id: 'LIST' }];
        }

        return [
          { type: API_CACHE_TAGS.ENROLLMENT_PERIODS, id: 'LIST' },
          ...result.map((period) => ({
            type: API_CACHE_TAGS.ENROLLMENT_PERIODS,
            id: period.id,
          })),
        ];
      },
    }),

    getEnrollmentPeriodById: builder.query<EnrollmentPeriod, string>({
      query: (periodId) => ({
        url: `${API_URLS.ENROLLMENT_PERIODS}/${periodId}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, periodId) => [
        { type: API_CACHE_TAGS.ENROLLMENT_PERIODS, id: periodId },
      ],
    }),
  }),
});

export const {
  useGetEligibleEnrollmentPeriodsQuery,
  useGetEnrollmentPeriodByIdQuery,
} = enrollmentPeriodsApi;
