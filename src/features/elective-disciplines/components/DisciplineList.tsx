import { Box, Container, Fade, Stack, useTheme } from '@mui/material';
import { Discipline, DisciplinePacket } from '../../../types/disciplines/disciplines.types';
import { FC, useMemo } from 'react';

import { DisciplineCard } from './DisciplineCard';
import { EnrollmentSelectionState } from '../../../types/enrollments/enrollment-selection.types';

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
  const theme = useTheme();

  const selectionHelpers = useMemo(
    () => ({
      getSelectionCount: (disciplineId: string): number => {
        const packetSelections = selectedDisciplines.packets[packet.id]?.selections || [];
        const selection = packetSelections.find((s) => s.disciplineId === disciplineId);
        return selection ? selection.priority : 0;
      },
      isDisciplineSelected: (disciplineId: string): boolean => {
        return selectedDisciplines.packets[packet.id]?.selections.some(
          (s) => s.disciplineId === disciplineId
        ) || false;
      },
    }),
    [selectedDisciplines, packet.id]
  );

  return (
    <Container
      disableGutters
      sx={{
        width: '100%',
        display: 'grid',
        gap: { xs: 2, sm: 3 },
        gridTemplateColumns: {
          xs: '1fr', // single column on mobile
          sm: 'repeat(auto-fill, minmax(300px, 1fr))', // responsive grid
        },
        alignItems: 'stretch',
        position: 'relative',
        background: theme.palette.mode === 'light'
          ? `linear-gradient(${theme.palette.primary.main}08 1px, transparent 1px)`
          : 'none',
        backgroundSize: '100% 48px',
        py: { xs: 2, sm: 3, md: 4 },
      }}
    >
      {disciplines.map((discipline, index) => (
        <Fade
          key={discipline.id}
          in={true}
          timeout={300}
          style={{
            transitionDelay: `${index * 50}ms`,
          }}
        >
          <Box
            sx={{
              height: '100%',
              // improve touch target size on mobile
              '& > *': {
                minHeight: { xs: '200px', sm: 'auto' },
              },
            }}
          >
            <DisciplineCard
              discipline={discipline}
              packet={packet}
              onViewDetails={() => onViewDetails(discipline)}
              isEnrollmentPeriodActive={isEnrollmentPeriodActive}
              isSelected={selectionHelpers.isDisciplineSelected(discipline.id)}
              selectionCount={selectionHelpers.getSelectionCount(discipline.id)}
            />
          </Box>
        </Fade>
      ))}

      {disciplines.length === 0 && (
        <Stack
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{
            py: 8,
            color: theme.palette.text.secondary,
            gridColumn: '1/-1', // Span all columns
          }}
        >
          <Box
            component="img"
            src="/assets/illustrations/empty-state.svg"
            alt="No disciplines"
            sx={{
              width: { xs: '200px', sm: '250px' },
              height: 'auto',
              opacity: 0.5,
            }}
          />
          <Box sx={{ textAlign: 'center' }}>
            No disciplines available for this packet yet.
          </Box>
        </Stack>
      )}
    </Container>
  );
};