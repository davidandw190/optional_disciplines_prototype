import {
  DisciplinePacket,
  EnrollmentPeriod,
  Teacher
} from '../disciplines/disciplines.types';

import {
  EnrollmentStatus
} from '../disciplines/disciplines.enums';

export interface DisciplineSelection {
  disciplineId: string;
  name: string;
  code: string;
  priority: number;
  status: EnrollmentStatus;
  teacher?: Teacher;  
}


export interface EnrollmentPacketSummary {
  packet: DisciplinePacket;
  selections: DisciplineSelection[];
  status: EnrollmentStatus;
}

export interface EnrollmentSummary {
  id: string;
  enrollmentPeriod: EnrollmentPeriod;
  status: EnrollmentStatus;
  packets: EnrollmentPacketSummary[];
  enrollmentDate: Date;
  lastUpdated: Date;
}