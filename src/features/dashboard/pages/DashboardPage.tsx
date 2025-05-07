import { Box, Grid, Typography } from '@mui/material';
import { FC, useEffect } from 'react';

import { AnnouncementsSection } from '../components/sections/AnnouncementsSection';
import { EnrollmentsSection } from '../components/sections/EnrollmentsSection';
import { QuickActionsSection } from '../components/sections/QuickActionsSection';
import { mockQuickActions } from '../../mocks/dashboard.mock';
import { useAuth } from '../../../contexts/auth.context';
import { useGetEligibleEnrollmentPeriodsQuery } from '../../../api/enrollmentPeriods/enrollmentPeriodsApi';
import { useStudent } from '../../../contexts/student.context';

const DashboardPage: FC = () => {
  const { isAuthenticated } = useAuth();
  const {
    student,
    isLoading: isLoadingStudent,
    error: studentError,
  } = useStudent();

  const {
    data: enrollmentPeriods,
    error: enrollmentError,
    isLoading: isLoadingEnrollments,
    refetch: refetchEnrollmentPeriods,
  } = useGetEligibleEnrollmentPeriodsQuery(
    {
      yearOfStudy: student?.yearOfStudy ?? 1,
      semester: student?.semester ?? 1,
      specialization: student?.specialization ?? '',
    },
    {
      skip: !isAuthenticated || !student,
      refetchOnMountOrArgChange: true,
    }
  );

  // we refetch when authentication state changes
  useEffect(() => {
    if (isAuthenticated && student) {
      refetchEnrollmentPeriods();
    }
  }, [isAuthenticated, student, refetchEnrollmentPeriods]);

  return (
    <Box
      component="main"
      sx={{
        position: 'relative',
        width: '100%',
        height: '90%',
        mx: 'auto',
        mt: '-30px',
      }}
    >
      <Box
        sx={{
          p: { xs: 3, sm: 5, md: 7 },
          pt: { xs: 7, sm: 6, md: 7 },
          px: { xs: 2 },
          maxWidth: '1900px',
          width: '100%',
          mx: 'auto',
        }}
      >
        <Typography
          variant="h4"
          color="primary.main"
          sx={{
            mb: { xs: 3, md: 4 },
            fontWeight: 600,
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
          }}
        >
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          <EnrollmentsSection
            enrollmentPeriods={enrollmentPeriods}
            isLoading={isLoadingStudent || isLoadingEnrollments}
            error={studentError || enrollmentError}
          />
          <QuickActionsSection actions={mockQuickActions} />
        </Grid>

        <AnnouncementsSection />
      </Box>
    </Box>
  );
};

export default DashboardPage;
