// src/features/dashboard/components/cards/EnrollmentPeriodCard.tsx

import {
  AccessTime,
  AutoStories,
  BookOutlined,
  CalendarToday,
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
  Tooltip,
  Typography,
  alpha,
} from '@mui/material';
import { getEnrollmentPeriodStatus, getRemainingDays, isEnrollmentAccessible } from '../../../mocks/enrollment-periods.mock';

import { EnrollmentPeriod } from '../../../../types/disciplines/disciplines.types';
import { EnrollmentPeriodType } from '../../../../types/disciplines/disciplines.enums';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface EnrollmentPeriodCardProps {
  period: EnrollmentPeriod;
}

export const EnrollmentPeriodCard: FC<EnrollmentPeriodCardProps> = ({ period }) => {
  const navigate = useNavigate();
  const status = getEnrollmentPeriodStatus(period);
  const remainingDays = getRemainingDays(period);
  const isAccessible = isEnrollmentAccessible(period);

  // Determine the appropriate status color and text
  const getStatusConfig = () => {
    switch (status) {
      case 'active':
        return { color: '#00C853', text: 'ACTIVE' };
      case 'upcoming':
        return { color: '#FF9800', text: 'UPCOMING' };
      case 'ended':
        return { color: '#E0E0E0', text: 'ENDED' };
      default:
        return { color: '#E0E0E0', text: 'UNKNOWN' };
    }
  };

  // Get the appropriate icon for the enrollment type
  const getEnrollmentIcon = () => {
    switch (period.type) {
      case EnrollmentPeriodType.ELECTIVE_DISCIPLINES:
        return <BookOutlined fontSize="small" />;
      case EnrollmentPeriodType.COMPLEMENTARY_DISCIPLINES:
        return <MenuBook fontSize="small" />;
      case EnrollmentPeriodType.THESIS_REGISTRATION:
        return <AutoStories fontSize="small" />;
      default:
        return <CalendarToday fontSize="small" />;
    }
  };

  // Handle navigation to the enrollment page
  const handleClick = () => {
    if (isAccessible) {
      switch (period.type) {
        case EnrollmentPeriodType.ELECTIVE_DISCIPLINES:
          navigate(`/elective-disciplines/${period.id}`);
          break;
        case EnrollmentPeriodType.COMPLEMENTARY_DISCIPLINES:
          navigate(`/complementary-disciplines/${period.id}`);
          break;
        case EnrollmentPeriodType.THESIS_REGISTRATION:
          navigate(`/thesis-registration/${period.id}`);
          break;
      }
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <Paper
      elevation={0}
      onClick={handleClick}
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        cursor: isAccessible ? 'pointer' : 'default',
        '&:hover': isAccessible
          ? {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
              borderColor: 'primary.main',
              transform: 'translateY(-2px)',
              transition: 'all 0.2s ease-in-out',
            }
          : {},
      }}
    >
      <Stack spacing={2.5}>
        {/* Header Section */}
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
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                color: 'primary.main',
              }}
            >
              {getEnrollmentIcon()}
            </Box>

            <Box>
              <Typography variant="body1" fontWeight={600}>
                {period.type}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <AccessTime sx={{ fontSize: 14, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary">
                  {new Date(period.startDate).toLocaleDateString()} -{' '}
                  {new Date(period.endDate).toLocaleDateString()}
                </Typography>
              </Stack>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1.5} alignItems="center">
            <Tooltip title={`Status: ${statusConfig.text}`}>
              <Chip
                label={statusConfig.text}
                size="small"
                sx={{
                  bgcolor: statusConfig.color,
                  color: 'white',
                  px: 1,
                  height: 24,
                  fontSize: '0.75rem',
                  fontWeight: 500,
                }}
              />
            </Tooltip>
            <IconButton size="small">
              <MoreVert fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>

        {/* Progress Section */}
        {status === 'active' && (
          <Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 1 }}
            >
              <Typography variant="caption" color="text.secondary" fontWeight={500}>
                Time Remaining
              </Typography>
              <Typography
                variant="caption"
                color={remainingDays <= 3 ? 'warning.main' : 'text.secondary'}
                fontWeight={600}
              >
                {remainingDays} days left
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={((period.endDate.getTime() - Date.now()) / 
                     (period.endDate.getTime() - period.startDate.getTime())) * 100}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.1),
                '& .MuiLinearProgress-bar': {
                  borderRadius: 3,
                },
              }}
            />
          </Box>
        )}

        {/* Additional Information */}
        {period.packets && (
          <Typography variant="caption" color="text.secondary">
            {period.packets.length} packet{period.packets.length !== 1 ? 's' : ''} available
          </Typography>
        )}
      </Stack>
    </Paper>
  );
};