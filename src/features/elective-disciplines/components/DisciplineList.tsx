import {
  Box,
  Button,
  Container,
  Fade,
  Grid,
  Stack,
  alpha,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Discipline,
  DisciplinePacket,
} from '../../../types/disciplines/disciplines.types';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { FC, useMemo, useState } from 'react';

import { DisciplineCard } from './DisciplineCard';
import { EnrollmentSelectionState } from '../../../types/enrollments/enrollment-selection.types';

interface DisciplineListProps {
  disciplines: Discipline[];
  packet: DisciplinePacket;
  onViewDetails: (discipline: Discipline) => void;
  selectedDisciplines: EnrollmentSelectionState;
  isEnrollmentPeriodActive: boolean;
}

// how many disciplines initially before collapsing
const INITIAL_DISPLAY_COUNT = 4;

export const DisciplineList: FC<DisciplineListProps> = ({
  disciplines,
  packet,
  onViewDetails,
  selectedDisciplines,
  isEnrollmentPeriodActive,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));

  const [isExpanded, setIsExpanded] = useState(false);

  const visibleDisciplines = useMemo(() => {
    return isExpanded
      ? disciplines
      : disciplines.slice(0, INITIAL_DISPLAY_COUNT);
  }, [disciplines, isExpanded]);

  const hasMoreToShow = disciplines.length > INITIAL_DISPLAY_COUNT;

  const { getSelectionCount, isDisciplineSelected } = useMemo(
    () => ({
      getSelectionCount: (disciplineId: string): number => {
        const packetSelections =
          selectedDisciplines.packets[packet.id]?.selections || [];
        const selection = packetSelections.find(
          (s) => s.disciplineId === disciplineId
        );
        return selection ? selection.priority : 0;
      },
      isDisciplineSelected: (disciplineId: string): boolean => {
        return (
          selectedDisciplines.packets[packet.id]?.selections.some(
            (s) => s.disciplineId === disciplineId
          ) || false
        );
      },
    }),
    [selectedDisciplines, packet.id]
  );

  const gridConfig = useMemo(
    () => ({
      minWidth: isMobile ? '100%' : isTablet ? '320px' : '360px',
      spacing: isMobile ? 2 : 3,
    }),
    [isMobile, isTablet]
  );

  return (
    <Box
      sx={{
        width: '100%',
        overflow: 'hidden',
        background:
          theme.palette.mode === 'light'
            ? `linear-gradient(${alpha(
                theme.palette.primary.main,
                0.03
              )} 1px, transparent 1px)`
            : 'none',
        backgroundSize: '100% 48px',
        py: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 2, sm: 3, md: 4 },
          '@media (max-width: 600px)': {
            px: 1,
          },
        }}
      >
        <Stack spacing={3}>
          {/* disciplines grid */}
          <Grid
            container
            spacing={gridConfig.spacing}
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: `repeat(auto-fit, minmax(${gridConfig.minWidth}, 1fr))`,
              },
              gap: { xs: 2, sm: 3 },
              alignItems: 'stretch',
              gridAutoRows: '1fr',
            }}
          >
            {visibleDisciplines.map((discipline, index) => (
              <Fade
                key={discipline.id}
                in={true}
                timeout={300}
                style={{
                  transitionDelay: `${index * 50}ms`,
                  height: '100%',
                }}
              >
                <Box
                  sx={{
                    height: '100%',
                    '& .MuiCard-root': {
                      transition: theme.transitions.create(['border-color'], {
                        duration: theme.transitions.duration.short,
                      }),
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: 'divider',
                      '&:hover': {
                        borderWidth: '1px',
                        borderColor: (theme) => {
                          const enrollmentPercentage =
                            discipline.maxEnrollmentSpots
                              ? ((discipline.currentEnrollmentCount || 0) /
                                  discipline.maxEnrollmentSpots) *
                                100
                              : 0;

                          if (isDisciplineSelected(discipline.id)) {
                            return theme.palette.success.main;
                          }
                          if (enrollmentPercentage >= 100) {
                            return theme.palette.error.main;
                          }
                          if (enrollmentPercentage >= 80) {
                            return theme.palette.warning.main;
                          }
                          return theme.palette.primary.main;
                        },
                      },
                    },
                  }}
                >
                  <DisciplineCard
                    discipline={discipline}
                    packet={packet}
                    onViewDetails={() => onViewDetails(discipline)}
                    isEnrollmentPeriodActive={isEnrollmentPeriodActive}
                    isSelected={isDisciplineSelected(discipline.id)}
                    selectionCount={getSelectionCount(discipline.id)}
                  />
                </Box>
              </Fade>
            ))}
          </Grid>

          {/* view more/less button */}
          {hasMoreToShow && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 2,
              }}
            >
              <Button
                variant="outlined"
                onClick={() => setIsExpanded(!isExpanded)}
                endIcon={isExpanded ? <ExpandLess /> : <ExpandMore />}
                sx={{
                  borderRadius: 20,
                  px: 3,
                  py: 1,
                  textTransform: 'none',
                  fontWeight: 500,
                  color: 'text.secondary',
                  borderColor: 'divider',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: alpha(theme.palette.primary.main, 0.04),
                  },
                }}
              >
                {isExpanded ? (
                  <>Show Less</>
                ) : (
                  <>
                    View {disciplines.length - INITIAL_DISPLAY_COUNT} More
                    Disciplines
                  </>
                )}
              </Button>
            </Box>
          )}

          {disciplines.length === 0 && (
            <Box
              sx={{
                textAlign: 'center',
                py: 8,
                color: theme.palette.text.secondary,
              }}
            >
              No disciplines available for this packet yet.
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
};
