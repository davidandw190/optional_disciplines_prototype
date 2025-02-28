import { DisciplinePacket } from '../../../../types/disciplines/disciplines.types';
import { EnrollmentSelectionState } from '../../../../types/enrollments/enrollment-selection.types';

export const getFormattedDate = (date: Date): string => {
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getTotalSelections = (
  selections: EnrollmentSelectionState,
  packets: DisciplinePacket[]
): number => {
  return packets.reduce((total, packet) => {
    const packetSelections = selections.packets[packet.id]?.selections || [];
    return total + packetSelections.length;
  }, 0);
};

export const getPriorityDescription = (priority: number): string => {
  if (priority === 1)
    return 'This is your top choice and has the highest enrollment priority.';
  if (priority === 2)
    return 'This is your second choice and will be considered if your first choice is unavailable.';
  if (priority === 3)
    return 'This is your third choice and will be considered after higher priorities.';
  return `This is priority ${priority} and will be considered after higher-ranked selections.`;
};

export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getPacketTooltipMessage = (
  packet: DisciplinePacket,
  selections: { disciplineId: string; priority: number }[]
): string => {
  const maxChoices = packet.maxChoices;
  const selectedCount = selections.length;

  let message = `This packet allows ${maxChoices} selection${
    maxChoices > 1 ? 's' : ''
  }.`;

  message += ` You have selected ${selectedCount} discipline${
    selectedCount !== 1 ? 's' : ''
  }.`;

  message +=
    '\n\nYour selections are ordered by priority. Higher priority (lower numbers) will be processed first when enrollment spaces are limited.';

  if (packet.description) {
    message += `\n\nAbout this packet: ${packet.description}`;
  }

  if (packet.totalCredits) {
    message += `\n\nTotal credits: ${packet.totalCredits}`;
  }

  return message;
};

export const getEnrollmentSummary = (
  selections: any,
  packets: DisciplinePacket[]
): string => {
  const totalPackets = Object.keys(selections.packets).length;
  const totalSelections = packets.reduce((total, packet) => {
    const packetSelections = selections.packets[packet.id]?.selections || [];
    return total + packetSelections.length;
  }, 0);

  const totalCredits = packets.reduce((total, packet) => {
    const packetSelections = selections.packets[packet.id]?.selections || [];
    return packetSelections.length > 0
      ? total + (packet.totalCredits || 0)
      : total;
  }, 0);

  return `You are about to confirm enrollment for ${totalSelections} discipline${
    totalSelections !== 1 ? 's' : ''
  } across ${totalPackets} packet${totalPackets !== 1 ? 's' : ''}${
    totalCredits ? `, totaling ${totalCredits} credits` : ''
  }. Priority order affects enrollment chances when spaces are limited.`;
};
