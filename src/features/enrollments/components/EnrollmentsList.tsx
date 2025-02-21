import {
  Box,
  Grid,
  Skeleton,
  Stack,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';

import { EnrollmentPeriodType } from '../../../types/disciplines/disciplines.enums';
import { EnrollmentSummary } from '../../../types/enrollments/enrollment-summary.types';
import { EnrollmentSummaryCard } from './EnrollmentSummaryCard';
import { FC } from 'react';
import { School } from '@mui/icons-material';
import { useStudent } from '../../../contexts/student.context';

interface EnrollmentsListProps {
  enrollments: EnrollmentSummary[];
  type: EnrollmentPeriodType;
  isLoading: boolean;
}

export const EnrollmentsList: FC<EnrollmentsListProps> = ({
  enrollments,
  type,
  isLoading,
}) => {
  const theme = useTheme();
  const { student } = useStudent();
  if (!student) {
    return null;
  }

  const LoadingSkeleton = () => (
    <Grid container spacing={3}>
      {[1, 2].map((item) => (
        <Grid item xs={12} md={6} key={item}>
          <Box
            sx={{
              p: 2.5,
              height: '100%',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              bgcolor: 'background.paper',
            }}
          >
            <Stack spacing={2}>
              {/* Header skeleton */}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Skeleton
                  variant="rectangular"
                  width={100}
                  height={24}
                  sx={{ borderRadius: 1 }}
                />
                <Skeleton variant="circular" width={32} height={32} />
              </Stack>

              {/* Content skeleton */}
              <Stack spacing={1}>
                <Skeleton variant="text" width="60%" height={24} />
                <Stack direction="row" spacing={2}>
                  <Skeleton variant="text" width={120} />
                  <Skeleton variant="text" width={100} />
                </Stack>
              </Stack>

              {/* Summary footer skeleton */}
              <Box sx={{ mt: 'auto' }}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={48}
                  sx={{
                    borderRadius: 1,
                    bgcolor: alpha(theme.palette.primary.main, 0.04),
                  }}
                />
              </Box>
            </Stack>
          </Box>
        </Grid>
      ))}
    </Grid>
  );

  // No enrollments found
  if (!isLoading && enrollments.length === 0) {
    return (
      <Stack
        spacing={3}
        alignItems="center"
        sx={{
          py: 8,
          px: 3,
          textAlign: 'center',
          color: 'text.secondary',
          bgcolor: alpha(theme.palette.primary.main, 0.04),
          borderRadius: 2,
        }}
      >
        <School
          sx={{
            fontSize: 48,
            color: alpha(theme.palette.primary.main, 0.5),
          }}
        />
        <Stack spacing={1} sx={{ maxWidth: 500 }}>
          <Typography
            variant="h6"
            color="text.primary"
            sx={{ fontWeight: 600 }}
          >
            No Enrollments Found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {type === EnrollmentPeriodType.ELECTIVE_DISCIPLINES &&
              "You haven't participated in any elective discipline enrollments yet. When enrollment periods are active, you can select optional courses that align with your academic interests."}
            {type === EnrollmentPeriodType.COMPLEMENTARY_DISCIPLINES &&
              "You haven't enrolled in any complementary disciplines yet. These courses offer opportunities to broaden your academic knowledge beyond your main field of study."}
            {type === EnrollmentPeriodType.THESIS_REGISTRATION &&
              "You haven't registered for thesis supervision yet. When the registration period opens, you'll be able to select your thesis topic and supervisor."}
          </Typography>
        </Stack>
      </Stack>
    );
  }

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <Grid
      container
      spacing={3}
      sx={{
        minHeight: 400,
        alignContent: 'flex-start',
      }}
    >
      {enrollments.map((enrollment) => (
        <Grid
          item
          xs={12}
          md={6}
          key={enrollment.id}
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <EnrollmentSummaryCard enrollment={enrollment} student={student} />
        </Grid>
      ))}
    </Grid>
  );
};
