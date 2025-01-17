import { Discipline, DisciplinePacket, EnrollmentPeriod } from "../../types/disciplines/disciplines.types";

import { API_URLS } from "../../config/api-config";
import { createApi } from "@reduxjs/toolkit/query/react";
import getFetchBaseQuery from "../fetch-base-query";

interface PacketWithDisciplines {
  packet: DisciplinePacket;
  disciplines: Discipline[];
}

interface PacketsResponse {
  packets: PacketWithDisciplines[];
}

export const electiveDisciplinesApi = createApi({
  reducerPath: 'electiveDisciplinesApi',
  baseQuery: getFetchBaseQuery(),
  tagTypes: ['ElectiveDisciplines', 'EnrollmentPeriod'],
  endpoints: (builder) => ({
    getElectivePeriod: builder.query<EnrollmentPeriod, string>({
      query: (periodId) => ({
        url: `${API_URLS.ENROLLMENT_PERIODS}/${periodId}/elective-disciplines`,
        method: 'GET',
      }),
      providesTags: (result, error, periodId) => [
        { type: 'EnrollmentPeriod', id: periodId }
      ],
    }),

    getElectivePackets: builder.query<PacketsResponse, string>({
      query: (periodId) => ({
        url: `${API_URLS.ENROLLMENT_PERIODS}/${periodId}/packets`,
        method: 'GET',
      }),
      providesTags: (result, error, periodId) => [
        { type: 'ElectiveDisciplines', id: periodId }
      ],
    }),
  }),
});

export const {
  useGetElectivePeriodQuery,
  useGetElectivePacketsQuery,
} = electiveDisciplinesApi;