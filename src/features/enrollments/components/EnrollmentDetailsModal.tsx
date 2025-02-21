import {
  AccessTime,
  CalendarToday,
  Close,
  Info,
  Person,
  School,
} from '@mui/icons-material';
import {
  Box,
  Chip,
  Dialog,
  Drawer,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { EnrollmentStatus } from '../../../types/disciplines/disciplines.enums';
import { EnrollmentSummary } from '../../../types/enrollments/enrollment-summary.types';
import { FC } from 'react';
import { formatDate } from '../../../utils/dateUtils';
import { getStatusColor } from '../utils/enrollmentsUtils';

interface EnrollmentDetailsModalProps {
  open: boolean;
  onClose: () => void;
  enrollment: EnrollmentSummary;
}

export const EnrollmentDetailsModal: FC<EnrollmentDetailsModalProps> = ({
  open,
  onClose,
  enrollment,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const containerStyles = {
    backgroundImage: 'none',
    bgcolor: alpha(theme.palette.background.paper, 0.95),
    backdropFilter: 'blur(20px)',
  };

  const getEnrollmentStatusMessage = () => {
    const confirmedCount = enrollment.packets.reduce(
      (count, packet) =>
        count +
        packet.selections.filter((s) => s.status === EnrollmentStatus.CONFIRMED)
          .length,
      0
    );

    switch (enrollment.status) {
      case EnrollmentStatus.CONFIRMED:
        return `You have been successfully enrolled in ${confirmedCount} discipline${
          confirmedCount !== 1 ? 's' : ''
        }.`;
      case EnrollmentStatus.PENDING:
        return 'Your enrollment is being processed. You will be notified once the results are available.';
      case EnrollmentStatus.WAITLIST:
        return 'You are currently on the waitlist. You will be notified if a spot becomes available.';
      case EnrollmentStatus.REJECTED:
        return 'Unfortunately, your enrollment was not successful. Please contact the academic office for more information.';
      default:
        return '';
    }
  };

  const Content = () => (
    <Stack sx={{ height: '100%' }}>
      {/* Header Section */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          borderBottom: '1px solid',
          borderColor: 'divider',
          position: 'sticky',
          top: 0,
          bgcolor: 'background.paper',
          zIndex: 1,
        }}
      >
        <Stack spacing={2}>
          {/* Title and Close Button */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Stack spacing={1}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {enrollment.enrollmentPeriod.type.replace('_', ' ')}
              </Typography>

              {/* Period Information */}
              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                <Stack direction="row" spacing={1} alignItems="center">
                  <CalendarToday sx={{ fontSize: '0.875rem' }} />
                  <Typography variant="body2" color="text.secondary">
                    {enrollment.enrollmentPeriod.academicYear}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <School sx={{ fontSize: '0.875rem' }} />
                  <Typography variant="body2" color="text.secondary">
                    Year {enrollment.enrollmentPeriod.yearOfStudy}, Semester{' '}
                    {enrollment.enrollmentPeriod.semester}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <AccessTime sx={{ fontSize: '0.875rem' }} />
                  <Typography variant="body2" color="text.secondary">
                    Submitted on {formatDate(enrollment.enrollmentDate)}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>

            <IconButton onClick={onClose} size="small">
              <Close />
            </IconButton>
          </Stack>

          {/* Status Information Banner */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              bgcolor: alpha(
                getStatusColor(enrollment.status, theme).main,
                0.08
              ),
              borderRadius: 1,
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="flex-start">
              <Info
                sx={{
                  fontSize: '1.25rem',
                  mt: 0.25,
                  color: getStatusColor(enrollment.status, theme).main,
                }}
              />
              <Stack spacing={0.5}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Enrollment Status: {enrollment.status}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {getEnrollmentStatusMessage()}
                </Typography>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Paper>

      {/* Scrollable Content Area */}
      <Box sx={{ flex: 1, overflow: 'auto', p: { xs: 2, sm: 3 } }}>
        <Stack spacing={3}>
          {/* Packet Sections */}
          {enrollment.packets.map((packet) => (
            <Paper
              key={packet.packet.id}
              elevation={0}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
              }}
            >
              <Box sx={{ p: 2.5 }}>
                {/* Packet Header */}
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ mb: 2 }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {packet.packet.name}
                  </Typography>
                  <Tooltip
                    title={`Maximum selections allowed: ${packet.packet.maxChoices}`}
                    arrow
                    placement="top"
                    enterTouchDelay={0}
                    leaveTouchDelay={3000}
                  >
                    <Info sx={{ fontSize: '1rem', color: 'action.active' }} />
                  </Tooltip>
                </Stack>

                {/* Selections List */}
                <Stack spacing={2}>
                  {packet.selections.map((selection) => (
                    <Paper
                      key={selection.disciplineId}
                      elevation={0}
                      sx={{
                        p: 2,
                        bgcolor: alpha(
                          selection.status === EnrollmentStatus.CONFIRMED
                            ? theme.palette.success.main
                            : theme.palette.background.paper,
                          selection.status === EnrollmentStatus.CONFIRMED
                            ? 0.04
                            : 0.6
                        ),
                        borderRadius: 1.5,
                        border: '1px solid',
                        borderColor:
                          selection.status === EnrollmentStatus.CONFIRMED
                            ? theme.palette.success.main
                            : alpha(theme.palette.divider, 0.1),
                        transition: 'all 0.2s ease-in-out',
                      }}
                    >
                      <Stack spacing={1.5}>
                        {/* Selection Header */}
                        <Stack
                          direction="row"
                          spacing={1.5}
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Stack
                            direction="row"
                            spacing={1.5}
                            alignItems="center"
                          >
                            <Chip
                              label={`Priority ${selection.priority}`}
                              color={
                                selection.priority === 1 ? 'success' : 'default'
                              }
                              size="small"
                              sx={{
                                height: 24,
                                '& .MuiChip-label': {
                                  px: 1,
                                  fontSize: '0.75rem',
                                  fontWeight: 500,
                                },
                              }}
                            />
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: 500 }}
                            >
                              {selection.name}
                            </Typography>
                          </Stack>
                          <Chip
                            label={selection.status}
                            size="small"
                            sx={{
                              height: 20,
                              bgcolor: alpha(
                                getStatusColor(selection.status, theme).main,
                                0.1
                              ),
                              color: getStatusColor(selection.status, theme)
                                .main,
                              '& .MuiChip-label': {
                                px: 1,
                                fontSize: '0.75rem',
                                fontWeight: 500,
                              },
                            }}
                          />
                        </Stack>

                        {/* Selection Details */}
                        <Stack spacing={1}>
                          {/* Teacher Information */}
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <Person
                              sx={{
                                fontSize: '0.875rem',
                                color: 'text.secondary',
                              }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {selection.teacher
                                ? `${selection.teacher.academicTitle.abbreviation} ${selection.teacher.firstName} ${selection.teacher.lastName}`
                                : 'Teacher to be announced'}
                            </Typography>
                          </Stack>

                          {/* Course Code */}
                          <Typography
                            variant="caption"
                            sx={{
                              px: 1,
                              py: 0.25,
                              borderRadius: 0.75,
                              bgcolor: alpha(theme.palette.primary.main, 0.1),
                              color: theme.palette.primary.main,
                              display: 'inline-block',
                              width: 'fit-content',
                            }}
                          >
                            {selection.code}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Paper>
                  ))}
                </Stack>
              </Box>
            </Paper>
          ))}
        </Stack>
      </Box>
    </Stack>
  );

  // Render appropriate container based on screen size
  return isMobile ? (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          height: '90vh',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          ...containerStyles,
        },
      }}
    >
      <Content />
    </Drawer>
  ) : (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '90vh',
          ...containerStyles,
        },
      }}
      BackdropProps={{
        sx: {
          bgcolor: alpha(theme.palette.background.default, 0.8),
          backdropFilter: 'blur(8px)',
        },
      }}
    >
      <Content />
    </Dialog>
  );
};
