import {
  DisciplineSelectionItem,
  EnrollmentSelectionState,
} from '../../../types/enrollments/enrollment-selection.types';
import { useCallback, useState } from 'react';

import { DisciplinePacket } from '../../../types/disciplines/disciplines.types';

const INITIAL_STATE: EnrollmentSelectionState = {
  packets: {},
  currentPacketId: null,
};

export function useEnrollmentSelections(availablePackets: DisciplinePacket[]) {
  const [selections, setSelections] = useState<EnrollmentSelectionState>(
    () => ({
      packets: availablePackets.reduce(
        (acc, packet) => ({
          ...acc,
          [packet.id]: {
            packetId: packet.id,
            name: packet.name,
            maxSelections: packet.maxChoices,
            selections: [],
          },
        }),
        {}
      ),
      currentPacketId: availablePackets[0]?.id || null,
    })
  );

  const addSelection = useCallback((disciplineId: string, packetId: string) => {
    setSelections((prev) => {
      const packet = prev.packets[packetId];
      if (!packet || packet.selections.length >= packet.maxSelections) {
        return prev;
      }

      const newSelection: DisciplineSelectionItem = {
        disciplineId,
        priority: packet.selections.length + 1,
        selectedAt: new Date(),
      };

      return {
        ...prev,
        packets: {
          ...prev.packets,
          [packetId]: {
            ...packet,
            selections: [...packet.selections, newSelection],
          },
        },
      };
    });
  }, []);

  const removeSelection = useCallback(
    (disciplineId: string, packetId: string) => {
      setSelections((prev) => {
        const packet = prev.packets[packetId];
        if (!packet) return prev;

        const updatedSelections = packet.selections
          .filter((s) => s.disciplineId !== disciplineId)
          .map((s, idx) => ({ ...s, priority: idx + 1 }));

        return {
          ...prev,
          packets: {
            ...prev.packets,
            [packetId]: {
              ...packet,
              selections: updatedSelections,
            },
          },
        };
      });
    },
    []
  );

  const isPacketComplete = useCallback(
    (packetId: string) => {
      const packet = selections.packets[packetId];
      return packet && packet.selections.length === packet.maxSelections;
    },
    [selections]
  );

  const canAddToPacket = useCallback(
    (packetId: string) => {
      const packet = selections.packets[packetId];
      return packet && packet.selections.length < packet.maxSelections;
    },
    [selections]
  );

  const isDisciplineSelected = useCallback(
    (disciplineId: string) => {
      return Object.values(selections.packets).some((packet) =>
        packet.selections.some((s) => s.disciplineId === disciplineId)
      );
    },
    [selections]
  );

  const getPacketForDiscipline = useCallback(
    (disciplineId: string) => {
      return availablePackets.find((packet) =>
        packet.disciplines.includes(disciplineId)
      );
    },
    [availablePackets]
  );

  const getSelectionErrors = useCallback(() => {
    return Object.values(selections.packets).reduce((errors, packet) => {
      if (packet.selections.length < packet.maxSelections) {
        errors.push(
          `${packet.name} needs ${
            packet.maxSelections - packet.selections.length
          } more selection(s)`
        );
      }
      return errors;
    }, [] as string[]);
  }, [selections]);

  return {
    selections,
    addSelection,
    removeSelection,
    isPacketComplete,
    canAddToPacket,
    isDisciplineSelected,
    getPacketForDiscipline,
    getSelectionErrors,
    currentPacketId: selections.currentPacketId,
  };
}
