import {
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import { CalendarToday, Close, School } from '@mui/icons-material';

import { EnrollmentPeriod } from '../../../../types/disciplines/disciplines.types';
import { FC } from 'react';
import { formatDate } from '../../../../utils/dateUtils';

interface ConfirmationHeaderProps {
  enrollmentPeriod: EnrollmentPeriod;
  onClose: () => void;
  isSubmitting: boolean;
}

export const ConfirmationHeader: FC<ConfirmationHeaderProps> = ({
  enrollmentPeriod,
  onClose,
  isSubmitting,
}) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        position: 'sticky',
        top: 0,
        bgcolor: 'transparent',
        zIndex: 1,
      }}
    >
      <Stack spacing={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <School color="primary" sx={{ fontSize: 28 }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Confirm Enrollment
              </Typography>
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{ mt: 0.5 }}
              >
                <CalendarToday
                  sx={{ fontSize: '0.875rem', color: 'text.secondary' }}
                />
                <Typography variant="body2" color="text.secondary">
                  {enrollmentPeriod.academicYear} - Semester{' '}
                  {enrollmentPeriod.semester}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    px: 1,
                    py: 0.25,
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                    color: theme.palette.primary.main,
                    borderRadius: 1,
                    fontWeight: 500,
                  }}
                >
                  Deadline: {formatDate(enrollmentPeriod.endDate)}
                </Typography>
              </Stack>
            </Box>
          </Stack>
          <IconButton
            onClick={onClose}
            disabled={isSubmitting}
            sx={{ color: 'text.secondary' }}
            aria-label="Close confirmation dialog"
          >
            <Close />
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  );
};
