import {
  AccessTime,
  CalendarToday,
  CheckCircleOutline,
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
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { EnrollmentStatus } from '../../../types/disciplines/disciplines.enums';
import { EnrollmentSummary } from '../../../types/enrollments/enrollment-summary.types';
import { FC } from 'react';
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
    bgcolor: alpha(theme.palette.background.paper, 0.98),
    backdropFilter: 'blur(20px)',
  };

  const formatSubmissionTime = (date: Date) => {
    return new Date(date).toLocaleString('en-GB', {
      dateStyle: 'long',
      timeStyle: 'short',
    });
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
        return {
          message: `You have been successfully enrolled in ${confirmedCount} discipline${
            confirmedCount !== 1 ? 's' : ''
          }.`,
          icon: <CheckCircleOutline />,
          color: theme.palette.success.main,
        };
      case EnrollmentStatus.PENDING:
        return {
          message:
            'Your enrollment request is currently being processed. You will receive a notification when the results are available.',
          icon: <AccessTime />,
          color: theme.palette.warning.main,
        };
      case EnrollmentStatus.WAITLIST:
        return {
          message:
            'You are on the waitlist. Should a spot become available, you will be automatically notified and enrolled based on your priority.',
          icon: <Info />,
          color: theme.palette.info.main,
        };
      case EnrollmentStatus.REJECTED:
        return {
          message:
            'Your enrollment request was not successful. Please contact the academic office for detailed information and available alternatives.',
          icon: <Info />,
          color: theme.palette.error.main,
        };
      default:
        return {
          message: '',
          icon: <Info />,
          color: theme.palette.grey[500],
        };
    }
  };

  const DisciplineCard = ({ selection }) => (
    <Paper
      elevation={0}
      sx={{
        bgcolor: alpha(
          selection.status === EnrollmentStatus.CONFIRMED
            ? theme.palette.success.main
            : theme.palette.background.paper,
          selection.status === EnrollmentStatus.CONFIRMED ? 0.04 : 0.6
        ),
        borderRadius: 1.5,
        border: `1px solid ${
          selection.status === EnrollmentStatus.CONFIRMED
            ? theme.palette.success.main
            : alpha(theme.palette.divider, 0.1)
        }`,
        overflow: 'hidden',
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
              </Stack>
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
                color: getStatusColor(selection.status, theme).main,
                '& .MuiChip-label': {
                  px: 1,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                },
              }}
            />
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

  const Content = () => {
    const statusInfo = getEnrollmentStatusMessage();

    return (
      <Stack sx={{ height: '100%' }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 3 },
            borderBottom: '1px solid',
            borderColor: 'divider',
            position: 'sticky',
            top: 0,
            bgcolor: 'background.paper',
            zIndex: 1,
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Stack spacing={1}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.primary.main,
                }}
              >
                {enrollment.enrollmentPeriod.type.split('_').join(' ')}
              </Typography>

              {/* Academic period and submission time */}
              <Stack
                direction="row"
                spacing={3}
                flexWrap="wrap"
                useFlexGap
                alignItems="center"
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <School
                    sx={{
                      fontSize: '1rem',
                      color: theme.palette.primary.main,
                    }}
                  />
                  <Typography variant="subtitle2">
                    {enrollment.enrollmentPeriod.academicYear} • Year{' '}
                    {enrollment.enrollmentPeriod.yearOfStudy}, Semester{' '}
                    {enrollment.enrollmentPeriod.semester}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <AccessTime
                    sx={{
                      fontSize: '1rem',
                      color: theme.palette.text.secondary,
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Submitted {formatSubmissionTime(enrollment.enrollmentDate)}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>

            <IconButton
              onClick={onClose}
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
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
              bgcolor: alpha(statusInfo.color, 0.08),
              borderRadius: 2,
              border: `1px solid ${alpha(statusInfo.color, 0.2)}`,
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  color: statusInfo.color,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {statusInfo.icon}
              </Box>
              <Stack spacing={0.5} sx={{ flex: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {enrollment.status}
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
          </Paper>{' '}
        </Paper>

        {/* Packets and Selections */}
        <Box sx={{ flex: 1, overflow: 'auto', p: { xs: 2.5, sm: 3 } }}>
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
                    <Chip
                      label={`${packet.selections.length}/${packet.packet.maxChoices} Selected`}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
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