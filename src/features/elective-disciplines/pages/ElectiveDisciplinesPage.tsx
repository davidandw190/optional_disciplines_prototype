import {
  AccessTime,
  CalendarToday,
  Info,
  PlaylistAddCheck,
} from '@mui/icons-material';
import {
  Badge,
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  Fab,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Discipline,
  DisciplinePacket,
} from '../../../types/disciplines/disciplines.types';
import {
  DisciplineSelectionProvider,
  useDisciplineSelection,
} from '../../../contexts/discipline-selection.context';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
  HEADER_HEIGHT,
  SELECTIONS_PANEL_WIDTH,
} from '../../../config/layout.config';
import {
  getEnrollmentPeriodStatus,
  getRemainingDays,
} from '../../mocks/enrollment-periods.mock';
import {
  useGetElectivePacketsQuery,
  useGetElectivePeriodQuery,
} from '../../../api/elective-disciplines/electiveDisciplinesApi';
import { useNavigate, useParams } from 'react-router-dom';

import { ContentSkeleton } from '../components/skeletons/ContentSkeleton';
import { DisciplineDetailsDrawer } from '../components/DisciplineDetailsDrawer';
import { DisciplineList } from '../components/DisciplineList';
import { EnrollmentConfirmationModal } from '../../enrollments/modals/EnrollmentConfirmationModal';
import { EnrollmentSelectionPanel } from '../../enrollments/components/EnrollmentSelectionPanel';
import { SelectionRequirementsModal } from '../components/SelectionRequirementsModal';

