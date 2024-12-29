import { BaseEntity } from "../base.types";

export interface Student extends BaseEntity {
  firstName: string;
  lastName: string;
  universityId: string;
  email: string;
  group: string;
  subgroup: number;
  specialization: string;
  yearOfStudy: number;
  semester: 1 | 2;
  status: StudentStatus;
  personalInfo?: StudentPersonalInfo;
}

export interface StudentPersonalInfo {
  cnp?: string;
  birthDate: Date;
  phoneNumber?: string;
  address?: string;
  citizenship: string;
}

export enum StudentStatus {
  ENROLLED = 'ENROLLED',
  TRANSFERRED = 'TRANSFERRED',
  GRADUATED = 'GRADUATED',
}
