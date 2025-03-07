import {
  DisciplinePacket,
  EnrollmentPeriod,
} from '../../types/disciplines/disciplines.types';

import { EnrollmentPeriodType } from '../../types/disciplines/disciplines.enums';

export const mockElectiveDisciplinePackets: DisciplinePacket[] = [
  {
    id: 'packet-1',
    name: 'Elective Packet 1',
    description: 'Advanced development techniques and frameworks',
    yearOfStudy: 3,
    semester: 2,
    targetYearOfStudy: 3,
    targetSemester: 1,
    maxChoices: 2,
    disciplines: ['1', '2', '3', '5', '6'],
    totalCredits: 2,
    category: 'Technical',
    prerequisites: {
      requiredSkills: ['Basic programming', 'JavaScript fundamentals'],
      recommendations: ['Previous web development experience'],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'packet-2',
    name: 'Elective Packet 2',
    description: 'Cloud and DevOps technologies',
    yearOfStudy: 3,
    semester: 2,
    targetYearOfStudy: 3,
    targetSemester: 1,
    maxChoices: 1,
    disciplines: ['4', '7'],
    totalCredits: 2,
    category: 'Technical',
    prerequisites: {
      requiredSkills: ['Networking basics', 'Operating Systems'],
      recommendations: ['Cloud computing knowledge'],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockComplementaryDisciplinePackets: DisciplinePacket[] = [
  {
    id: 'comp-packet-1',
    name: 'Humanities and Social Sciences',
    description:
      'Broaden your perspective with courses from humanities and social sciences',
    semester: 2,
    yearOfStudy: 3,
    targetYearOfStudy: 3,
    targetSemester: 1,
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
    semester: 2,
    yearOfStudy: 3,
    maxChoices: 1,
    targetYearOfStudy: 3,
    targetSemester: 1,
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
    targetYearOfStudy: 3,
    targetSemester: 1,
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

export const mockEnrollmentPeriods: EnrollmentPeriod[] = [
  {
    id: 'ep-1',
    type: EnrollmentPeriodType.ELECTIVE_DISCIPLINES,
    startDate: new Date('2025-01-01T00:00:00Z'),
    endDate: new Date('2025-02-01T23:59:59Z'),
    semester: 1,
    yearOfStudy: 3,
    targetYearOfStudy: 3,
    targetSemester: 2,
    academicYear: '2024-2025',
    isActive: true,
    // status: 'active',
    progress: 45,
    packets: mockElectiveDisciplinePackets,
    targetSpecializations: ['Computer Science', 'Informatica'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'ep-2',
    type: EnrollmentPeriodType.COMPLEMENTARY_DISCIPLINES,
    startDate: new Date('2025-02-02T00:00:00Z'),
    endDate: new Date('2025-02-15T23:59:59Z'),
    semester: 1,
    yearOfStudy: 3,
    targetYearOfStudy: 3,
    targetSemester: 2,
    academicYear: '2024-2025',
    isActive: false,
    // status: 'upcoming',
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
    targetYearOfStudy: 3,
    targetSemester: 2,
    academicYear: '2023-2024',
    isActive: false,
    // status: 'ended',
    progress: 100,
    packets: mockThesisPackets,
    targetSpecializations: ['Computer Science', 'Software Engineering'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const getEnrollmentPeriodStatus = (period: EnrollmentPeriod): string => {
  const now = new Date();
  const startDate = new Date(period.startDate);
  const endDate = new Date(period.endDate);

  if (now < startDate) return 'upcoming';
  if (now > endDate) return 'ended';
  return 'active';
};

export const getRemainingDays = (period: EnrollmentPeriod): number => {
  const now = new Date();
  const endDate = new Date(period.endDate);
  const diffTime = endDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const isEnrollmentAccessible = (period: EnrollmentPeriod): boolean => {
  const status = getEnrollmentPeriodStatus(period);
  return status === 'active';
};
