import { ReactElement } from "react";

export interface DisciplineSelectionItem {
  disciplineId: string;
  priority: number;
  selectedAt: Date;
}

export interface PacketSelections {
  packetId: string;
  name: string;
  maxSelections: number;
  selections: DisciplineSelectionItem[];
}

export interface EnrollmentSelectionState {
  packets: Record<string, PacketSelections>;
  currentPacketId: string | null;
}

export enum EnrollmentPeriodStatus {
  ACTIVE = 'ACTIVE',
  UPCOMING = 'UPCOMING',
  ENDED = 'ENDED',
}

export interface StatusInfo {
  message: string;
  icon: ReactElement;
  color: string;
  title: string;
}