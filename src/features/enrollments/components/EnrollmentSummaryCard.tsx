import {
  Box,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import {
  CalendarMonth,
  ChevronRight,
  InfoOutlined,
  School,
} from '@mui/icons-material';
import { EnrollmentCard, StatusChip } from '../styles/enrollment-styles';
import { FC, useState } from 'react';
import {
  formatDate,
  getStatusColor,
  getStatusLabel,
} from '../utils/enrollmentsUtils';

import { EnrollmentDetailsModal } from './EnrollmentDetailsModal';
import { EnrollmentStatus } from '../../../types/disciplines/disciplines.enums';
import { EnrollmentSummary } from '../../../types/enrollments/enrollment-summary.types';
import { Student } from '../../../types/student/student.types';

interface EnrollmentSummaryCardProps {
  enrollment: EnrollmentSummary;
  student: Student;
}

export const EnrollmentSummaryCard: FC<EnrollmentSummaryCardProps> = ({
  enrollment,
  student,
}) => {
  const theme = useTheme();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const totalSelections = enrollment.packets.reduce(
    (total, packet) => total + packet.selections.length,
    0
  );

  const statusColor = getStatusColor(enrollment.status, theme);
  const isPending = enrollment.status === EnrollmentStatus.PENDING;

  const specialization =
    enrollment.enrollmentPeriod.targetSpecializations?.includes(
      student.specialization
    )
      ? student.specialization
      : enrollment.enrollmentPeriod.targetSpecializations?.includes(
          'All Specializations'
        )
      ? student.specialization
      : null;

  return (
    <>
      <EnrollmentCard
        elevation={0}
        onClick={() => setIsDetailsOpen(true)}
        sx={{
          '&:hover': {
            borderColor: isPending
              ? theme.palette.warning.main
              : theme.palette.primary.main,
            transform: 'translateY(-2px)',
            boxShadow: `0 4px 12px ${alpha(
              isPending
                ? theme.palette.warning.main
                : theme.palette.primary.main,
              0.08
            )}`,
          },
        }}
      >
        <Stack spacing={2} sx={{ height: '100%' }}>
          {/* Status and action area */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Tooltip
              title={`Status: ${getStatusLabel(enrollment.status)}${
                enrollment.status === EnrollmentStatus.PENDING
                  ? ' - Your enrollment is being processed'
                  : enrollment.status === EnrollmentStatus.WAITLIST
                  ? " - You'll be enrolled if spots become available"
                  : enrollment.status === EnrollmentStatus.CONFIRMED
                  ? ' - Your enrollment has been confirmed'
                  : enrollment.status === EnrollmentStatus.REJECTED
                  ? ' - Contact student services for assistance'
                  : ''
              }`}
              arrow
              placement="top"
            >
              <StatusChip color={statusColor.main}>
                {getStatusLabel(enrollment.status)}
              </StatusChip>
            </Tooltip>
            <Tooltip title="View details" arrow>
              <IconButton
                size="small"
                color="primary"
                aria-label="View enrollment details"
                sx={{
                  bgcolor: alpha(
                    isPending
                      ? theme.palette.warning.main
                      : theme.palette.primary.main,
                    0.04
                  ),
                  transition: theme.transitions.create('background-color', {
                    duration: 200,
                  }),
                  '&:hover': {
                    bgcolor: alpha(
                      isPending
                        ? theme.palette.warning.main
                        : theme.palette.primary.main,
                      0.08
                    ),
                  },
                }}
              >
                <ChevronRight />
              </IconButton>
            </Tooltip>
          </Stack>

          {/* Main content */}
          <Stack spacing={1} sx={{ flex: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                lineHeight: 1.4,
              }}
            >
              {`Semester ${enrollment.enrollmentPeriod.semester}`}
            </Typography>

            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              <Stack direction="row" spacing={1} alignItems="center">
                <School
                  sx={{ fontSize: '0.875rem', color: 'text.secondary' }}
                />
                <Typography variant="body2" color="text.secondary">
                  Year {enrollment.enrollmentPeriod.yearOfStudy}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <CalendarMonth
                  sx={{ fontSize: '0.875rem', color: 'text.secondary' }}
                />
                <Typography variant="body2" color="text.secondary">
                  {formatDate(enrollment.enrollmentDate)}
                </Typography>
              </Stack>

              {specialization && (
                <Tooltip title={`Your specialization: ${specialization}`} arrow>
                  <Chip
                    label={specialization}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                      color: theme.palette.primary.main,
                      border: `1px solid ${alpha(
                        theme.palette.primary.main,
                        0.2
                      )}`,
                    }}
                  />
                </Tooltip>
              )}
            </Stack>
          </Stack>

          {/* Summary footer */}
          <Box
            sx={{
              p: 1.5,
              bgcolor: alpha(
                isPending
                  ? theme.palette.warning.main
                  : theme.palette.primary.main,
                0.04
              ),
              borderRadius: 1,
              mt: 'auto',
              transition: theme.transitions.create('background-color', {
                duration: 200,
              }),
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: 500 }}
              >
                {totalSelections} discipline{totalSelections !== 1 ? 's' : ''}{' '}
                across {enrollment.packets.length} packet
                {enrollment.packets.length !== 1 ? 's' : ''}
              </Typography>

              <Tooltip
                title="Click to view detailed enrollment information"
                arrow
              >
                <InfoOutlined
                  sx={{
                    fontSize: '0.875rem',
                    color: 'text.secondary',
                    opacity: 0.7,
                    '&:hover': { opacity: 1 },
                  }}
                />
              </Tooltip>
            </Stack>
          </Box>
        </Stack>
      </EnrollmentCard>

      <EnrollmentDetailsModal
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        enrollment={enrollment}
        student={student}
      />
    </>
  );
};
