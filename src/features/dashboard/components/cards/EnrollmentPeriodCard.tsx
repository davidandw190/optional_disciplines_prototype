import {
  AccessTime,
  AutoStories,
  BookOutlined,
  MenuBook,
  School,
} from '@mui/icons-material';
import { Box, Chip, Paper, Stack, Typography, alpha } from '@mui/material';
import {
  getEnrollmentPeriodStatus,
  getRemainingDays,
  isEnrollmentAccessible,
} from '../../../mocks/enrollment-periods.mock';

import { EnrollmentPeriod } from '../../../../types/disciplines/disciplines.types';
import { EnrollmentPeriodType } from '../../../../types/disciplines/disciplines.enums';
import { FC } from 'react';
import { completedEnrollmentsUtils } from '../../../../utils/enrollmentUtils';
import { formatDate } from '../../../../utils/dateUtils';
import { showToast } from '../../../../utils/toastUtils';
import { useNavigate } from 'react-router-dom';

interface EnrollmentPeriodCardProps {
  period: EnrollmentPeriod;
}

type StatusConfig = {
  color: string;
  text: string;
  chipColor:
    | 'success'
    | 'warning'
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info';
  badge: string;
};

export const EnrollmentPeriodCard: FC<EnrollmentPeriodCardProps> = ({
  period,
}) => {
  const navigate = useNavigate();
  const status = getEnrollmentPeriodStatus(period);
  const remainingDays = getRemainingDays(period);

  const isCompleted = completedEnrollmentsUtils.isEnrollmentCompleted(
    period.id
  );
  const isAccessible = isEnrollmentAccessible(period) && !isCompleted;

  const getStatusConfig = (): StatusConfig => {
    // If enrollment is completed, show that status regardless of time-based status
    if (isCompleted) {
      return {
        color: 'success.main',
        text: 'COMPLETED',
        chipColor: 'success',
        badge: 'Enrolled',
      };
    }

    switch (status) {
      case 'active':
        return {
          color: 'success.main',
          text: 'ACTIVE',
          chipColor: 'success',
          badge: 'Active',
        };
      case 'upcoming':
        return {
          color: 'warning.main',
          text: 'UPCOMING',
          chipColor: 'warning',
          badge: 'Opens Soon',
        };
      case 'ended':
        return {
          color: 'text.disabled',
          text: 'ENDED',
          chipColor: 'default',
          badge: 'Closed',
        };
      default:
        return {
          color: 'text.disabled',
          text: 'UNKNOWN',
          chipColor: 'default',
          badge: 'Unknown Status',
        };
    }
  };

  const statusConfig = getStatusConfig();

  const getEnrollmentIcon = () => {
    switch (period.type) {
      case EnrollmentPeriodType.ELECTIVE_DISCIPLINES:
        return <BookOutlined fontSize="small" />;
      case EnrollmentPeriodType.COMPLEMENTARY_DISCIPLINES:
        return <MenuBook fontSize="small" />;
      case EnrollmentPeriodType.THESIS_REGISTRATION:
        return <AutoStories fontSize="small" />;
      default:
        return <School fontSize="small" />;
    }
  };

  const handleClick = () => {
    if (!isAccessible) {
      if (isCompleted) {
        showToast.info(
          `You have already completed enrollment for ${period.type.replace(
            '_',
            ' '
          )}`
        );
      } else if (status === 'upcoming') {
        showToast.info(
          `${period.type.replace('_', ' ')} enrollment starts on ${formatDate(
            period.startDate
          )}`
        );
      } else if (status === 'ended') {
        showToast.warning(
          `${period.type.replace('_', ' ')} enrollment has already ended`
        );
      }
      return;
    }

    switch (period.type) {
      case EnrollmentPeriodType.ELECTIVE_DISCIPLINES:
        navigate(`/enrollment-periods/${period.id}/elective-disciplines`);
        break;
      case EnrollmentPeriodType.COMPLEMENTARY_DISCIPLINES:
        navigate(`/enrollment-periods/${period.id}/complementary-disciplines`);
        break;
      case EnrollmentPeriodType.THESIS_REGISTRATION:
        navigate(`/enrollment-periods/${period.id}/thesis-registration`);
        break;
    }
  };

  return (
    <Paper
      elevation={0}
      onClick={handleClick}
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 2,
        border: '1px solid',
        borderColor: isCompleted
          ? 'success.light'
          : status === 'ended'
          ? 'grey.200'
          : 'divider',
        cursor: isAccessible ? 'pointer' : 'default',
        opacity: status === 'ended' ? 0.7 : 1,
        background: isCompleted
          ? (theme) => alpha(theme.palette.success.light, 0.05)
          : status === 'ended'
          ? 'grey.50'
          : 'background.paper',
        transition: 'all 0.2s ease-in-out',
        position: 'relative',
        '&:hover': isAccessible
          ? {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
              borderColor: 'primary.main',
              transform: 'translateY(-2px)',
            }
          : {},
      }}
    >
      <Chip
        label={statusConfig.badge}
        size="small"
        color={statusConfig.chipColor}
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          height: 24,
          fontWeight: 600,
          fontSize: '0.75rem',
          px: 1,
          boxShadow: 1,
        }}
      />

      <Stack spacing={2}>
        {/* Header Section */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              p: 1.25,
              borderRadius: 1.5,
              bgcolor: (theme) =>
                isCompleted
                  ? alpha(theme.palette.success.main, 0.1)
                  : status === 'ended'
                  ? alpha(theme.palette.grey[500], 0.1)
                  : alpha(theme.palette.primary.main, 0.1),
              color: isCompleted
                ? 'success.main'
                : status === 'ended'
                ? 'text.disabled'
                : 'primary.main',
            }}
          >
            {getEnrollmentIcon()}
          </Box>

          <Stack spacing={0.5}>
            <Typography
              variant="body1"
              fontWeight={600}
              color={
                isCompleted
                  ? 'success.main'
                  : status === 'ended'
                  ? 'text.disabled'
                  : 'text.primary'
              }
            >
              {period.type.replace('_', ' ')}
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTime
                sx={{
                  fontSize: 14,
                  color: isCompleted
                    ? 'success.main'
                    : status === 'ended'
                    ? 'text.disabled'
                    : 'text.secondary',
                }}
              />
              <Typography
                variant="caption"
                color={
                  isCompleted
                    ? 'success.main'
                    : status === 'ended'
                    ? 'text.disabled'
                    : 'text.secondary'
                }
              >
                {formatDate(period.startDate)} - {formatDate(period.endDate)}
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        {/* Active Period Info */}
        {status === 'active' && !isCompleted && (
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={500}
            >
              Time Remaining
            </Typography>
            <Chip
              label={`${remainingDays} days left`}
              size="small"
              color={remainingDays <= 3 ? 'warning' : 'default'}
              sx={{ height: 24 }}
            />
          </Stack>
        )}

        {/* Footer Info */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="caption"
            color={
              isCompleted
                ? 'success.main'
                : status === 'ended'
                ? 'text.disabled'
                : 'text.secondary'
            }
          >
            {period.packets.length} packet
            {period.packets.length !== 1 ? 's' : ''} available
          </Typography>

          {isAccessible && (
            <Typography variant="caption" color="primary" fontWeight={500}>
              Click to view details
            </Typography>
          )}

          {isCompleted && (
            <Typography variant="caption" color="success.main" fontWeight={500}>
              Enrollment submitted
            </Typography>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
};
