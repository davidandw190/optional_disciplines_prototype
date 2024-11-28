import { Box, Grid, Paper, Typography } from '@mui/material';

import { FC } from 'react';

const DashboardPage: FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Current Enrollments</Typography>
            {/* TODO: To be implemented */}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Upcoming Deadlines</Typography>
            {/* TODO: To be implemented */}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Quick Actions</Typography>
            {/* TODO: To be implemented */}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;