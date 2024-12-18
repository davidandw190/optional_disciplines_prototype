import { Box, Grid, Typography } from '@mui/material';
import { mockAnnouncements, mockQuickActions } from '../../mocks/dashboard.mock';

import { AnnouncementsSection } from '../components/sections/AnnouncementsSection';
import { EnrollmentsSection } from '../components/sections/EnrollmentsSection';
import { FC } from 'react';
import { QuickActionsSection } from '../components/sections/QuickActionsSection';
import { mockEnrollmentPeriods } from '../../mocks/enrollment-periods.mock';

const DashboardPage: FC = () => {
  return (
    <Box sx={{ p: { xs: 3, sm: 4, md: 5 }, maxWidth: '1920px', mx: 'auto' }}>
      <Typography
        variant="h4"
        color="primary.main"
        sx={{
          mb: { xs: 3, md: 4 },
          fontWeight: 700,
          fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
        }}
      >
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <EnrollmentsSection enrollments={mockEnrollmentPeriods} />
        <QuickActionsSection actions={mockQuickActions} />
      </Grid>

      <AnnouncementsSection announcements={mockAnnouncements} />
    </Box>
  );
};

export default DashboardPage;
