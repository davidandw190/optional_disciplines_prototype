import {
  AccessTime,
  CalendarToday,
  Class,
  ExpandMore,
  PlaylistAdd,
  School,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Badge,
  Box,
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
} from '../../../types/disciplines/disciplines.types';
import { FC, useEffect, useMemo, useState } from 'react';
import {
  HEADER_HEIGHT,
  SELECTIONS_PANEL_WIDTH,
} from '../../../config/layout.config';
import {
  getEnrollmentPeriodStatus,
  getRemainingDays,
  mockEnrollmentPeriods,
} from '../../mocks/enrollment-periods.mock';
import { useNavigate, useParams } from 'react-router-dom';

import { DisciplineDetailsDrawer } from '../components/DisciplineDetailsDrawer';
import { DisciplineList } from '../components/DisciplineList';
import { EnrollmentModal } from '../../enrollments/EnrollmentModal';
import { EnrollmentSelectionPanel } from '../../enrollments/components/EnrollmentSelectionPanel';
import { mockDisciplines } from '../../mocks/elective-disciplines.mock';
import { useEnrollmentSelections } from '../../enrollments/hooks/useEnrollmentSelection';

export const ElectiveDisciplinesPage: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { periodId } = useParams();

  const enrollmentPeriod = mockEnrollmentPeriods.find((p) => p.id === periodId);
  const status = enrollmentPeriod
    ? getEnrollmentPeriodStatus(enrollmentPeriod)
    : 'ended';
  const remainingDays = enrollmentPeriod
    ? getRemainingDays(enrollmentPeriod)
    : 0;

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg')); // Changed from 'md' to 'lg'
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));

  const [selectedDiscipline, setSelectedDiscipline] =
    useState<Discipline | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isSelectionDrawerOpen, setIsSelectionDrawerOpen] = useState(false);
  const [isEnrollmentStarted, setIsEnrollmentStarted] = useState(false);
  const [isRequiredSelectionsExpanded, setIsRequiredSelectionsExpanded] =
    useState(false);

  const {
    selections,
    addSelection,
    removeSelection,
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

  const handleStartEnrollment = () => {
    const errors = getSelectionErrors();
    if (errors.length === 0) {
      setIsEnrollmentStarted(true);
      setIsSelectionDrawerOpen(false);
    }
  };

  const handleEnrollmentComplete = () => {
    setIsEnrollmentStarted(false);
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
      <Grid
        item
        xs={12}
        lg={8}
        sx={{
          width: '100%',
          pr: { xs: 0, lg: 2 },
        }}
      >
        <Box
          sx={{
            p: { xs: 2, sm: 3 },
            pb: { xs: 8, lg: 3 },
          }}
        >
          {/* Period Information Header */}
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
              {/* title and days counter */}
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                spacing={{ xs: 2, sm: 0 }}
              >
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' },
                    }}
                  >
                    Elective Disciplines
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {enrollmentPeriod.academicYear} - Semester{' '}
                    {enrollmentPeriod.semester}
                  </Typography>
                </Box>
                <Chip
                  label={`${remainingDays} days remaining`}
                  color={remainingDays <= 3 ? 'warning' : 'default'}
                  icon={<AccessTime />}
                  sx={{
                    px: 1,
                    height: { xs: 32, sm: 36 },
                    '& .MuiChip-label': {
                      px: { xs: 1, sm: 2 },
                    },
                    '& .MuiChip-icon': {
                      fontSize: { xs: '1.25rem', sm: '1.5rem' },
                    },
                  }}
                />
              </Stack>

              {/* period details */}
              <Stack spacing={1}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <CalendarToday color="action" fontSize="small" />
                  <Typography variant="body2" color="text.secondary">
                    {new Date(enrollmentPeriod.startDate).toLocaleDateString()}{' '}
                    - {new Date(enrollmentPeriod.endDate).toLocaleDateString()}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <School color="action" fontSize="small" />
                  <Typography variant="body2" color="text.secondary">
                    Year {enrollmentPeriod.yearOfStudy} -{' '}
                    {enrollmentPeriod.targetSpecializations?.join(', ')}
                  </Typography>
                </Stack>
              </Stack>

              <Divider />

              {/* selection requirements */}
              <Accordion
                expanded={isRequiredSelectionsExpanded}
                onChange={() =>
                  setIsRequiredSelectionsExpanded(!isRequiredSelectionsExpanded)
                }
                elevation={0}
                sx={{
                  '&.MuiAccordion-root': {
                    border: 'none',
                    backgroundColor: 'transparent',
                    '&:before': {
                      display: 'none',
                    },
                    '&.Mui-expanded': {
                      margin: 0,
                    },
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  sx={{
                    padding: 0,
                    '& .MuiAccordionSummary-content': {
                      margin: '0 !important',
                    },
                    '&.Mui-expanded': {
                      minHeight: 'unset',
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{ width: '100%' }}
                  >
                    <Typography variant="h6" color="primary" sx={{ flex: 1 }}>
                      Required Selections
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: { xs: 'none', sm: 'block' },
                        mr: 1,
                      }}
                    >
                      {isRequiredSelectionsExpanded
                        ? 'Click to collapse'
                        : 'Click to view requirements'}
                    </Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: 0, pt: 2 }}>
                  <Box>
                    <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                      {enrollmentPeriod.packets.map((packet) => (
                        <Typography
                          key={packet.id}
                          component="li"
                          variant="body1"
                          paragraph
                        >
                          <strong>{packet.name}:</strong> Select 1 primary
                          discipline and {packet.maxChoices - 1} backup
                          option(s)
                        </Typography>
                      ))}
                    </Box>
                    <Alert severity="info" icon={<Class />} sx={{ mt: 2 }}>
                      Your selections will be processed in priority order. If
                      you cannot be enrolled in your primary choice, we will
                      attempt to enroll you in your backup selection.
                    </Alert>
                  </Box>
                </AccordionDetails>
              </Accordion>
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
            top: `calc(${HEADER_HEIGHT} + 58px)`, // Adding some spacing from the header
            width: SELECTIONS_PANEL_WIDTH,
            maxHeight: `calc(100vh - ${HEADER_HEIGHT} - 32px)`, // Subtracting padding
            overflowY: 'auto',
            zIndex: 2,
            px: 2,
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              bgcolor: 'transparent',
            },
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
            onStartEnrollment={handleStartEnrollment}
            enrollmentPeriod={enrollmentPeriod}
          />
        </Box>
      </Grid>

      {/* Mobile Components */}
      {!isDesktop && (
        <>
          {/* Floating Action Button */}
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

          {/* Selection Panel Drawer */}
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
            <Box
              sx={{
                p: { xs: 2, sm: 3 },
                height: '100%',
              }}
            >
              <EnrollmentSelectionPanel
                selections={selections}
                packets={enrollmentPeriod.packets}
                disciplines={disciplinesMap}
                onRemoveSelection={removeSelection}
                onStartEnrollment={handleStartEnrollment}
                enrollmentPeriod={enrollmentPeriod}
              />
            </Box>
          </Drawer>
        </>
      )}

      {/* Discipline Details Drawer */}
      {selectedDiscipline && (
        <DisciplineDetailsDrawer
          discipline={selectedDiscipline}
          open={isDetailsOpen}
          onClose={() => {
            setIsDetailsOpen(false);
            setSelectedDiscipline(null);
          }}
          onAddToSelection={(packetId) =>
            handleAddToSelection(selectedDiscipline.id, packetId)
          }
          isEnrollmentPeriodActive={status === 'active'}
          isSelected={isDisciplineSelected(selectedDiscipline.id)}
          canBeSelected={true}
          packet={getPacketForDiscipline(selectedDiscipline.id)}
          currentSelections={selections}
        />
      )}

      {/* Enrollment Modal
      {isEnrollmentStarted && (
        <EnrollmentModal
          open={isEnrollmentStarted}
          onClose={() => setIsEnrollmentStarted(false)}
          selections={selections}
          onEnrollmentComplete={handleEnrollmentComplete}
          studentId="current-student-id"
          enrollmentPeriod={enrollmentPeriod}
        />
      )} */}
    </Grid>
  );
};
