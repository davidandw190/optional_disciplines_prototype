import {
  AccessTime,
  CalendarToday,
  CheckCircleOutline,
  Close,
  ErrorOutline,
  HourglassTop,
  InfoOutlined,
  Person,
  School,
  WarningAmber,
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
import { formatSubmissionTime, getPacketTooltipMessage } from './utils/utils';

import { EnrollmentDisciplineCard } from './components/EnrollmentDisciplineCard';
import { EnrollmentStatus } from '../../../types/disciplines/disciplines.enums';
import { EnrollmentSummary } from '../../../types/enrollments/enrollment-summary.types';
import { FC } from 'react';
import { Student } from '../../../types/student/student.types';

interface EnrollmentDetailsModalProps {
  open: boolean;
  onClose: () => void;
  enrollment: EnrollmentSummary;
  student: Student;
}

export const EnrollmentDetailsModal: FC<EnrollmentDetailsModalProps> = ({
  open,
  onClose,
  enrollment,
  student,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getSpecializationInfo = (
    enrollment: EnrollmentSummary,
    student: Student
  ) => {
    const { targetSpecializations } = enrollment.enrollmentPeriod;
    if (targetSpecializations?.includes(student.specialization)) {
      return student.specialization;
    }
    if (targetSpecializations?.includes('All Specializations')) {
      return student.specialization;
    }
    return null;
  };

  const getEnrollmentStatusMessage = () => {
    const confirmedCount = enrollment.packets.reduce(
      (count, packet) =>
        count +
        packet.selections.filter((s) => s.status === EnrollmentStatus.CONFIRMED)
          .length,
      0
    );

    const pendingCount = enrollment.packets.reduce(
      (count, packet) =>
        count +
        packet.selections.filter((s) => s.status === EnrollmentStatus.PENDING)
          .length,
      0
    );

    const waitlistedCount = enrollment.packets.reduce(
      (count, packet) =>
        count +
        packet.selections.filter((s) => s.status === EnrollmentStatus.WAITLIST)
          .length,
      0
    );

    switch (enrollment.status) {
      case EnrollmentStatus.CONFIRMED:
        return {
          message: `You have been successfully enrolled in ${confirmedCount} discipline${
            confirmedCount !== 1 ? 's' : ''
          }. Your academic schedule is now finalized for the upcoming semester.`,
          icon: <CheckCircleOutline />,
          color: theme.palette.success.main,
          title: 'Enrollment Confirmed',
        };
      case EnrollmentStatus.PENDING:
        return {
          message: `Your enrollment request with ${pendingCount} discipline${
            pendingCount !== 1 ? 's' : ''
          } is being processed. This typically takes 2-3 business days. You'll receive a notification when results are available.`,
          icon: <HourglassTop />,
          color: theme.palette.warning.main,
          title: 'Processing Enrollment',
        };
      case EnrollmentStatus.WAITLIST:
        return {
          message: `You are on the waitlist for ${waitlistedCount} discipline${
            waitlistedCount !== 1 ? 's' : ''
          }. If spaces become available, you'll be automatically enrolled based on your priority order.`,
          icon: <WarningAmber />,
          color: theme.palette.info.main,
          title: 'On Waitlist',
        };
      case EnrollmentStatus.REJECTED:
        return {
          message:
            'Your enrollment request could not be processed. Please contact Student Services for assistance and to discuss alternative options.',
          icon: <ErrorOutline />,
          color: theme.palette.error.main,
          title: 'Enrollment Unsuccessful',
        };
      default:
        return {
          message: '',
          icon: <InfoOutlined />,
          color: theme.palette.grey[500],
          title: 'Status Unknown',
        };
    }
  };

  const specialization = getSpecializationInfo(enrollment, student);

  const Content = () => {
    const statusInfo = getEnrollmentStatusMessage();

    return (
      <Stack sx={{ height: '100%' }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 2.5 }, 
            borderBottom: '1px solid',
            borderColor: 'divider',
            position: 'sticky',
            top: 0,
            bgcolor: theme.palette.background.paper,
            zIndex: 1,
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            <Stack spacing={1.5}>
              {' '}
              {/* Reduced spacing */}
              {/* Title */}
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.primary.main,
                }}
              >
                {enrollment.enrollmentPeriod.type.split('_').join(' ')}
              </Typography>
              {/* Academic Information */}
              <Stack spacing={1}>
                {/* Academic Period Info */}
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'flex-start', sm: 'center' }}
                  spacing={{ xs: 0.5, sm: 2 }}
                  sx={{ mb: { xs: 0.5, sm: 0 } }}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <School
                      sx={{
                        fontSize: '1rem',
                        color: theme.palette.primary.main,
                      }}
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{ color: theme.palette.text.primary }}
                    >
                      {`${enrollment.enrollmentPeriod.academicYear} • Year ${enrollment.enrollmentPeriod.yearOfStudy} - Sem ${enrollment.enrollmentPeriod.semester}`}
                    </Typography>
                  </Stack>

                  {specialization && (
                    <Chip
                      label={specialization}
                      size="small"
                      color="primary"
                      sx={{
                        height: 24,
                        px: 0.22,
                        '& .MuiChip-label': {
                          px: 0.75,
                          fontSize: '0.75rem',
                          fontWeight: 500,
                        },
                        '& .MuiChip-icon': {
                          ml: 0.5,
                          mr: -0.25,
                        },
                      }}
                    />
                  )}
                </Stack>

                {/* Time Display */}
                <Typography
                  variant="caption"
                  sx={{
                    color: theme.palette.text.secondary,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.75,
                  }}
                >
                  <AccessTime sx={{ fontSize: '0.875rem' }} />
                  {formatSubmissionTime(enrollment.enrollmentDate)}
                </Typography>
              </Stack>
            </Stack>

            {/* Close button */}
            <IconButton
              onClick={onClose}
              size="small"
              aria-label="Close details"
              sx={{
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                },
              }}
            >
              <Close />
            </IconButton>
          </Stack>

          {/* Status banner */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mt: 2,
              bgcolor: alpha(statusInfo.color, 0.08),
              borderRadius: 2,
              border: `1px solid ${alpha(statusInfo.color, 0.2)}`,
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="flex-start">
              <Box
                sx={{
                  color: statusInfo.color,
                  display: 'flex',
                  alignItems: 'center',
                  pt: 0.25,
                }}
              >
                {statusInfo.icon}
              </Box>
              <Stack spacing={0.5} sx={{ flex: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {statusInfo.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.4,
                    fontSize: '0.8125rem',
                  }}
                >
                  {statusInfo.message}
                </Typography>
              </Stack>
            </Stack>
          </Paper>
        </Paper>

        {/* Packets and Selections */}
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            p: { xs: 2, sm: 2.5 },
            maxHeight: { xs: undefined, sm: 'calc(80vh - 170px)' }, // Limits height on desktop
          }}
        >
          <Stack spacing={3}>
            {enrollment.packets.map((packet) => (
              <Paper
                key={packet.packet.id}
                elevation={0}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.03),
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                      }}
                    >
                      {packet.packet.name}
                    </Typography>

                    <Tooltip
                      title={
                        <Typography
                          variant="body2"
                          sx={{ whiteSpace: 'pre-line' }}
                        >
                          {getPacketTooltipMessage(packet)}
                        </Typography>
                      }
                      arrow
                      placement="top"
                      enterTouchDelay={0}
                      leaveTouchDelay={3000}
                      componentsProps={{
                        tooltip: {
                          sx: {
                            bgcolor: theme.palette.background.paper,
                            color: theme.palette.text.primary,
                            border: `1px solid ${alpha(
                              theme.palette.divider,
                              0.15
                            )}`,
                            boxShadow: `0 3px 6px ${alpha(
                              theme.palette.common.black,
                              0.1
                            )}`,
                            p: 2,
                            '& .MuiTooltip-arrow': {
                              color: theme.palette.background.paper,
                              '&::before': {
                                border: `1px solid ${alpha(
                                  theme.palette.divider,
                                  0.15
                                )}`,
                                backgroundColor: theme.palette.background.paper,
                                boxSizing: 'border-box',
                              },
                            },
                            maxWidth: 300,
                            '& .MuiTypography-root': {
                              lineHeight: 1.5,
                            },
                          },
                        },
                        popper: {
                          sx: {
                            zIndex: theme.zIndex.tooltip,
                          },
                        },
                      }}
                    >
                      <IconButton
                        size="small"
                        aria-label="Packet information"
                        sx={{
                          color: theme.palette.primary.main,
                          opacity: 0.7,
                          '&:hover': {
                            opacity: 1,
                            backgroundColor: alpha(
                              theme.palette.primary.main,
                              0.08
                            ),
                          },
                        }}
                      >
                        <InfoOutlined sx={{ fontSize: '1rem' }} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Box>

                <Box sx={{ p: 2 }}>
                  <Stack spacing={1.5}>
                    {packet.selections.map((selection) => (
                      <EnrollmentDisciplineCard
                        key={selection.disciplineId}
                        selection={selection}
                      />
                    ))}
                  </Stack>
                </Box>
              </Paper>
            ))}
          </Stack>
        </Box>
      </Stack>
    );
  };

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
        },
      }}
    >
      <Content />
    </Dialog>
  );
};
