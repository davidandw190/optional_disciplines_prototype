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
};

export const EnrollmentPeriodCard: FC<EnrollmentPeriodCardProps> = ({
  period,
}) => {
  const navigate = useNavigate();
  const status = getEnrollmentPeriodStatus(period);
  const remainingDays = getRemainingDays(period);
  const isAccessible = isEnrollmentAccessible(period);

  const getStatusConfig = (): StatusConfig => {
    switch (status) {
      case 'active':
        return {
          color: 'success.main',
          text: 'ACTIVE',
          chipColor: 'success',
        };
      case 'upcoming':
        return {
          color: 'warning.main',
          text: 'UPCOMING',
          chipColor: 'warning',
        };
      case 'ended':
        return {
          color: 'text.disabled',
          text: 'ENDED',
          chipColor: 'default',
        };
      default:
        return {
          color: 'text.disabled',
          text: 'UNKNOWN',
          chipColor: 'default',
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
    if (!isAccessible) return;

    switch (period.type) {
      case EnrollmentPeriodType.ELECTIVE_DISCIPLINES:
        navigate(`/enrollment-periods/${period.id}/elective-disciplines`);
        break;
      case EnrollmentPeriodType.COMPLEMENTARY_DISCIPLINES:
        navigate(
          `/enrollment-periods/${period.id}/complementary-disciplines`
        );
        break;
      case EnrollmentPeriodType.THESIS_REGISTRATION:
        navigate(`/enrollment-periods/${period.id}/thesis-registration`);
        break;
    }
  };

  // console.log(period.type)

  return (
    <Paper
      elevation={0}
      onClick={handleClick}
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 2,
        border: '1px solid',
        borderColor: status === 'ended' ? 'grey.200' : 'divider',
        cursor: isAccessible ? 'pointer' : 'default',
        opacity: status === 'ended' ? 0.7 : 1,
        background: status === 'ended' ? 'grey.50' : 'background.paper',
        transition: 'all 0.2s ease-in-out',
        '&:hover': isAccessible
          ? {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
              borderColor: 'primary.main',
              transform: 'translateY(-2px)',
            }
          : {},
      }}
    >
      <Stack spacing={2}>
        {/* Header Section */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          {/* Period Info */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                p: 1.25,
                borderRadius: 1.5,
                bgcolor: (theme) =>
                  status === 'ended'
                    ? alpha(theme.palette.grey[500], 0.1)
                    : alpha(theme.palette.primary.main, 0.1),
                color: status === 'ended' ? 'text.disabled' : 'primary.main',
              }}
            >
              {getEnrollmentIcon()}
            </Box>

            <Stack spacing={0.5}>
              <Typography
                variant="body1"
                fontWeight={600}
                color={status === 'ended' ? 'text.disabled' : 'text.primary'}
              >
                {period.type}
              </Typography>

              <Stack direction="row" spacing={1} alignItems="center">
                <AccessTime
                  sx={{
                    fontSize: 14,
                    color:
                      status === 'ended' ? 'text.disabled' : 'text.secondary',
                  }}
                />
                <Typography
                  variant="caption"
                  color={
                    status === 'ended' ? 'text.disabled' : 'text.secondary'
                  }
                >
                  {new Date(period.startDate).toLocaleDateString()} -{' '}
                  {new Date(period.endDate).toLocaleDateString()}
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          {/* Right Side - Status */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              label={statusConfig.text}
              size="small"
              color={statusConfig.chipColor}
              sx={{
                height: 24,
                fontSize: '0.75rem',
                fontWeight: 500,
              }}
            />
          </Stack>
        </Stack>

        {/* Active Period Info */}
        {status === 'active' && (
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
            color={status === 'ended' ? 'text.disabled' : 'text.secondary'}
          >
            {period.packets.length} packet
            {period.packets.length !== 1 ? 's' : ''} available
          </Typography>

          {isAccessible && (
            <Typography variant="caption" color="primary" fontWeight={500}>
              Click to view details
            </Typography>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
};
