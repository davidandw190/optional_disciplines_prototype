import {
  EnrollmentPeriodType,
  EnrollmentStatus,
  TeachingActivityType,
} from '../../types/disciplines/disciplines.enums';

import { EnrollmentSummary } from '../../types/enrollments/enrollment-summary.types';
import { mockDisciplines } from './elective-disciplines.mock';
import { mockElectiveDisciplinePackets } from './enrollment-periods.mock';

export const mockEnrollmentSummaries: EnrollmentSummary[] = [
  {
    id: 'enrl-1',
    enrollmentPeriod: {
      id: 'ep-1',
      type: EnrollmentPeriodType.ELECTIVE_DISCIPLINES,
      startDate: new Date('2024-10-01'),
      endDate: new Date('2024-10-15'),
      semester: 1,
      yearOfStudy: 3,
      targetYearOfStudy: 3,
      targetSemester: 2,
      targetSpecializations: ['Computer Science', 'Informatica'],
      academicYear: '2024-2025',
      isActive: false,
      packets: mockElectiveDisciplinePackets,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    status: EnrollmentStatus.CONFIRMED,
    packets: [
      {
        packet: mockElectiveDisciplinePackets[0],
        selections: [
          {
            disciplineId: '1',
            name: mockDisciplines[0].name,
            code: mockDisciplines[0].code,
            priority: 1,
            status: EnrollmentStatus.CONFIRMED,
            teacher: mockDisciplines[0].teachingActivities.find(
              (activity) => activity.type === TeachingActivityType.COURSE
            )?.teacher,
          },
          {
            disciplineId: '2',
            name: mockDisciplines[1].name,
            code: mockDisciplines[1].code,
            priority: 2,
            status: EnrollmentStatus.CONFIRMED,
            teacher: mockDisciplines[1].teachingActivities.find(
              (activity) => activity.type === TeachingActivityType.COURSE
            )?.teacher,
          },
        ],
        status: EnrollmentStatus.CONFIRMED,
      },
      {
        packet: mockElectiveDisciplinePackets[1],
        selections: [
          {
            disciplineId: '4',
            name: mockDisciplines[3].name,
            code: mockDisciplines[3].code,
            priority: 1,
            status: EnrollmentStatus.CONFIRMED,
            teacher: mockDisciplines[3].teachingActivities.find(
              (activity) => activity.type === TeachingActivityType.COURSE
            )?.teacher,
          },
        ],
        status: EnrollmentStatus.CONFIRMED,
      },
    ],
    enrollmentDate: new Date('2024-10-02'),
    lastUpdated: new Date('2024-10-03'),
  },
  {
    id: 'enrl-2',
    enrollmentPeriod: {
      id: 'ep-2',
      type: EnrollmentPeriodType.ELECTIVE_DISCIPLINES,
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-02-01'),
      semester: 2,
      yearOfStudy: 3,
      targetYearOfStudy: 3,
      targetSemester: 2,
      targetSpecializations: ['Computer Science', 'Informatica'],
      academicYear: '2024-2025',
      isActive: true,
      packets: mockElectiveDisciplinePackets,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    status: EnrollmentStatus.PENDING,
    packets: [
      {
        packet: mockElectiveDisciplinePackets[0],
        selections: [
          {
            disciplineId: '5',
            name: mockDisciplines[4].name,
            code: mockDisciplines[4].code,
            priority: 1,
            status: EnrollmentStatus.PENDING,
            teacher: mockDisciplines[4].teachingActivities.find(
              (activity) => activity.type === TeachingActivityType.COURSE
            )?.teacher,
          },
          {
            disciplineId: '6',
            name: mockDisciplines[5].name,
            code: mockDisciplines[5].code,
            priority: 2,
            status: EnrollmentStatus.PENDING,
            teacher: mockDisciplines[5].teachingActivities.find(
              (activity) => activity.type === TeachingActivityType.COURSE
            )?.teacher,
          },
        ],
        status: EnrollmentStatus.PENDING,
      },
    ],
    enrollmentDate: new Date('2025-01-05'),
    lastUpdated: new Date('2025-01-05'),
  },
];

export const getEnrollmentsByType = (
  type: EnrollmentPeriodType
): EnrollmentSummary[] => {
  return mockEnrollmentSummaries.filter(
    (enrollment) => enrollment.enrollmentPeriod.type === type
  );
};
