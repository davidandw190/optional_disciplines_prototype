import { API_URLS } from "../../config/api-config";
import { EnrollmentPeriod } from "../../types/disciplines/disciplines.types";
import { createApi } from "@reduxjs/toolkit/query/react";
import getFetchBaseQuery from "../fetch-base-query";

export const electiveDisciplinesApi = createApi({
  reducerPath: 'electiveDisciplinesApi',
  baseQuery: getFetchBaseQuery(),
  tagTypes: ['ElectiveDisciplines', 'EnrollmentPeriod'],
  endpoints: (builder) => ({
    getElectivePeriod: builder.query<EnrollmentPeriod, string>({
      query: (periodId) => ({
        url: `${API_URLS.ENROLLMENT_PERIODS}/${periodId}${API_URLS.ELECTIVE_DISCIPLINES}`,
        method: 'GET',
      }),
      providesTags: (result, error, periodId) => [
        { type: 'EnrollmentPeriod', id: periodId }
      ],
    }),
  }),
});

export const {
  useGetElectivePeriodQuery,
} = electiveDisciplinesApi;