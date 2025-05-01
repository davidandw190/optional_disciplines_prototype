import {
  DisciplineSelectionItem,
  EnrollmentSelectionState,
} from '../types/enrollments/enrollment-selection.types';
import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { EnrollmentPeriod } from '../types/disciplines/disciplines.types';

// Define the shape of our context's public API
interface DisciplineSelectionContextType {
  selections: EnrollmentSelectionState;
  addSelection: (disciplineId: string, packetId: string) => void;
  removeSelection: (disciplineId: string, packetId: string) => void;
  reorderSelections: (
    packetId: string,
    startIndex: number,
    endIndex: number
  ) => void;
  clearSelections: () => void;
  canAddToPacket: (packetId: string) => boolean;
  isDisciplineSelected: (disciplineId: string) => boolean;
  getSelectionErrors: () => string[];
  hasEnrollmentPeriod: boolean;
}

// Create the context with null as initial value
const DisciplineSelectionContext =
  createContext<DisciplineSelectionContextType | null>(null);

// Provider component props definition
interface DisciplineSelectionProviderProps {
  children: ReactNode;
  enrollmentPeriod?: EnrollmentPeriod;
}

/**
 * Validates the structure of saved selection data from localStorage
 * Ensures type safety when restoring saved state
 */
const isValidSelectionState = (data: any): data is EnrollmentSelectionState => {
  if (!data || typeof data !== 'object') return false;
  if (!data.packets || typeof data.packets !== 'object') return false;

  for (const packet of Object.values(data.packets)) {
    if (!packet || typeof packet !== 'object') return false;
    if (!Array.isArray((packet as any).selections)) return false;

    // Validate each selection has required properties
    for (const selection of (packet as any).selections) {
      if (
        !selection.disciplineId ||
        !selection.priority ||
        !selection.selectedAt
      ) {
        return false;
      }
    }
  }

  return true;
};

export const DisciplineSelectionProvider: FC<
  DisciplineSelectionProviderProps
> = ({ children, enrollmentPeriod }) => {
  const getStorageKey = useCallback(() => {
    if (!enrollmentPeriod) return null;
    // TODO: Get actual student ID from auth context
    const studentId = 'current-student-id';
    return `discipline-selections-${enrollmentPeriod.id}-${studentId}`;
  }, [enrollmentPeriod]);

  const initializeSelections = useCallback(() => {
    const storageKey = getStorageKey();
    if (!storageKey || !enrollmentPeriod) {
      return {
        packets: {},
        currentPacketId: null,
      };
    }

    const savedSelections = localStorage.getItem(storageKey);
    if (savedSelections) {
      try {
        const parsed = JSON.parse(savedSelections);
        if (isValidSelectionState(parsed)) {
          return parsed;
        }
      } catch (error) {
        console.error('Error parsing saved selections:', error);
      }
    }

    return {
      packets: enrollmentPeriod.packets.reduce(
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
      currentPacketId: enrollmentPeriod.packets[0]?.id || null,
    };
  }, [enrollmentPeriod, getStorageKey]);

  const [selections, setSelections] =
    useState<EnrollmentSelectionState>(initializeSelections);

  useEffect(() => {
    const storageKey = getStorageKey();
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(selections));
    }
  }, [selections, getStorageKey]);

  const addSelection = useCallback(
    (disciplineId: string, packetId: string) => {
      if (!enrollmentPeriod) return;

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
    },
    [enrollmentPeriod]
  );

  const removeSelection = useCallback(
    (disciplineId: string, packetId: string) => {
      if (!enrollmentPeriod) return;

      setSelections((prev) => {
        const packet = prev.packets[packetId];
        if (!packet) return prev;

        const updatedSelections = packet.selections
          .filter((s) => s.disciplineId !== disciplineId)
          .map((s, idx) => ({
            ...s,
            priority: idx + 1,
          }));

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
    [enrollmentPeriod]
  );

  const reorderSelections = useCallback(
    (packetId: string, startIndex: number, endIndex: number) => {
      if (!enrollmentPeriod) return;

      setSelections((prev) => {
        const packet = prev.packets[packetId];
        if (!packet) return prev;

        const newSelections = [...packet.selections];
        const [movedItem] = newSelections.splice(startIndex, 1);
        newSelections.splice(endIndex, 0, movedItem);

        const reorderedSelections = newSelections.map((selection, index) => ({
          ...selection,
          priority: index + 1,
        }));

        return {
          ...prev,
          packets: {
            ...prev.packets,
            [packetId]: {
              ...packet,
              selections: reorderedSelections,
            },
          },
        };
      });
    },
    [enrollmentPeriod]
  );

  const clearSelections = useCallback(() => {
    const storageKey = getStorageKey();
    if (storageKey) {
      localStorage.removeItem(storageKey);
    }
    setSelections(initializeSelections());
  }, [getStorageKey, initializeSelections]);

  const canAddToPacket = useCallback(
    (packetId: string) => {
      const packet = selections.packets[packetId];
      return Boolean(packet && packet.selections.length < packet.maxSelections);
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

  const getSelectionErrors = useCallback(
    () =>
      Object.values(selections.packets).reduce((errors, packet) => {
        const remaining = packet.maxSelections - packet.selections.length;
        if (remaining > 0) {
          errors.push(`${packet.name} needs ${remaining} more selection(s)`);
        }
        return errors;
      }, [] as string[]),
    [selections]
  );

  const value = {
    selections,
    addSelection,
    removeSelection,
    reorderSelections,
    clearSelections,
    canAddToPacket,
    isDisciplineSelected,
    getSelectionErrors,
    hasEnrollmentPeriod: !!enrollmentPeriod,
  };

  return (
    <DisciplineSelectionContext.Provider value={value}>
      {children}
    </DisciplineSelectionContext.Provider>
  );
};

export const useDisciplineSelection = () => {
  const context = useContext(DisciplineSelectionContext);
  if (!context) {
    throw new Error(
      'useDisciplineSelection must be used within a DisciplineSelectionProvider'
    );
  }
  return context;
};
