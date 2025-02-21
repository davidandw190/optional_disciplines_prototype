import { AccessTime, ChevronRight, School } from '@mui/icons-material';
import {
  Box,
  Card,
  Chip,
  IconButton,
  Stack,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import { FC, useState } from 'react';

import { EnrollmentDetailsModal } from './EnrollmentDetailsModal';
import { EnrollmentSummary } from '../../../types/enrollments/enrollment-summary.types';
import { Student } from '../../../types/student/student.types';
import { getStatusColor } from '../utils/enrollmentsUtils';

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
      <Card
        elevation={0}
        sx={{
          p: 2.5,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          transition: 'all 0.2s ease-in-out',
          cursor: 'pointer',
          '&:hover': {
            borderColor: theme.palette.primary.main,
            transform: 'translateY(-2px)',
            boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.08)}`,
          },
        }}
        onClick={() => setIsDetailsOpen(true)}
      >
        <Stack spacing={2} sx={{ height: '100%' }}>
          {/* Status and action area */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Chip
              label={enrollment.status}
              size="small"
              sx={{
                bgcolor: alpha(statusColor.main, 0.1),
                color: statusColor.main,
                fontWeight: 500,
                px: 1,
              }}
            />
            <IconButton
              size="small"
              color="primary"
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.04),
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              <ChevronRight />
            </IconButton>
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
                <AccessTime
                  sx={{ fontSize: '0.875rem', color: 'text.secondary' }}
                />
                <Typography variant="body2" color="text.secondary">
                  {new Date(enrollment.enrollmentDate).toLocaleDateString()}
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
      </Card>

      <EnrollmentDetailsModal
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        enrollment={enrollment}
        student={student}
      />
    </>
  );
};
