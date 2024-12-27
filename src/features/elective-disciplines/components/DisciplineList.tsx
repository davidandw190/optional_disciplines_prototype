import {
  Box,
  Button,
  Collapse,
  Container,
  Fade,
  Stack,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Discipline,
  DisciplinePacket,
} from '../../../types/disciplines/disciplines.types';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { FC, useCallback, useMemo, useState } from 'react';

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
  const [isExpanded, setIsExpanded] = useState(false);

  const INITIAL_DISPLAY_COUNT = 4;

  const selectionHelpers = useMemo(
    () => ({
      getSelectionCount: (disciplineId: string): number => {
        const packetSelections =
          selectedDisciplines.packets[packet.id]?.selections || [];
        const selection = packetSelections.find(
          (s) => s.disciplineId === disciplineId
        );
        return selection ? selection.priority : 0;
      },
      isDisciplineSelected: (disciplineId: string): boolean =>
        selectedDisciplines.packets[packet.id]?.selections.some(
          (s) => s.disciplineId === disciplineId
        ) || false,
    }),
    [selectedDisciplines, packet.id]
  );

  const { visibleDisciplines, remainingCount } = useMemo(
    () => ({
      visibleDisciplines: disciplines.slice(
        0,
        isExpanded ? disciplines.length : INITIAL_DISPLAY_COUNT
      ),
      remainingCount: Math.max(0, disciplines.length - INITIAL_DISPLAY_COUNT),
    }),
    [disciplines, isExpanded]
  );

  const handleExpandToggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <Container
        disableGutters
        sx={{
          width: '100%',
          display: 'grid',
          gap: { xs: 2, sm: 3 },
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(auto-fill, minmax(300px, 1fr))',
          },
          alignItems: 'stretch',
          background:
            theme.palette.mode === 'light'
              ? `linear-gradient(${theme.palette.primary.main}08 1px, transparent 1px)`
              : 'none',
          backgroundSize: '100% 48px',
          py: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {visibleDisciplines.map((discipline, index) => (
          <Fade
            key={discipline.id}
            in={true}
            timeout={300}
            style={{
              transitionDelay: `${index * 50}ms`,
              transitionProperty: 'opacity, transform',
            }}
          >
            <Box
              sx={{
                height: '100%',
                transform: 'translateY(0)',
                transition: 'transform 0.2s ease-in-out',
                '& > *': {
                  minHeight: { xs: '200px', sm: 'auto' },
                },
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <DisciplineCard
                discipline={discipline}
                packet={packet}
                onViewDetails={() => onViewDetails(discipline)}
                isEnrollmentPeriodActive={isEnrollmentPeriodActive}
                isSelected={selectionHelpers.isDisciplineSelected(
                  discipline.id
                )}
                selectionCount={selectionHelpers.getSelectionCount(
                  discipline.id
                )}
              />
            </Box>
          </Fade>
        ))}

        {disciplines.length === 0 && (
          <Fade in={true}>
            <Stack
              spacing={2}
              alignItems="center"
              justifyContent="center"
              sx={{
                py: 8,
                color: theme.palette.text.secondary,
                gridColumn: '1/-1',
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
          </Fade>
        )}
      </Container>

      <Collapse in={remainingCount > 0}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 3,
            mb: 1,
          }}
        >
          <Button
            variant="outlined"
            onClick={handleExpandToggle}
            endIcon={isExpanded ? <ExpandLess /> : <ExpandMore />}
            sx={{
              borderRadius: 20,
              px: 3,
              py: 1,
              textTransform: 'none',
              fontWeight: 500,
              color: 'text.secondary',
              borderColor: 'divider',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: alpha(theme.palette.primary.main, 0.04),
                transform: 'translateY(-1px)',
              },
              '&:active': {
                transform: 'translateY(0)',
              },
            }}
          >
            {isExpanded
              ? 'Show Less'
              : `View ${remainingCount} More Discipline${
                  remainingCount !== 1 ? 's' : ''
                }`}
          </Button>
        </Box>
      </Collapse>
    </Box>
  );
};
