import {
  AccessTime,
  CalendarToday,
  Class,
  ExpandMore,
  PlaylistAdd,
  School
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
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Discipline, DisciplinePacket } from '../../../types/disciplines/disciplines.types';
import { FC, useEffect, useMemo, useState } from 'react';
import {
  getEnrollmentPeriodStatus,
  getRemainingDays,
  mockEnrollmentPeriods
} from '../../mocks/enrollment-periods.mock';
import { useNavigate, useParams } from 'react-router-dom';

import { DisciplineDetailsDrawer } from '../components/DisciplineDetailsDrawer';
import { DisciplineList } from '../components/DisciplineList';
import { EnrollmentModal } from '../../enrollments/EnrollmentModal';
import { EnrollmentSelectionPanel } from '../../enrollments/components/EnrollmentSelectionPanel';
import { mockDisciplines } from '../../mocks/elective-disciplines.mock';
import { useEnrollmentSelections } from '../../enrollments/hooks/useEnrollmentSelection';

// Constants for layout measurements
const HEADER_HEIGHT = '64px';
const SELECTIONS_PANEL_WIDTH = '380px';

export const ElectiveDisciplinesPage: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { periodId } = useParams();

  // Find and validate the current enrollment period
  const enrollmentPeriod = mockEnrollmentPeriods.find(p => p.id === periodId);
  const status = enrollmentPeriod ? getEnrollmentPeriodStatus(enrollmentPeriod) : 'ended';
  const remainingDays = enrollmentPeriod ? getRemainingDays(enrollmentPeriod) : 0;

  // State management
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isSelectionDrawerOpen, setIsSelectionDrawerOpen] = useState(false);
  const [isEnrollmentStarted, setIsEnrollmentStarted] = useState(false);
  const [isRequiredSelectionsExpanded, setIsRequiredSelectionsExpanded] = 
    useState(false);

  // Initialize enrollment selection management
  const {
    selections,
    addSelection,
    removeSelection,
    canAddToPacket,
    isDisciplineSelected,
    getSelectionErrors,
  } = useEnrollmentSelections(enrollmentPeriod?.packets || []);

  // Create an efficient lookup map for disciplines
  const disciplinesMap = useMemo(() => {
    return mockDisciplines.reduce((acc, discipline) => {
      acc[discipline.id] = discipline;
      return acc;
    }, {} as Record<string, Discipline>);
  }, [mockDisciplines]);

  // Group disciplines by their respective packets
  const disciplinesByPacket = useMemo(() => {
    return (enrollmentPeriod?.packets || []).reduce((acc, packet) => {
      acc[packet.id] = packet.disciplines
        .map(id => disciplinesMap[id])
        .filter(Boolean);
      return acc;
    }, {} as Record<string, Discipline[]>);
  }, [disciplinesMap, enrollmentPeriod]);

  // Helper function to get the total number of selections
  const getTotalSelections = () => {
    return Object.values(selections.packets).reduce(
      (total, packet) => total + packet.selections.length,
      0
    );
  };

  // Helper function to find which packet a discipline belongs to
  const getPacketForDiscipline = (disciplineId: string): DisciplinePacket | undefined => {
    return enrollmentPeriod?.packets.find(packet => 
      packet.disciplines.includes(disciplineId)
    );
  };

  // Event Handlers
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

  // Validate enrollment period access
  useEffect(() => {
    if (!enrollmentPeriod || status === 'ended') {
      navigate('/dashboard');
    }
  }, [enrollmentPeriod, status, navigate]);

  if (!enrollmentPeriod) return null;

  return (
    <Grid container spacing={3}>
      {/* Main Content Area */}
      <Grid item xs={12} md={8} lg={8}>
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
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
              {/* Title and Days Counter */}
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Elective Disciplines
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
                    {enrollmentPeriod.academicYear} - Semester {enrollmentPeriod.semester}
                  </Typography>
                </Box>
                <Chip
                  label={`${remainingDays} days remaining`}
                  color={remainingDays <= 3 ? "warning" : "default"}
                  icon={<AccessTime />}
                  sx={{ px: 1 }}
                />
              </Stack>

              {/* Period Details */}
              <Stack spacing={1}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <CalendarToday color="action" fontSize="small" />
                  <Typography variant="body2" color="text.secondary">
                    {new Date(enrollmentPeriod.startDate).toLocaleDateString()} - {' '}
                    {new Date(enrollmentPeriod.endDate).toLocaleDateString()}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <School color="action" fontSize="small" />
                  <Typography variant="body2" color="text.secondary">
                    Year {enrollmentPeriod.yearOfStudy} - {enrollmentPeriod.targetSpecializations?.join(', ')}
                  </Typography>
                </Stack>
              </Stack>

              <Divider />

              {/* selection requirements */}
              <Accordion
                expanded={isRequiredSelectionsExpanded}
                onChange={() => setIsRequiredSelectionsExpanded(!isRequiredSelectionsExpanded)}
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
                    }
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
                    }
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
                        mr: 1 
                      }}
                    >
                      {isRequiredSelectionsExpanded ? 'Click to collapse' : 'Click to view requirements'}
                    </Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: 0, pt: 2 }}>
                  <Box>
                    <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                      {enrollmentPeriod.packets.map(packet => (
                        <Typography 
                          key={packet.id} 
                          component="li" 
                          variant="body1" 
                          paragraph
                        >
                          <strong>{packet.name}:</strong> Select 1 primary discipline 
                          and {packet.maxChoices - 1} backup option(s)
                        </Typography>
                      ))}
                    </Box>
                    <Alert 
                      severity="info" 
                      icon={<Class />}
                      sx={{ mt: 2 }}
                    >
                      Your selections will be processed in priority order. If you 
                      cannot be enrolled in your primary choice, we will attempt to 
                      enroll you in your backup selection.
                    </Alert>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Stack>
          </Paper>

          {/* Discipline Packets */}
          {enrollmentPeriod.packets.map(packet => {
            const packetDisciplines = disciplinesByPacket[packet.id] || [];
            if (packetDisciplines.length === 0) return null;

            return (
              <Box key={packet.id} sx={{ mb: 6 }}>
                <Typography variant="h5" gutterBottom color="primary">
                  {packet.name}
                </Typography>
                <Typography variant="body1" gutterBottom color="text.secondary">
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
      <Grid item md={4} lg={4} sx={{ 
        display: { xs: 'none', md: 'block' },
        width: SELECTIONS_PANEL_WIDTH
      }}>
        <Box sx={{ 
          position: 'sticky',
          top: HEADER_HEIGHT,
          height: `calc(100vh - ${HEADER_HEIGHT} - 20)`,
          overflowY: 'auto',
          p: 2,
          zIndex: 2
        }}>
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
      {isMobile && (
        <>
          {/* Floating Action Button */}
          <Fab
            color="primary"
            onClick={() => setIsSelectionDrawerOpen(true)}
            sx={{
              position: 'fixed',
              bottom: 16,
              right: 16,
              display: { xs: 'flex', md: 'none' }
            }}
          >
            <Badge
              badgeContent={getTotalSelections()}
              color="error"
              sx={{ '& .MuiBadge-badge': { right: 4, top: 4 } }}
            >
              <PlaylistAdd />
            </Badge>
          </Fab>

          {/* Selection Panel Drawer */}
          <Drawer
            anchor="bottom"
            open={isSelectionDrawerOpen}
            onClose={() => setIsSelectionDrawerOpen(false)}
            PaperProps={{
              sx: {
                maxHeight: '80vh',
                borderTopLeftRadius: theme.shape.borderRadius * 2,
                borderTopRightRadius: theme.shape.borderRadius * 2,
              },
            }}
          >
            <Box sx={{ p: 2 }}>
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
          onAddToSelection={(packetId) => handleAddToSelection(selectedDiscipline.id, packetId)}
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