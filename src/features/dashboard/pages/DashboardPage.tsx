import { Box, Grid, Typography } from '@mui/material';

import { AnnouncementsSection } from '../components/sections/AnnouncementsSection';
import { EnrollmentsSection } from '../components/sections/EnrollmentsSection';
import { FC } from 'react';
import { QuickActionsSection } from '../components/sections/QuickActionsSection';
import { mockEnrollmentPeriods } from '../../mocks/enrollment-periods.mock';
import { mockQuickActions } from '../../mocks/dashboard.mock';
import { mockStudent } from '../../mocks/student.mock';
import { useGetEligibleEnrollmentPeriodsQuery } from '../../../api/enrollmentPeriods/enrollmentPeriodsApi';
import { useStudent } from '../../../contexts/student.context';

const DashboardPage: FC = () => {
  const { student, isLoading: isLoadingStudent, error: studentError } = useStudent();

  // const {
  //   data: enrollmentPeriods,
  //   error: enrollmentError,
  //   isLoading: isLoadingEnrollments,
  // } = useGetEligibleEnrollmentPeriodsQuery({
  //   yearOfStudy: student?.yearOfStudy ?? 1,
  //   semester: student?.semester ?? 1,
  //   specialization: student?.specialization ?? '',
  // });

  // This is temporary
  const enrollmentPeriods = mockEnrollmentPeriods;

  return (
    <Box
      sx={{
        p: { xs: 3, sm: 4, md: 7 },
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
          fontWeight: 800,
          fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
        }}
      >
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/*<EnrollmentsSection
          enrollmentPeriods={enrollmentPeriods}
          isLoading={isLoadingStudent || isLoadingEnrollments}
          error={studentError || enrollmentError}
        />*/}
        <EnrollmentsSection
          enrollmentPeriods={enrollmentPeriods}
          isLoading={isLoadingStudent}
          error={studentError}
        />
        <QuickActionsSection actions={mockQuickActions} />
      </Grid>

      <AnnouncementsSection />
    </Box>
  );
};

export default DashboardPage;
