import { AccessTime, Close, School } from '@mui/icons-material';
import {
  Chip,
  IconButton,
  Paper,
  Stack,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';

import { EnrollmentSummary } from '../../../../types/enrollments/enrollment-summary.types';
import { FC } from 'react';
import { formatSubmissionTime } from '../utils/utils';

export interface EnrollmentHeaderProps {
  enrollment: EnrollmentSummary;
  specialization: string | null;
  onClose: () => void;
}

export const EnrollmentHeader: FC<EnrollmentHeaderProps> = ({
  enrollment,
  specialization,
  onClose,
}) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderBottom: '1px solid',
        borderColor: 'divider',
        position: 'sticky',
        top: 0,
        bgcolor: theme.palette.background.paper,
        zIndex: 1,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={2}
      >
        <Stack spacing={1.5}>
          {/* Title */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
            }}
          >
            {enrollment.enrollmentPeriod.type.split('_').join(' ')}
          </Typography>

          {/* Academic Information */}
          <Stack spacing={1}>
            {/* Academic Period Info */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              spacing={{ xs: 0.5, sm: 2 }}
              sx={{ mb: { xs: 0.5, sm: 0 } }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <School
                  sx={{
                    fontSize: '1rem',
                    color: theme.palette.primary.main,
                  }}
                />
                <Typography
                  variant="subtitle2"
                  sx={{ color: theme.palette.text.primary }}
                >
                  {`${enrollment.enrollmentPeriod.academicYear} • Y${enrollment.enrollmentPeriod.yearOfStudy}/S${enrollment.enrollmentPeriod.semester}`}
                </Typography>
              </Stack>

              {specialization && (
                <Chip
                  label={specialization}
                  size="small"
                  color="primary"
                  icon={<School sx={{ fontSize: '0.875rem' }} />}
                  sx={{
                    height: 24,
                    px: 0.25,
                    '& .MuiChip-label': {
                      px: 0.75,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                    },
                    '& .MuiChip-icon': {
                      ml: 0.5,
                      mr: -0.25,
                    },
                  }}
                />
              )}
            </Stack>

            {/* Time Display */}
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.text.secondary,
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
              }}
            >
              <AccessTime sx={{ fontSize: '0.875rem' }} />
              {formatSubmissionTime(enrollment.enrollmentDate)}
            </Typography>
          </Stack>
        </Stack>

        {/* Close button */}
        <IconButton
          onClick={onClose}
          size="small"
          aria-label="Close details"
          sx={{
            '&:hover': {
              bgcolor: alpha(theme.palette.primary.main, 0.05),
            },
          }}
        >
          <Close />
        </IconButton>
      </Stack>
    </Paper>
  );
};