export const ElectiveDisciplinesPage: FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { periodId } = useParams();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [selectedDiscipline, setSelectedDiscipline] =
    useState<Discipline | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isSelectionDrawerOpen, setIsSelectionDrawerOpen] = useState(false);
  const [isRequirementsModalOpen, setIsRequirementsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  useEffect(() => {
    if (!periodId) {
      navigate('/dashboard');
    }
  }, [periodId, navigate]);

  if (!periodId) return null;

  const {
    data: enrollmentPeriod,
    isLoading: isLoadingPeriod,
    error: periodError,
  } = useGetElectivePeriodQuery(periodId);

  const {
    data: packetsData,
    isLoading: isLoadingPackets,
    error: packetsError,
  } = useGetElectivePacketsQuery(periodId);

  const {
    selections,
    addSelection,
    removeSelection,
    reorderSelections,
    canAddToPacket,
    isDisciplineSelected,
    getSelectionErrors,
  } = useDisciplineSelection();

  // const {
  //   selections,
  //   addSelection,
  //   removeSelection,
  //   reorderSelections,
  //   canAddToPacket,
  //   isDisciplineSelected,
  //   getSelectionErrors,
  // } = useEnrollmentSelections(enrollmentPeriod?.packets || []);

  const disciplinesMap = useMemo(() => {
    const map: Record<string, Discipline> = {};
    packetsData?.packets.forEach(({ disciplines }) => {
      disciplines.forEach((discipline) => {
        map[discipline.id] = discipline;
      });
    });
    return map;
  }, [packetsData]);

  const disciplinesByPacket = useMemo(() => {
    if (!packetsData) return {};
    return packetsData.packets.reduce((acc, { packet, disciplines }) => {
      acc[packet.id] = disciplines;
      return acc;
    }, {} as Record<string, Discipline[]>);
  }, [packetsData]);

  const status = enrollmentPeriod
    ? getEnrollmentPeriodStatus(enrollmentPeriod)
    : 'ended';
  const remainingDays = enrollmentPeriod
    ? getRemainingDays(enrollmentPeriod)
    : 0;

  useEffect(() => {
    if ((!isLoadingPeriod && !enrollmentPeriod) || status === 'ended') {
      navigate('/dashboard');
    }
  }, [enrollmentPeriod, status, navigate, isLoadingPeriod]);

  const getTotalSelections = useCallback(() => {
    return Object.values(selections.packets).reduce(
      (total, packet) => total + packet.selections.length,
      0
    );
  }, [selections]);

  const getPacketForDiscipline = useCallback(
    (disciplineId: string): DisciplinePacket | undefined => {
      return enrollmentPeriod?.packets.find((packet) =>
        packet.disciplines.includes(disciplineId)
      );
    },
    [enrollmentPeriod]
  );

  const handleViewDetails = useCallback((discipline: Discipline) => {
    setSelectedDiscipline(discipline);
    setIsDetailsOpen(true);
  }, []);

  const handleAddToSelection = useCallback(
    (disciplineId: string, packetId: string) => {
      if (canAddToPacket(packetId)) {
        addSelection(disciplineId, packetId);
        setIsDetailsOpen(false);
        if (isMobile) {
          setIsSelectionDrawerOpen(true);
        }
      }
    },
    [canAddToPacket, addSelection, isMobile]
  );

  const handleStartEnrollment = useCallback(() => {
    const errors = getSelectionErrors();
    if (errors.length === 0) {
      setIsConfirmationOpen(true);
    }
  }, [getSelectionErrors]);

  const handleConfirmEnrollment = async () => {
    try {
      // await enrollDisciplines(selections, periodId);
      setIsConfirmationOpen(false);
      navigate('/dashboard');
    } catch (error) {
      console.error('Enrollment failed:', error);
    }
  };

  if (periodError) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error" align="center">
          Unable to load enrollment period details. Please try again later.
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate('/dashboard')}
          sx={{ mt: 2, display: 'block', mx: 'auto' }}
        >
          Return to Dashboard
        </Button>
      </Box>
    );
  }

  if (isLoadingPeriod || isLoadingPackets || !enrollmentPeriod) {
    return (
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <ContentSkeleton />
      </Box>
    );
  }

  return (
    <DisciplineSelectionProvider enrollmentPeriod={enrollmentPeriod}>
      <Grid container spacing={3} sx={{ position: 'relative' }}>
        {/* Main Content Area */}
        <Grid item xs={12} lg={8} sx={{ width: '100%', pr: { xs: 0, lg: 2 } }}>
          <Box sx={{ p: { xs: 2, sm: 3 }, pb: { xs: 8, lg: 3 } }}>
            {/* Header Card */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 4,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Stack spacing={3}>
                {/* Title and Period Info */}
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  alignItems={{ xs: 'flex-start', sm: 'center' }}
                  spacing={{ xs: 2, sm: 0 }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Stack direction="row" alignItems="baseline" spacing={2}>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        Elective Disciplines
                      </Typography>
                    </Stack>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      {enrollmentPeriod.academicYear} - Semester{' '}
                      {enrollmentPeriod.semester}
                    </Typography>
                  </Box>

                  <Stack
                    spacing={1}
                    alignItems={{ xs: 'flex-start', sm: 'flex-end' }}
                  >
                    <Chip
                      label={`${remainingDays} days remaining`}
                      color={remainingDays <= 3 ? 'warning' : 'default'}
                      icon={<AccessTime />}
                    />
                  </Stack>
                </Stack>

                <Divider />

                {/* Period Details */}
                <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  justifyContent="space-between"
                  alignItems={{ xs: 'flex-start', md: 'center' }}
                  spacing={2}
                >
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1.5, sm: 3 }}
                  >
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CalendarToday color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {new Date(
                          enrollmentPeriod.startDate
                        ).toLocaleDateString()}{' '}
                        -{' '}
                        {new Date(
                          enrollmentPeriod.endDate
                        ).toLocaleDateString()}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setIsRequirementsModalOpen(true)}
                    startIcon={<Info />}
                  >
                    Requirements
                  </Button>
                </Stack>
              </Stack>
            </Paper>

            {/* Discipline Packets */}
            {enrollmentPeriod.packets.map((packet) => {
              const packetDisciplines = disciplinesByPacket[packet.id] || [];
              if (packetDisciplines.length === 0) return null;

              return (
                <Box key={packet.id} sx={{ mb: 4 }}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    color="primary"
                    sx={{ fontWeight: 600 }}
                  >
                    {packet.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    {packet.description}
                  </Typography>

                  <DisciplineList
                    disciplines={packetDisciplines}
                    packet={packet}
                    onViewDetails={handleViewDetails}
                    selectedDisciplines={selections}
                    isEnrollmentPeriodActive={status === 'active'}
                  />
                </Box>
              );
            })}
          </Box>
        </Grid>

        {/* Selection Panel - Desktop */}
        {isDesktop ? (
          <Grid
            item
            md={4}
            lg={4}
            sx={{
              display: { xs: 'none', md: 'block' },
              width: SELECTIONS_PANEL_WIDTH,
            }}
          >
            <Box
              sx={{
                position: 'fixed',
                top: `calc(${HEADER_HEIGHT} + 58px)`,
                width: SELECTIONS_PANEL_WIDTH,
                maxHeight: `calc(100vh - ${HEADER_HEIGHT} - 32px)`,
                overflowY: 'auto',
                zIndex: 2,
                px: 2,
              }}
            >
              <EnrollmentSelectionPanel
                selections={selections}
                packets={enrollmentPeriod.packets}
                disciplines={disciplinesMap}
                onRemoveSelection={removeSelection}
                onReorderSelections={reorderSelections}
                onStartEnrollment={handleStartEnrollment}
                enrollmentPeriod={enrollmentPeriod}
              />
            </Box>
          </Grid>
        ) : (
          <>
            {/* Mobile FAB for selections */}
            <Fab
              color="primary"
              onClick={() => setIsSelectionDrawerOpen(true)}
              sx={{
                position: 'fixed',
                bottom: { xs: 16, sm: 24 },
                right: { xs: 16, sm: 24 },
                display: { lg: 'none' },
              }}
            >
              <Badge
                badgeContent={getTotalSelections()}
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    color:
                      theme.palette.mode === 'dark'
                        ? theme.palette.common.black
                        : undefined,
                    fontWeight: 600,
                  },
                }}
              >
                <PlaylistAddCheck />
              </Badge>
            </Fab>

            {/* Mobile Selection Drawer */}
            <Drawer
              anchor="bottom"
              open={isSelectionDrawerOpen}
              onClose={() => setIsSelectionDrawerOpen(false)}
              PaperProps={{
                sx: {
                  maxHeight: { xs: '85vh', sm: '75vh' },
                  borderTopLeftRadius: { xs: 16, sm: 24 },
                  borderTopRightRadius: { xs: 16, sm: 24 },
                },
              }}
            >
              <Box sx={{ p: { xs: 2, sm: 3 }, height: '100%' }}>
                <EnrollmentSelectionPanel
                  selections={selections}
                  packets={enrollmentPeriod.packets}
                  disciplines={disciplinesMap}
                  onRemoveSelection={removeSelection}
                  onReorderSelections={reorderSelections}
                  onStartEnrollment={handleStartEnrollment}
                  enrollmentPeriod={enrollmentPeriod}
                />
              </Box>
            </Drawer>
          </>
        )}

        {/* Modals and Drawers */}
        {selectedDiscipline && (
          <DisciplineDetailsDrawer
            discipline={selectedDiscipline}
            open={isDetailsOpen}
            onClose={() => {
              setIsDetailsOpen(false);
              setSelectedDiscipline(null);
            }}
            onAddToSelection={(disciplineId) =>
              handleAddToSelection(selectedDiscipline.id, disciplineId)
            }
            isEnrollmentPeriodActive={status === 'active'}
            isSelected={isDisciplineSelected(selectedDiscipline.id)}
            canBeSelected={true}
            packet={getPacketForDiscipline(selectedDiscipline.id)}
            currentSelections={selections}
          />
        )}

        {/* Requirements Modal */}
        <SelectionRequirementsModal
          open={isRequirementsModalOpen}
          onClose={() => setIsRequirementsModalOpen(false)}
          packets={enrollmentPeriod.packets}
        />

        {/* Enrollment Confirmation Modal/Drawer */}
        <EnrollmentConfirmationModal
          open={isConfirmationOpen}
          onClose={() => setIsConfirmationOpen(false)}
          onConfirm={handleConfirmEnrollment}
          selections={selections}
          packets={enrollmentPeriod.packets}
          disciplines={disciplinesMap}
          enrollmentPeriod={enrollmentPeriod}
        />
      </Grid>
    </DisciplineSelectionProvider>
  );
};
