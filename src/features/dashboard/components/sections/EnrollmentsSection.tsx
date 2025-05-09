import { Grid, Paper, Skeleton, Stack, Typography } from '@mui/material';

import { EnrollmentPeriod } from '../../../../types/disciplines/disciplines.types';
import { EnrollmentPeriodCard } from '../cards/EnrollmentPeriodCard';
import { EnrollmentPeriodStatus } from '../../../../types/enrollments/enrollment-selection.types';
import { FC } from 'react';
import { completedEnrollmentsUtils } from '../../../../utils/enrollmentUtils';
import { getEnrollmentPeriodStatus } from '../../../mocks/enrollment-periods.mock';

interface EnrollmentsSectionProps {
  enrollmentPeriods: EnrollmentPeriod[] | undefined;
  isLoading?: boolean;
  error?: any;
}

const statusOrder: Record<EnrollmentPeriodStatus, number> = {
  ACTIVE: 0,
  UPCOMING: 1,
  ENDED: 2,
};

export const EnrollmentsSection: FC<EnrollmentsSectionProps> = ({
  enrollmentPeriods,
  isLoading,
  error,
}) => {
  const sortedEnrollmentPeriods = enrollmentPeriods
    ? [...enrollmentPeriods].sort((a, b) => {
        const isACompleted = completedEnrollmentsUtils.isEnrollmentCompleted(
          a.id
        );
        const isBCompleted = completedEnrollmentsUtils.isEnrollmentCompleted(
          b.id
        );

        if (isACompleted && !isBCompleted) return 1;
        if (!isACompleted && isBCompleted) return -1;

        const statusA = getEnrollmentPeriodStatus(a) as EnrollmentPeriodStatus;
        const statusB = getEnrollmentPeriodStatus(b) as EnrollmentPeriodStatus;
        return statusOrder[statusA] - statusOrder[statusB];
      })
    : [];

  const hasActiveEnrollments = sortedEnrollmentPeriods.some(
    (e) =>
      getEnrollmentPeriodStatus(e) === 'active' &&
      !completedEnrollmentsUtils.isEnrollmentCompleted(e.id)
  );

  return (
    <Grid item xs={12} lg={8}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3 },
          borderRadius: 2,
          bgcolor: 'background.paper',
          minHeight: 400,
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid',
          borderColor: 'divider',
          maxWidth: '100%',
          mx: 'auto',
        }}
      >
        <Stack spacing={3} sx={{ height: '100%', width: '100%' }}>
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
            {hasActiveEnrollments && (
              <Typography
                variant="caption"
                color="success.main"
                fontWeight={500}
              >
                Active periods available
              </Typography>
            )}
          </Stack>

          {/* Content Area */}
          <Stack spacing={2} sx={{ flexGrow: 1 }}>
            {isLoading ? (
              // temp loading skeletons
              Array.from(new Array(3)).map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  height={120}
                  sx={{ borderRadius: 2 }}
                />
              ))
            ) : error ? (
              // error state
              <Typography
                variant="body2"
                color="error"
                textAlign="center"
                sx={{ py: 4 }}
              >
                Unable to load enrollment periods. Please try again later.
              </Typography>
            ) : sortedEnrollmentPeriods.length > 0 ? (
              // enrollment cards
              sortedEnrollmentPeriods.map((period) => (
                <EnrollmentPeriodCard key={period.id} period={period} />
              ))
            ) : (
              // empty state
              <Stack
                spacing={2}
                alignItems="center"
                justifyContent="center"
                sx={{ py: 8, flexGrow: 1 }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  No enrollment periods available at this time
                </Typography>
                <Typography variant="caption" color="text.disabled">
                  Check back later for upcoming enrollment periods
                </Typography>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Paper>
    </Grid>
  );
};
