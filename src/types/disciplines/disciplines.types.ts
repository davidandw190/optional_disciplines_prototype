import {
  AssessmentType,
  DisciplineType,
  EnrollmentPeriodType,
  EnrollmentStatus,
  LearningOutcomeCategory,
  TeachingActivityType,
  TeachingLanguage,
} from './disciplines.enums';

import { BaseEntity } from '../base.types';
import { ReactNode } from 'react';

export interface AcademicTitle {
  title: string;
  abbreviation: string;
}

export interface Teacher extends BaseEntity {
  firstName: string;
  lastName: string;
  academicTitle: AcademicTitle;
  email: string;
  department: string;
  officehours?: OfficeHours[];
}

export interface OfficeHours {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  location: string;
  online?: boolean;
  meetingLink?: string;
}

export interface TeachingActivity extends BaseEntity {
  type: TeachingActivityType;
  hoursPerWeek: number;
  totalHours: number;
  teacher: Teacher;
  teachingMethods: string[];
  conditions: TeachingConditions;
}

export interface TeachingConditions {
  location: string;
  requirements: string[];
  platforms?: TeachingPlatform[];
}

export interface TeachingPlatform {
  name: string;
  url?: string;
  details?: string;
  required: boolean;
}

export interface TimeAllocation {
  individualStudyHours: number;
  documentationHours: number;
  preparationHours: number;
  tutoringHours: number;
  examinationHours: number;
  otherActivitiesHours: number;
  totalSemesterHours: number;
}

export interface WeeklyHours {
  course: number;
  seminar?: number;
  laboratory?: number;
  project?: number;
  total: number;
}

export interface ContentModule extends BaseEntity {
  title: string;
  description?: string;
  teachingMethods: string[];
  hours: number;
  weekNumber?: number;
  references?: BibliographyEntry[];
}

export interface BibliographyEntry {
  title: string;
  authors: string;
  year?: number;
  isbn?: string;
  url?: string;
  type: 'BOOK' | 'ARTICLE' | 'ONLINE' | 'OTHER';
}

export interface Bibliography {
  required: BibliographyEntry[];
  recommended: BibliographyEntry[];
  online: BibliographyEntry[];
}

export interface Prerequisites {
  requiredDisciplines?: {
    code: string;
    name: string;
  }[];
  requiredSkills: string[];
  recommendations?: string[];
}

export interface LearningOutcome extends BaseEntity {
  category: LearningOutcomeCategory;
  description: string;
  outcomes: string[];
}

export interface EvaluationComponent extends BaseEntity {
  type: TeachingActivityType;
  evaluationCriteria: string[];
  evaluationMethods: string[];
  weightInFinalGrade: number;
  minimumGrade?: number;
  description?: string;
}

export interface EvaluationSystem {
  components: EvaluationComponent[];
  minimumRequirements: string[];
  additionalNotes?: string;
  makeupExamConditions?: string[];
}

export interface Discipline extends BaseEntity {
  description: string;
  code: string;
  name: string;
  type: DisciplineType;
  semester: 1 | 2;
  yearOfStudy: number;
  credits: number;
  assessmentType: AssessmentType;
  language: TeachingLanguage;

  teachingActivities: TeachingActivity[];
  timeAllocation: TimeAllocation;
  weeklyHours: WeeklyHours;

  courseContent: ContentModule[];
  seminarContent?: ContentModule[];
  laboratoryContent?: ContentModule[];
  bibliography: Bibliography;

  prerequisites: Prerequisites;
  learningOutcomes: LearningOutcome[];

  evaluationSystem: EvaluationSystem;

  // maybe
  packetId?: string;
  maxEnrollmentSpots?: number;
  currentEnrollmentCount?: number;
  waitlistLimit?: number;
}

export interface EnrollmentPeriod extends BaseEntity {
  type: EnrollmentPeriodType;
  
  startDate: Date;
  endDate: Date;
  semester: 1 | 2;
  yearOfStudy: number;
  academicYear: string;
  
  isActive: boolean;
  status: 'upcoming' | 'active' | 'ended';
  
  progress?: number;

  packets: DisciplinePacket[];
  
  targetSpecializations?: string[];
}

export interface DisciplinePacket extends BaseEntity {
  name: string;
  description?: string;
  semester: 1 | 2;
  yearOfStudy: number;
  maxChoices: number;
  disciplines: string[];
  totalCredits: number;
  category?: string;
  prerequisites?: Prerequisites;
}

export interface EnrollmentPreference extends BaseEntity {
  studentId: string;
  packetId: string;
  preferences: DisciplinePreference[];
  submittedAt: Date;
}

export interface DisciplinePreference {
  disciplineId: string;
  priority: number;
  motivation?: string;
}

export interface Enrollment extends BaseEntity {
  studentId: string;
  disciplineId: string;
  packetId: string;
  status: EnrollmentStatus;
  enrollmentDate: Date;
  preference: number;
  waitlistPosition?: number;
  statusHistory: EnrollmentStatusChange[];
}

export interface EnrollmentStatusChange {
  status: EnrollmentStatus;
  date: Date;
  reason?: string;
}

export interface DisciplineStatistics {
  disciplineId: string;
  totalSpots: number;
  enrolledCount: number;
  waitlistCount: number;
  averagePreference: number;
  historicalEnrollmentData?: {
    academicYear: string;
    enrolledCount: number;
    averageGrade?: number;
  }[];
}

export interface PacketStatistics {
  packetId: string;
  disciplines: DisciplineStatistics[];
  mostPopularDiscipline: string;
  leastPopularDiscipline: string;
}

export interface Announcement {
  title: string;
  date: string;
  content: string;
  important: boolean;
}

export interface QuickAction {
  icon: ReactNode;
  title: string;
  description: string;
}