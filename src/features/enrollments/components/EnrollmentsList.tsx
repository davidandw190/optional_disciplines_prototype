import { Box, Grid, Stack, Typography, alpha, useTheme } from '@mui/material';

import { EnrollmentPeriodType } from '../../../types/disciplines/disciplines.enums';
import { EnrollmentSummary } from '../../../types/enrollments/enrollment-summary.types';
import { EnrollmentSummaryCard } from './EnrollmentSummaryCard';
import { FC } from 'react';

interface EnrollmentsListProps {
  enrollments: EnrollmentSummary[];
  type: EnrollmentPeriodType;
}

export const EnrollmentsList: FC<EnrollmentsListProps> = ({
  enrollments,
  type,
}) => {
  const theme = useTheme();

  if (enrollments.length === 0) {
    return (
      <Stack
        spacing={2}
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
        <Box
          component="img"
          src="/assets/illustrations/empty-state.svg"
          alt="No enrollments"
          sx={{ width: 200, height: 'auto', opacity: 0.5 }}
        />
        <Typography>
          You haven't participated in any {type.toLowerCase().replace('_', ' ')}{' '}
          enrollment periods yet.
        </Typography>
      </Stack>
    );
  }

  return (
    <Grid container spacing={3}>
      {enrollments.map((enrollment) => (
        <Grid item xs={12} md={6} key={enrollment.id}>
          <EnrollmentSummaryCard enrollment={enrollment} />
        </Grid>
      ))}
    </Grid>
  );
};
