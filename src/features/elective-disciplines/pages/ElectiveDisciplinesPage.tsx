import {
  AccessTime,
  CalendarToday,
  Info,
  PlaylistAdd,
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
  alpha,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Discipline,
  DisciplinePacket,
  EnrollmentPeriod,
} from '../../../types/disciplines/disciplines.types';
import { FC, useEffect, useMemo, useState } from 'react';
import {
  HEADER_HEIGHT,
  SELECTIONS_PANEL_WIDTH,
} from '../../../config/layout.config';
import {
  getEnrollmentPeriodStatus,
  getRemainingDays,
} from '../../mocks/enrollment-periods.mock';
import { useNavigate, useParams } from 'react-router-dom';

import { DisciplineDetailsDrawer } from '../components/DisciplineDetailsDrawer';
import { DisciplineList } from '../components/DisciplineList';
import { EnrollmentSelectionPanel } from '../../enrollments/components/EnrollmentSelectionPanel';
import { SelectionRequirementsModal } from '../components/SelectionRequirementsModal';
import { mockDisciplines } from '../../mocks/elective-disciplines.mock';
import { useEnrollmentSelections } from '../../enrollments/hooks/useEnrollmentSelection';
import { useGetElectivePeriodQuery } from '../../../api/elective-disciplines/electiveDisciplinesApi';

