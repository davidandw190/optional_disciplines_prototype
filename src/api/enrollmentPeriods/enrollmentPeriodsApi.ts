import { API_URLS } from '../../config/api-config';
import { EnrollmentPeriod } from '../../types/disciplines/disciplines.types';
import { EnrollmentPeriodsQueryParams } from '../../types/api/api.types';
import { createApi } from '@reduxjs/toolkit/query/react';
import getFetchBaseQuery from '../fetch-base-query';

export const enrollmentPeriodsApi = createApi({
  reducerPath: 'enrollmentPeriodsApi',
  baseQuery: getFetchBaseQuery(),
  tagTypes: ['EnrollmentPeriods'],
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
      providesTags: ['EnrollmentPeriods'],
    }),

    getEnrollmentPeriodById: builder.query<EnrollmentPeriod, string>({
      query: (periodId) => ({
        url: `${API_URLS.ENROLLMENT_PERIODS}/${periodId}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, periodId) => [
        { type: 'EnrollmentPeriods', id: periodId },
      ],
    }),
  }),
});

export const {
  useGetEligibleEnrollmentPeriodsQuery,
  useGetEnrollmentPeriodByIdQuery,
} = enrollmentPeriodsApi;
