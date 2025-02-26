import {
  AccessTime,
  CalendarMonth,
  ChevronRight,
  School
} from '@mui/icons-material';
import {
  Box,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  alpha,
  useTheme
} from '@mui/material';
import { EnrollmentCard, StatusChip } from '../styles/enrollment-styles';
import { FC, useState } from 'react';
import { formatDate, getStatusColor, getStatusLabel } from '../utils/enrollmentsUtils';

import { EnrollmentDetailsModal } from './EnrollmentDetailsModal';
import { EnrollmentSummary } from '../../../types/enrollments/enrollment-summary.types';
import { Student } from '../../../types/student/student.types';

interface EnrollmentSummaryCardProps {
  enrollment: EnrollmentSummary;
  student: Student;
}

export const EnrollmentSummaryCard: FC<EnrollmentSummaryCardProps> = ({
  enrollment,
  student
}) => {
  const theme = useTheme();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const totalSelections = enrollment.packets.reduce(
    (total, packet) => total + packet.selections.length,
    0
  );

  const statusColor = getStatusColor(enrollment.status, theme);

  return (
    <>
      <EnrollmentCard
        elevation={0}
        onClick={() => setIsDetailsOpen(true)}
      >
        <Stack spacing={2} sx={{ height: '100%' }}>
          {/* Status and action area */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Tooltip 
              title={`Status: ${getStatusLabel(enrollment.status)}`} 
              arrow
              placement="top"
            >
              <StatusChip
                color={statusColor.main}
              >
                {getStatusLabel(enrollment.status)}
              </StatusChip>
            </Tooltip>
            <Tooltip title="View details" arrow>
              <IconButton
                size="small"
                color="primary"
                aria-label="View enrollment details"
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.04),
                  transition: theme.transitions.create('background-color', {
                    duration: 200,
                  }),
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
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

            <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap>
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
            </Stack>
          </Stack>

          {/* Summary footer */}
          <Box
            sx={{
              p: 1.5,
              bgcolor: alpha(theme.palette.primary.main, 0.04),
              borderRadius: 1,
              mt: 'auto',
              transition: theme.transitions.create('background-color', {
                duration: 200,
              }),
            }}
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