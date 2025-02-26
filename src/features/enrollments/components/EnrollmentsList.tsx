import {
  Alert,
  AlertTitle,
  Button,
  Grid,
  Skeleton,
  Stack,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import { Refresh, School } from '@mui/icons-material';

import { EmptyStateContainer } from '../styles/enrollment-styles';
import { EnrollmentPeriodType } from '../../../types/disciplines/disciplines.enums';
import { EnrollmentSummary } from '../../../types/enrollments/enrollment-summary.types';
import { EnrollmentSummaryCard } from './EnrollmentSummaryCard';
import { FC } from 'react';
import { useStudent } from '../../../contexts/student.context';

interface EnrollmentsListProps {
  enrollments: EnrollmentSummary[];
  type: EnrollmentPeriodType;
  isLoading: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export const EnrollmentsList: FC<EnrollmentsListProps> = ({
  enrollments,
  type,
  isLoading,
  error,
  onRetry,
}) => {
  const theme = useTheme();
  const { student } = useStudent();

  if (!student) {
    return (
      <Alert severity="warning" sx={{ my: 2 }}>
        <AlertTitle>Student information unavailable</AlertTitle>
        Please log in again or contact student services if this issue persists.
      </Alert>
    );
  }

  // Error state
  if (error) {
    return (
      <Alert 
        severity="error" 
        sx={{ 
          mb: 2,
          alignItems: 'flex-start',
        }}
        action={
          onRetry && (
            <Button 
              color="error" 
              size="small" 
              startIcon={<Refresh />}
              onClick={onRetry}
              sx={{ mt: 0.5 }}
            >
              Retry
            </Button>
          )
        }
      >
        <AlertTitle>Error loading enrollments</AlertTitle>
        {error}
      </Alert>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <Grid container spacing={3}>
        {[1, 2].map((item) => (
          <Grid item xs={12} md={6} key={item}>
            <Stack
              sx={{
                p: 2.5,
                height: '100%',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                bgcolor: 'background.paper',
              }}
              spacing={2}
            >
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
              <Skeleton
                variant="rectangular"
                width="100%"
                height={48}
                sx={{
                  borderRadius: 1,
                  mt: 'auto',
                }}
              />
            </Stack>
          </Grid>
        ))}
      </Grid>
    );
  }

  // No enrollments found
  if (enrollments.length === 0) {
    return (
      <EmptyStateContainer
        spacing={3}
        alignItems="center"
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
      </EmptyStateContainer>
    );
  }

  // Display enrollments
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