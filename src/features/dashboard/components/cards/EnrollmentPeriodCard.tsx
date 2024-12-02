import {
  AutoStories,
  BookOutlined,
  MenuBook,
  MoreVert,
} from '@mui/icons-material';
import {
  Box,
  Chip,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import { EnrollmentPeriod } from '../../../../types/disciplines/disciplines.types';
import { EnrollmentPeriodType } from '../../../../types/disciplines/disciplines.enums';
import { FC } from 'react';

export const EnrollmentPeriodCard: FC<{ period: EnrollmentPeriod }> = ({
  period,
}) => (
  <Paper
    elevation={0}
    sx={{
      p: { xs: 2, sm: 2.5 },
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'divider',
      '&:hover': {
        bgcolor: 'action.hover',
        borderColor: 'primary.main',
      },
      transition: 'all 0.15s ease',
    }}
  >
    <Stack spacing={2.5}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              p: 1.25,
              borderRadius: 1.5,
              bgcolor: 'primary.main',
              color: 'white',
            }}
          >
            {period.type === EnrollmentPeriodType.ELECTIVE_DISCIPLINES && (
              <BookOutlined fontSize="small" />
            )}
            {period.type === EnrollmentPeriodType.COMPLEMENTARY_DISCIPLINES && (
              <MenuBook fontSize="small" />
            )}
            {period.type === EnrollmentPeriodType.THESIS_REGISTRATION && (
              <AutoStories fontSize="small" />
            )}
          </Box>
          <Box>
            <Typography variant="body1" fontWeight={600}>
              {period.type}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              {period.startDate} - {period.endDate}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1.5} alignItems="center">
          <Chip
            label={period.status.toUpperCase()}
            size="small"
            sx={{
              bgcolor: period.status === 'active' ? '#00C853' : '#e60054',
              color: 'white',
              px: 1,
              height: 24,
              fontSize: '0.75rem',
              fontWeight: 500,
            }}
          />
          <IconButton size="small">
            <MoreVert fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      {period.progress !== undefined && (
        <Box sx={{ width: '100%' }}>
          <Box sx={{ mb: 0.75 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={500}
            >
              Progress
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={period.progress}
            sx={{
              height: 6,
              borderRadius: 3,
              bgcolor: 'grey.100',
              '& .MuiLinearProgress-bar': {
                borderRadius: 3,
              },
            }}
          />
        </Box>
      )}
    </Stack>
  </Paper>
);
