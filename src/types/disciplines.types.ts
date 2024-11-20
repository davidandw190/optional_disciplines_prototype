export interface Discipline {
  id: string;
  code: string;
  name: string;
  credits: number;
  description: string;
  semester: 1 | 2;
  teachers: {
    course: string;
    seminar?: string;
    lab?: string;
  };
  schedule: {
    course: number;
    seminar?: number;
    lab?: number;
  };
  evaluation: {
    type: 'exam' | 'colloquium';
    details: string;
  };
  syllabus: string; // URL to syllabus document
  maxCapacity: number;
  currentEnrollments: number;
}

export interface DisciplinePacket {
  id: string;
  name: string;
  description: string;
  disciplines: Discipline[];
  maxChoices: number;
}

export interface EnrollmentPeriod {
  id: string;
  startDate: Date;
  endDate: Date;
  year: number;
  semester: 1 | 2;
  status: 'upcoming' | 'active' | 'ended';
}