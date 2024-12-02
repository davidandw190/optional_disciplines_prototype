import { Grid, Paper, Stack, Typography } from '@mui/material';

import { EnrollmentPeriod } from '../../../../types/disciplines/disciplines.types';
import { EnrollmentPeriodCard } from '../cards/EnrollmentPeriodCard';
import { FC } from 'react';

interface EnrollmentsSectionProps {
  enrollments: EnrollmentPeriod[];
}

export const EnrollmentsSection: FC<EnrollmentsSectionProps> = ({ enrollments }) => (
  <Grid item xs={12} lg={8}>
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3 },
        borderRadius: 2,
        bgcolor: 'background.paper',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack spacing={2.5}>
        <Typography variant="subtitle1" fontWeight={600}>
          Active & Upcoming Enrollments
        </Typography>
        {enrollments.map((period, index) => (
          <EnrollmentPeriodCard key={index} period={period} />
        ))}
      </Stack>
    </Paper>
  </Grid>
);