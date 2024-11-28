// import {
//   Discipline,
//   DisciplineDTO,
//   DisciplineFilters,
//   DisciplinePacket,
//   Specialization,
// } from '../../types/disciplines/disciplines.types';

import { API_URLS } from '../../config/api-config';
import { createApi } from '@reduxjs/toolkit/query/react';
import getFetchBaseQuery from '../fetch-base-query';

export const electiveDisciplinesApi = createApi({
  reducerPath: 'disciplinesApi',
  tagTypes: [
    'DISCIPLINES',
    'ELECTIVE_DISCIPLINES',
    'PACKETS',
    'ENROLLMENTS',
  ],
  baseQuery: getFetchBaseQuery(API_URLS.ELECTIVE_DISCIPLINES),
  endpoints: (builder) => ({
//     getDisciplines: builder.query<Discipline[], DisciplineFilters>({
//       query: (filters: DisciplineFilters) => ({
//         url: '/',
//         params: {
//           specialization: filters.specialization,
//           year: filters.year,
//           semester: filters.semester,
//           category: filters.category,
//           type: filters.type,
//         },
//       }),
//       // providesTags: [API_CACHE_TAGS.DISCIPLINES],
//     }),

//     getOptionalDisciplines: builder.query<Discipline[], DisciplineFilters>({
//       query: (filters: DisciplineFilters) => ({
//         url: 'elective-disciplines',
//         params: {
//           specialization: filters.specialization,
//           year: filters.year,
//           semester: filters.semester,
//           category: filters.category,
//         },
//       }),
//       // providesTags: [API_CACHE_TAGS.OPTIONAL_DISCIPLINES],
//     }),

//     getDisciplinePackets: builder.query<
//       DisciplinePacket[],
//       {
//         specialization: Specialization;
//         year: 1 | 2 | 3;
//         semester: 1 | 2;
//       }
//     >({
//       query: (params: any) => ({
//         url: '/packets',
//         params,
//       }),
//       // providesTags: [API_CACHE_TAGS.PACKETS],
//     }),

//     getDisciplineById: builder.query<Discipline, string>({
//       query: (id: string) => `/${id}`,
//       // providesTags: (result, error, id) => [
//       //   { type: API_CACHE_TAGS.DISCIPLINES, id },
//       // ],
//     }),

//     getPacketById: builder.query<DisciplinePacket, string>({
//       query: (id: string) => `/packets/${id}`,
//       // providesTags: (result, error, id) => [
//       //   { type: API_CACHE_TAGS.PACKETS, id },
//       // ],
//     }),

//     getDisciplineAvailability: builder.query<
//       {
//         availablePlaces: number;
//         waitlistLength: number;
//         totalEnrolled: number;
//       },
//       string
//     >({
//       query: (id: string) => `/availability/${id}`,
//       // providesTags: (result, error, id) => [
//       //   { type: API_CACHE_TAGS.ENROLLMENTS, id },
//       // ],
    // }),
  }),
});

export const {
  // useGetDisciplinesQuery,
  // useGetOptionalDisciplinesQuery,
  // useGetDisciplinePacketsQuery,
  // useGetDisciplineByIdQuery,
  // useGetPacketByIdQuery,
  // useGetDisciplineAvailabilityQuery,
} = electiveDisciplinesApi;