export const ElectiveDisciplinesPage: FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { periodId } = useParams();

  if (!periodId) {
    navigate('/dashboard');
    return;
  }

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const mockEnrollmentPeriods: EnrollmentPeriod[] = [];

  const {
    data: enrollmentPeriod,
    isLoading,
    error,
    refetch,
  } = useGetElectivePeriodQuery(periodId);

  const status = enrollmentPeriod
    ? getEnrollmentPeriodStatus(enrollmentPeriod)
    : 'ended';
  const remainingDays = enrollmentPeriod
    ? getRemainingDays(enrollmentPeriod)
    : 0;

  const [selectedDiscipline, setSelectedDiscipline] =
    useState<Discipline | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isSelectionDrawerOpen, setIsSelectionDrawerOpen] = useState(false);
  const [isRequirementsModalOpen, setIsRequirementsModalOpen] = useState(false);

  const {
    selections,
    addSelection,
    removeSelection,
    reorderSelections,
    canAddToPacket,
    isDisciplineSelected,
    getSelectionErrors,
  } = useEnrollmentSelections(enrollmentPeriod?.packets || []);

  const disciplinesMap = useMemo(() => {
    return mockDisciplines.reduce((acc, discipline) => {
      acc[discipline.id] = discipline;
      return acc;
    }, {} as Record<string, Discipline>);
  }, [mockDisciplines]);

  const disciplinesByPacket = useMemo(() => {
    return (enrollmentPeriod?.packets || []).reduce((acc, packet) => {
      acc[packet.id] = packet.disciplines
        .map((id) => disciplinesMap[id])
        .filter(Boolean);
      return acc;
    }, {} as Record<string, Discipline[]>);
  }, [disciplinesMap, enrollmentPeriod]);

  const getTotalSelections = () => {
    return Object.values(selections.packets).reduce(
      (total, packet) => total + packet.selections.length,
      0
    );
  };

  const getPacketForDiscipline = (
    disciplineId: string
  ): DisciplinePacket | undefined => {
    return enrollmentPeriod?.packets.find((packet) =>
      packet.disciplines.includes(disciplineId)
    );
  };

  const handleViewDetails = (discipline: Discipline) => {
    setSelectedDiscipline(discipline);
    setIsDetailsOpen(true);
  };

  const handleAddToSelection = (disciplineId: string, packetId: string) => {
    if (canAddToPacket(packetId)) {
      addSelection(disciplineId, packetId);
      setIsDetailsOpen(false);
      if (isMobile) {
        setIsSelectionDrawerOpen(true);
      }
    }
  };

  useEffect(() => {
    if (!enrollmentPeriod || status === 'ended') {
      navigate('/dashboard');
    }
  }, [enrollmentPeriod, status, navigate]);

  if (!enrollmentPeriod) return null;

  return (
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
              background: theme.palette.background.paper,
            }}
          >
            <Stack spacing={3}>
              {/* Main Header Section */}
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                spacing={{ xs: 2, sm: 0 }}
              >
                <Box sx={{ flex: 1 }}>
                  <Stack direction="row" alignItems="baseline" spacing={2}>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' },
                      }}
                    >
                      Elective Disciplines
                    </Typography>
                  </Stack>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {enrollmentPeriod.academicYear} - Semester{' '}
                    {enrollmentPeriod.semester} -{' '}
                    {enrollmentPeriod.targetSpecializations?.[0] ||
                      'All Specializations'}{' '}
                    - Year {enrollmentPeriod.yearOfStudy}
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
                    sx={{
                      px: 1,
                      height: { xs: 32, sm: 36 },
                      '& .MuiChip-label': { px: { xs: 1, sm: 2 } },
                      '& .MuiChip-icon': {
                        fontSize: { xs: '1.25rem', sm: '1.5rem' },
                      },
                    }}
                  />
                </Stack>
              </Stack>

              <Divider />

              {/* Information and Actions Row */}
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', md: 'center' }}
                spacing={2}
              >
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 1.5, sm: 3 }}
                  sx={{ width: { xs: '100%', md: 'auto' } }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CalendarToday
                      color="action"
                      sx={{ fontSize: '1.25rem' }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {new Date(
                        enrollmentPeriod.startDate
                      ).toLocaleDateString()}{' '}
                      -{' '}
                      {new Date(enrollmentPeriod.endDate).toLocaleDateString()}
                    </Typography>
                  </Stack>

                  {/* <Stack direction="row" spacing={1} alignItems="center">
                    <School color="action" sx={{ fontSize: '1.25rem' }} />
                   
                  </Stack> */}
                </Stack>

                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => setIsRequirementsModalOpen(true)}
                  startIcon={<Info />}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 500,
                    borderRadius: 2,
                    px: 2,
                    height: 36,
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: alpha(theme.palette.primary.main, 0.04),
                    },
                  }}
                >
                  Selection Requirements
                </Button>
              </Stack>
            </Stack>
          </Paper>

          {/* Discipline Packets */}
          {enrollmentPeriod.packets.map((packet) => {
            const packetDisciplines = disciplinesByPacket[packet.id] || [];
            if (packetDisciplines.length === 0) return null;

            return (
              <Box key={packet.id} sx={{ mb: { xs: 4, md: 6 } }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  color="primary"
                  sx={{
                    fontSize: { xs: '1.25rem', sm: '1.5rem' },
                    fontWeight: 600,
                  }}
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
              '&::-webkit-scrollbar': { width: '8px' },
              '&::-webkit-scrollbar-track': { bgcolor: 'transparent' },
              '&::-webkit-scrollbar-thumb': {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                borderRadius: '4px',
                transition: 'background-color 0.2s ease',
                '&:hover': {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
                },
              },
            }}
          >
            <EnrollmentSelectionPanel
              selections={selections}
              packets={enrollmentPeriod.packets}
              disciplines={disciplinesMap}
              onRemoveSelection={removeSelection}
              onReorderSelections={reorderSelections}
              onStartEnrollment={() => {}}
              enrollmentPeriod={enrollmentPeriod}
            />
          </Box>
        </Grid>
      ) : (
        <>
          <Fab
            color="primary"
            onClick={() => setIsSelectionDrawerOpen(true)}
            sx={{
              position: 'fixed',
              bottom: { xs: 16, sm: 24 },
              right: { xs: 16, sm: 24 },
              display: { lg: 'none' },
              width: { xs: 56, sm: 64 },
              height: { xs: 56, sm: 64 },
            }}
          >
            <Badge
              badgeContent={getTotalSelections()}
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  right: { xs: 4, sm: 6 },
                  top: { xs: 4, sm: 6 },
                },
              }}
            >
              <PlaylistAdd sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem' } }} />
            </Badge>
          </Fab>

          <Drawer
            anchor="bottom"
            open={isSelectionDrawerOpen}
            onClose={() => setIsSelectionDrawerOpen(false)}
            PaperProps={{
              sx: {
                maxHeight: { xs: '85vh', sm: '75vh' },
                borderTopLeftRadius: { xs: 16, sm: 24 },
                borderTopRightRadius: { xs: 16, sm: 24 },
                pb: 'env(safe-area-inset-bottom, 16px)',
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
                onStartEnrollment={() => {}}
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

      <SelectionRequirementsModal
        open={isRequirementsModalOpen}
        onClose={() => setIsRequirementsModalOpen(false)}
        packets={enrollmentPeriod.packets}
      />
    </Grid>
  );
};
