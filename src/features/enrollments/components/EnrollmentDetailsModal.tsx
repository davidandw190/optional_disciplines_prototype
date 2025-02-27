import {
  AccessTime,
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
import { DisciplineSelection, EnrollmentPacketSummary, EnrollmentSummary } from '../../../types/enrollments/enrollment-summary.types';
import { getStatusColor, getStatusLabel } from '../utils/enrollmentsUtils';

import { EnrollmentStatus } from '../../../types/disciplines/disciplines.enums';
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


  interface DisciplineCardProps {
    selection: DisciplineSelection;
  }

  const getPacketTooltipMessage = (packet: EnrollmentPacketSummary) => {
    const selectedCount = packet.selections.length;
    const maxChoices = packet.packet.maxChoices;
  
    // Fix the type for 's' in this filter
    const allConfirmed = packet.selections.every(
      (s: DisciplineSelection) => s.status === EnrollmentStatus.CONFIRMED
    );
    
    const pendingSelections = packet.selections.filter(
      (s: DisciplineSelection) => s.status === EnrollmentStatus.PENDING
    ).length;
    
    const waitlistedSelections = packet.selections.filter(
      (s: DisciplineSelection) => s.status === EnrollmentStatus.WAITLIST
    ).length;

    let message = `This packet allows ${maxChoices} selection${
      maxChoices > 1 ? 's' : ''
    }.`;
    
    message += ` You have selected ${selectedCount} discipline${
      selectedCount !== 1 ? 's' : ''
    }.`;

    if (allConfirmed) {
      message += ' All your selections have been confirmed.';
    } else if (pendingSelections > 0) {
      message += ` ${pendingSelections} selection${pendingSelections !== 1 ? 's are' : ' is'} pending approval.`;
    } else if (waitlistedSelections > 0) {
      message += ` You are on the waitlist for ${waitlistedSelections} selection${waitlistedSelections !== 1 ? 's' : ''}.`;
    }

    if (packet.packet.description) {
      message += `\n\nAbout this packet: ${packet.packet.description}`;
    }

    return message;
  };

  const getStatusIcon = (status: EnrollmentStatus) => {
    switch (status) {
      case EnrollmentStatus.CONFIRMED:
        return <CheckCircleOutline />;
      case EnrollmentStatus.PENDING:
        return <HourglassTop />;
      case EnrollmentStatus.WAITLIST:
        return <WarningAmber />;
      case EnrollmentStatus.REJECTED:
        return <ErrorOutline />;
      default:
        return <InfoOutlined />;
    }
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
          title: 'Enrollment Confirmed'
        };
      case EnrollmentStatus.PENDING:
        return {
          message: `Your enrollment request with ${pendingCount} discipline${
            pendingCount !== 1 ? 's' : ''
          } is being processed. This typically takes 2-3 business days. You'll receive a notification when results are available.`,
          icon: <HourglassTop />,
          color: theme.palette.warning.main,
          title: 'Processing Enrollment'
        };
      case EnrollmentStatus.WAITLIST:
        return {
          message: `You are on the waitlist for ${waitlistedCount} discipline${
            waitlistedCount !== 1 ? 's' : ''
          }. If spaces become available, you'll be automatically enrolled based on your priority order.`,
          icon: <WarningAmber />,
          color: theme.palette.info.main,
          title: 'On Waitlist'
        };
      case EnrollmentStatus.REJECTED:
        return {
          message:
            'Your enrollment request could not be processed. Please contact Student Services for assistance and to discuss alternative options.',
          icon: <ErrorOutline />,
          color: theme.palette.error.main,
          title: 'Enrollment Unsuccessful'
        };
      default:
        return {
          message: '',
          icon: <InfoOutlined />,
          color: theme.palette.grey[500],
          title: 'Status Unknown'
        };
    }
  };

  const specialization = getSpecializationInfo(enrollment, student);

  const DisciplineCard: FC<DisciplineCardProps> = ({ selection }) => {
    const statusColor = getStatusColor(selection.status, theme);
    
    return (
      <Paper
        elevation={0}
        sx={{
          bgcolor: alpha(
            statusColor.main,
            selection.status === EnrollmentStatus.CONFIRMED ? 0.05 : 0.02
          ),
          borderRadius: 1.5,
          border: `1px solid ${
            alpha(statusColor.main, 
              selection.status === EnrollmentStatus.CONFIRMED ? 0.2 : 0.1
            )
          }`,
          overflow: 'hidden',
          transition: 'all 0.2s ease',
          '&:hover': {
            bgcolor: alpha(statusColor.main, 0.07),
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Stack spacing={1.5}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={2}
            >
              <Stack spacing={0.5} sx={{ flex: 1 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, lineHeight: 1.3 }}
                >
                  {selection.name}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography
                    variant="caption"
                    sx={{
                      px: 1,
                      py: 0.25,
                      borderRadius: 0.75,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      fontFamily: 'monospace',
                      fontWeight: 500,
                    }}
                  >
                    {selection.code}
                  </Typography>
                  <Tooltip 
                    title={`This is your priority ${selection.priority} choice for this packet. ${
                      selection.priority === 1 
                        ? "This is your top preference." 
                        : "Higher priority (lower number) selections are considered first."
                    }`} 
                    arrow
                  >
                    <Chip
                      label={`Priority ${selection.priority}`}
                      size="small"
                      color={selection.priority === 1 ? 'success' : 'default'}
                      sx={{
                        height: 20,
                        '& .MuiChip-label': {
                          px: 1,
                          fontSize: '0.75rem',
                          fontWeight: 500,
                        },
                      }}
                    />
                  </Tooltip>
                </Stack>
              </Stack>
              <Tooltip 
                title={`Status: ${getStatusLabel(selection.status)}${
                  selection.status === EnrollmentStatus.PENDING 
                    ? " - Your selection is being processed"
                    : selection.status === EnrollmentStatus.WAITLIST
                    ? " - You'll be enrolled if a spot becomes available"
                    : selection.status === EnrollmentStatus.CONFIRMED
                    ? " - You've been successfully enrolled"
                    : selection.status === EnrollmentStatus.REJECTED
                    ? " - Your selection couldn't be processed"
                    : ""
                }`}
                arrow
              >
                <Chip
                  label={getStatusLabel(selection.status)}
                  size="small"
                  icon={getStatusIcon(selection.status)}
                  sx={{
                    height: 20,
                    bgcolor: alpha(statusColor.main, 0.1),
                    color: statusColor.main,
                    '& .MuiChip-label': {
                      px: 0.5,
                      fontSize: '0.75rem',
                      fontWeight: 600,
                    },
                    '& .MuiChip-icon': {
                      fontSize: '0.875rem',
                      ml: 0.5,
                      mr: -0.25,
                    },
                  }}
                />
              </Tooltip>
            </Stack>

            {selection.teacher && (
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                  p: 1,
                  bgcolor: alpha(theme.palette.background.paper, 0.5),
                  borderRadius: 1,
                  minHeight: 32,
                }}
              >
                <Person
                  sx={{
                    fontSize: '0.875rem',
                    color: theme.palette.primary.main,
                  }}
                />
                <Typography variant="body2" sx={{ fontSize: '0.8125rem' }}>
                  {`${selection.teacher.academicTitle.abbreviation} ${selection.teacher.firstName} ${selection.teacher.lastName}`}
                </Typography>
              </Stack>
            )}
          </Stack>
        </Box>
      </Paper>
    );
  };

  const formatSubmissionTime = (date: Date) =>
    new Date(date).toLocaleString(undefined, {
      dateStyle: 'long',
      timeStyle: 'short',
    });

  const Content = () => {
    const statusInfo = getEnrollmentStatusMessage();

    return (
      <Stack sx={{ height: '100%' }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 2.5 }, // Slightly more compact
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
            <Stack spacing={1.5}> {/* Reduced spacing */}
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

              {/* Academic Information with Minimalist Layout */}
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
                      {`${enrollment.enrollmentPeriod.academicYear} • Y${enrollment.enrollmentPeriod.yearOfStudy}/S${enrollment.enrollmentPeriod.semester}`}
                    </Typography>
                  </Stack>

                  {specialization && (
                    <Chip
                      label={specialization}
                      size="small"
                      color="primary"
                      icon={<School sx={{ fontSize: '0.875rem' }} />}
                      sx={{
                        height: 24,
                        px: 0.25,
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

                {/* Minimalist Time Display */}
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
                        <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
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
                            backgroundColor: alpha(theme.palette.primary.main, 0.08),
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
                      <DisciplineCard
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
          height: '85vh', // Reduced from 90vh to be less tall
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
          maxHeight: '85vh', // Reduced from 90vh to be less tall
        },
      }}
    >
      <Content />
    </Dialog>
  );
};