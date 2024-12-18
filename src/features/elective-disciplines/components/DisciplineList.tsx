import { Box, Grid } from '@mui/material';
import { Discipline, DisciplinePacket } from '../../../types/disciplines/disciplines.types';

import { DisciplineCard } from './DisciplineCard';
import { EnrollmentSelectionState } from '../../../types/enrollments/enrollment-selection.types';
import { FC } from 'react';

interface DisciplineListProps {
  disciplines: Discipline[];
  packet: DisciplinePacket;
  onViewDetails: (discipline: Discipline) => void;
  selectedDisciplines: EnrollmentSelectionState;
  isEnrollmentPeriodActive: boolean;
}

export const DisciplineList: FC<DisciplineListProps> = ({
  disciplines,
  packet,
  onViewDetails,
  selectedDisciplines,
  isEnrollmentPeriodActive,
}) => {
  const getSelectionCount = (disciplineId: string): number => {
    const packetSelections = selectedDisciplines.packets[packet.id]?.selections || [];
    const selection = packetSelections.find(s => s.disciplineId === disciplineId);
    return selection ? selection.priority : 0;
  };

  const isDisciplineSelected = (disciplineId: string): boolean => {
    return selectedDisciplines.packets[packet.id]?.selections.some(
      s => s.disciplineId === disciplineId
    ) || false;
  };

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Grid 
        container 
        spacing={3}
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, minmax(400px, 1fr))',
            xl: 'repeat(3, minmax(400px, 1fr))',
          },
          gap: 3,
          alignItems: 'stretch',
        }}
      >
        {disciplines.map((discipline) => (
          <DisciplineCard
            key={discipline.id}
            discipline={discipline}
            packet={packet}
            onViewDetails={() => onViewDetails(discipline)}
            isEnrollmentPeriodActive={isEnrollmentPeriodActive}
            isSelected={isDisciplineSelected(discipline.id)}
            selectionCount={getSelectionCount(discipline.id)}
          />
        ))}
      </Grid>
    </Box>
  );
};