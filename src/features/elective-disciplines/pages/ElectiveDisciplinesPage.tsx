// src/features/disciplines/pages/ElectiveDisciplinesPage.tsx

import {
  AccessTime,
  CalendarToday,
  Class,
  School
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Chip,
  Divider,
  Drawer,
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
  isEnrollmentAccessible,
  mockEnrollmentPeriods
} from '../../mocks/enrollment-periods.mock';
import { useNavigate, useParams } from 'react-router-dom';

import { DisciplineDetailsDrawer } from '../components/DisciplineDetailsDrawer';
import { DisciplineList } from '../components/DisciplineList';
import { EnrollmentModal } from '../../enrollments/EnrollmentModal';
import { EnrollmentSelectionPanel } from '../../enrollments/components/EnrollmentSelectionPanel';
import { NoResults } from '../components/NoResults';
import { mockDisciplines } from '../../mocks/elective-disciplines.mock';
import { useEnrollmentSelections } from '../../enrollments/hooks/useEnrollmentSelection';

export const ElectiveDisciplinesPage: FC = () => {
  // Theme and responsive layout handling
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { periodId } = useParams();

  // Find and validate current enrollment period
  const enrollmentPeriod = mockEnrollmentPeriods.find(p => p.id === periodId);
  const status = enrollmentPeriod ? getEnrollmentPeriodStatus(enrollmentPeriod) : 'ended';
  const remainingDays = enrollmentPeriod ? getRemainingDays(enrollmentPeriod) : 0;

  // Core state management
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isSelectionDrawerOpen, setIsSelectionDrawerOpen] = useState(false);
  const [isEnrollmentStarted, setIsEnrollmentStarted] = useState(false);

  // Validate enrollment period access
  useEffect(() => {
    if (!enrollmentPeriod) {
      console.error('Enrollment period not found');
      navigate('/dashboard');
      return;
    }

    if (status === 'ended') {
      console.log('Enrollment period has ended');
      navigate('/dashboard');
      return;
    }
  }, [enrollmentPeriod, status, navigate]);

  // Initialize enrollment selection management
  const {
    selections,
    addSelection,
    removeSelection,
    isPacketComplete,
    canAddToPacket,
    isDisciplineSelected,
    getSelectionErrors,
    currentPacketId
  } = useEnrollmentSelections(enrollmentPeriod?.packets || []);

  // Create efficient lookup maps for disciplines
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
        .filter(Boolean); // Remove any undefined entries
      return acc;
    }, {} as Record<string, Discipline[]>);
  }, [disciplinesMap, enrollmentPeriod]);

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
    // Additional cleanup or success notifications could be added here
  };

  // Guard against missing enrollment period
  if (!enrollmentPeriod) return null;

  return (
    <Grid container spacing={3}>
      {/* Main content area */}
      <Grid item xs={12} md={8} lg={9}>
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          {/* Enhanced Header with Period Information */}
          <Paper sx={{ p: 3, mb: 4 }}>
            <Stack spacing={3}>
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

              <Box>
                <Typography variant="h6" gutterBottom color="primary">
                  Required Selections
                </Typography>
                <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                  {enrollmentPeriod.packets.map(packet => (
                    <Typography key={packet.id} component="li" variant="body1" paragraph>
                      <strong>{packet.name}:</strong> Select 1 primary discipline and{' '}
                      {packet.maxChoices - 1} backup option
                    </Typography>
                  ))}
                </Box>

                <Alert 
                  severity="info" 
                  icon={<Class />}
                  sx={{ mt: 2 }}
                >
                  Your selections will be processed in priority order. If you cannot be enrolled 
                  in your primary choice, we will attempt to enroll you in your backup selection.
                </Alert>
              </Box>
            </Stack>
          </Paper>

          {/* Packet Sections */}
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
      <Grid item md={4} lg={3} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Box sx={{ position: 'sticky', top: 0, p: 2 }}>
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

      {/* Selection Panel - Mobile */}
      {isMobile && (
        <Drawer
          anchor="bottom"
          open={isSelectionDrawerOpen}
          onClose={() => setIsSelectionDrawerOpen(false)}
          PaperProps={{
            sx: {
              maxHeight: '80vh',
              borderTopLeftRadius: theme.shape.borderRadius,
              borderTopRightRadius: theme.shape.borderRadius,
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

      {/* Enrollment Confirmation Modal */}
      {/* {isEnrollmentStarted && (
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