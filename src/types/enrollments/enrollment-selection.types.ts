export interface DisciplineSelectionItem {
  disciplineId: string;
  priority: number;
  selectedAt: Date;
}

export interface PacketSelections {
  packetId: string;
  name: string;
  maxSelections: number;  // How many backup options a student can select
  selections: DisciplineSelectionItem[];
}

export interface EnrollmentSelectionState {
  packets: Record<string, PacketSelections>;
  currentPacketId: string | null;
}