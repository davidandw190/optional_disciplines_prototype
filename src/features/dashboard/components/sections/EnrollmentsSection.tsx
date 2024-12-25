import { Grid, Paper, Stack, Typography } from '@mui/material';

import { EnrollmentPeriod } from '../../../../types/disciplines/disciplines.types';
import { EnrollmentPeriodCard } from '../cards/EnrollmentPeriodCard';
import { FC } from 'react';
import { getEnrollmentPeriodStatus } from '../../../mocks/enrollment-periods.mock';

interface EnrollmentsSectionProps {
  enrollments: EnrollmentPeriod[];
}

type EnrollmentStatus = 'active' | 'upcoming' | 'ended';

const statusOrder: Record<EnrollmentStatus, number> = {
  active: 0,
  upcoming: 1,
  ended: 2,
};

export const EnrollmentsSection: FC<EnrollmentsSectionProps> = ({
  enrollments,
}) => {
  const sortedEnrollments = [...enrollments].sort((a, b) => {
    const statusA = getEnrollmentPeriodStatus(a) as EnrollmentStatus;
    const statusB = getEnrollmentPeriodStatus(b) as EnrollmentStatus;

    return statusOrder[statusA] - statusOrder[statusB];
  });

  return (
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
          border: '1px solid',
          borderColor: 'divider',
          maxWidth: '100%',
          mx: 'auto'
        }}
      >
        <Stack spacing={3}>
          {/* Section Header */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="h6"
              fontWeight={600}
              color="primary"
              sx={{
                letterSpacing: '0.02em',
                fontSize: { xs: '1rem', sm: '1.125rem' },
              }}
            >
              Enrollment Periods
            </Typography>
            {sortedEnrollments.some(
              (e) => getEnrollmentPeriodStatus(e) === 'active'
            ) && (
              <Typography
                variant="caption"
                color="success.main"
                fontWeight={500}
              >
                Active periods available
              </Typography>
            )}
          </Stack>

          {/* Enrollment Cards List */}
          <Stack spacing={2}>
            {sortedEnrollments.map((period) => (
              <EnrollmentPeriodCard key={period.id} period={period} />
            ))}

            {/* Empty State */}
            {sortedEnrollments.length === 0 && (
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
                sx={{ py: 4 }}
              >
                No enrollment periods available at this time
              </Typography>
            )}
          </Stack>
        </Stack>
      </Paper>
    </Grid>
  );
};
