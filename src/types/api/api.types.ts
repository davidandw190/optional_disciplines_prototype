import { Discipline, DisciplinePacket } from "../disciplines/disciplines.types";

export interface PageResponse<T> {
  content: T[];              
  totalElements: number;     
  number: number;            
  size: number;              
}

export interface EnrollmentPeriodsQueryParams {
  yearOfStudy: number;
  semester: 1 | 2;
  specialization: string;
}

export interface PacketWithDisciplines {
  packet: DisciplinePacket;
  disciplines: Discipline[];
}

export interface PacketsResponse {
  packets: PacketWithDisciplines[];
}
