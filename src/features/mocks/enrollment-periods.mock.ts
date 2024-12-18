// src/features/mocks/enrollment-periods.mock.ts

import {
  DisciplinePacket,
  EnrollmentPeriod,
} from '../../types/disciplines/disciplines.types';

import { EnrollmentPeriodType } from '../../types/disciplines/disciplines.enums';

// Mock packets with complete information
export const mockElectiveDisciplinePackets: DisciplinePacket[] = [
  {
    id: 'packet-1',
    name: 'Web Technologies',
    description: 'Modern web development frameworks and practices',
    semester: 1,
    yearOfStudy: 3,
    maxChoices: 2, // Primary + backup selection
    disciplines: ['1', '2'],
    totalCredits: 6,
    category: 'Technical',
    createdAt: new Date(),
    updatedAt: new Date(),
    prerequisites: {
      requiredSkills: ['Basic programming', 'JavaScript fundamentals'],
      recommendations: ['Previous web development experience'],
    },
  },
  {
    id: 'packet-2',
    name: 'Distributed Systems',
    description: 'Advanced distributed computing concepts',
    semester: 1,
    yearOfStudy: 3,
    maxChoices: 1,
    disciplines: ['2', '5'],
    totalCredits: 6,
    category: 'Technical',
    createdAt: new Date(),
    updatedAt: new Date(),
    prerequisites: {
      requiredSkills: ['Networking basics', 'Operating Systems'],
      recommendations: ['Cloud computing knowledge'],
    },
  },
];

const mockComplementaryDisciplinePackets: DisciplinePacket[] = [
  {
    id: 'comp-packet-1',
    name: 'Humanities and Social Sciences',
    description:
      'Broaden your perspective with courses from humanities and social sciences',
    semester: 1,
    yearOfStudy: 3,
    maxChoices: 2,
    disciplines: ['comp1', 'comp2', 'comp3'],
    totalCredits: 4,
    category: 'Complementary',
    prerequisites: {
      requiredSkills: ['None required'],
      recommendations: ['Interest in interdisciplinary studies'],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'comp-packet-2',
    name: 'Business and Entrepreneurship',
    description: 'Develop business acumen and entrepreneurial skills',
    semester: 1,
    yearOfStudy: 3,
    maxChoices: 1,
    disciplines: ['comp4', 'comp5'],
    totalCredits: 3,
    category: 'Complementary',
    prerequisites: {
      requiredSkills: ['Basic economics understanding'],
      recommendations: ['Interest in business development'],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockThesisPackets: DisciplinePacket[] = [
  {
    id: 'thesis-packet-1',
    name: 'Software Engineering Research Topics',
    description: 'Research projects in software engineering and development',
    semester: 2,
    yearOfStudy: 3,
    maxChoices: 1,
    disciplines: ['thesis1', 'thesis2', 'thesis3'],
    totalCredits: 10,
    category: 'Thesis',
    prerequisites: {
      requiredSkills: ['Strong programming background', 'Research methodology'],
      recommendations: ['Previous research experience'],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Complete enrollment period information
export const mockEnrollmentPeriods: EnrollmentPeriod[] = [
  {
    id: 'ep-1',
    type: EnrollmentPeriodType.ELECTIVE_DISCIPLINES,
    startDate: new Date('2024-05-01T00:00:00Z'),
    endDate: new Date('2024-12-19T23:59:59Z'),
    semester: 1,
    yearOfStudy: 3,
    academicYear: '2024-2025',
    isActive: true,
    status: 'active',
    progress: 45,
    packets: mockElectiveDisciplinePackets,
    targetSpecializations: ['Computer Science', 'Software Engineering'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'ep-2',
    type: EnrollmentPeriodType.COMPLEMENTARY_DISCIPLINES,
    startDate: new Date('2024-06-01T00:00:00Z'),
    endDate: new Date('2024-06-15T23:59:59Z'),
    semester: 1,
    yearOfStudy: 3,
    academicYear: '2024-2025',
    isActive: false,
    status: 'upcoming',
    packets: mockComplementaryDisciplinePackets,
    targetSpecializations: ['All Specializations'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'ep-3',
    type: EnrollmentPeriodType.THESIS_REGISTRATION,
    startDate: new Date('2023-12-01T00:00:00Z'),
    endDate: new Date('2023-12-15T23:59:59Z'),
    semester: 2,
    yearOfStudy: 3,
    academicYear: '2023-2024',
    isActive: false,
    status: 'ended',
    progress: 100,
    packets: mockThesisPackets,
    targetSpecializations: ['Computer Science', 'Software Engineering'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Helper function to check enrollment period status
export const getEnrollmentPeriodStatus = (period: EnrollmentPeriod): string => {
  const now = new Date();
  const startDate = new Date(period.startDate);
  const endDate = new Date(period.endDate);

  if (now < startDate) return 'upcoming';
  if (now > endDate) return 'ended';
  return 'active';
};

// Helper to get remaining days
export const getRemainingDays = (period: EnrollmentPeriod): number => {
  const now = new Date();
  const endDate = new Date(period.endDate);
  const diffTime = endDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Helper to check if enrollment is accessible
export const isEnrollmentAccessible = (period: EnrollmentPeriod): boolean => {
  const status = getEnrollmentPeriodStatus(period);
  return status === 'active';
};
