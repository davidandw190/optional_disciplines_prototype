import {
  AccessTime,
  AssignmentTurnedIn,
  CalendarToday,
  Grade,
  Language,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import { FC, memo } from 'react';

import { Discipline } from '../../../types/disciplines/disciplines.types';

interface ComplementaryDisciplineCardProps {
  discipline: Discipline;
  onViewDetails: () => void;
  isEnrollmentPeriodActive: boolean;
  isSelected?: boolean;
  selectionCount?: number;
}

export const ComplementaryDisciplineCard: FC<ComplementaryDisciplineCardProps> =
  memo(
    ({
      discipline,
      onViewDetails,
      isEnrollmentPeriodActive,
      isSelected = false,
      selectionCount = 0,
    }) => {
      const theme = useTheme();
      const {
        name,
        code,
        credits,
        language,
        assessmentType,
        weeklyHours,
        maxEnrollmentSpots,
        currentEnrollmentCount = 0,
        semester,
        yearOfStudy,
      } = discipline;

      const enrollmentPercentage = maxEnrollmentSpots
        ? (currentEnrollmentCount / maxEnrollmentSpots) * 100
        : 0;

      const getStatusColor = () => {
        if (isSelected) return 'success';
        if (enrollmentPercentage >= 100) return 'error';
        if (enrollmentPercentage >= 80) return 'warning';
        return 'primary';
      };

      return (
        <Card
          elevation={0}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'visible',
            border: '1px solid',
            borderColor: 'divider',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              borderColor: `${getStatusColor()}.main`,
              transform: 'translateY(-2px)',
              boxShadow: (theme) =>
                `0 4px 20px ${alpha(theme.palette.primary.main, 0.15)}`,
            },
          }}
        >
          <CardContent
            sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}
          >
            <Stack spacing={2}>
              {/* Header with Code and Semester */}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: 'monospace',
                    bgcolor: alpha(theme.palette.text.primary, 0.05),
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    fontWeight: 500,
                  }}
                >
                  {code}
                </Typography>
                <Tooltip title="Semester & Year">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CalendarToday
                      sx={{ fontSize: '0.875rem', color: 'text.secondary' }}
                    />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontWeight: 500 }}
                    >
                      S{semester}/Y{yearOfStudy}
                    </Typography>
                  </Box>
                </Tooltip>
              </Stack>

              {/* Title */}
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  lineHeight: 1.3,
                  minHeight: 42,
                }}
              >
                {name}
              </Typography>

              {/* Core Info Chips */}
              <Stack
                direction="row"
                spacing={0.5}
                flexWrap="wrap"
                useFlexGap
                sx={{ gap: 0.5 }}
              >
                <Tooltip title="Credits">
                  <Chip
                    size="small"
                    icon={<Grade sx={{ fontSize: '0.875rem' }} />}
                    label={`${credits} credits`}
                    color={getStatusColor()}
                    variant={isSelected ? 'filled' : 'outlined'}
                    sx={{ height: 24 }}
                  />
                </Tooltip>
                <Tooltip title="Teaching Language">
                  <Chip
                    size="small"
                    icon={<Language sx={{ fontSize: '0.875rem' }} />}
                    label={language}
                    variant="outlined"
                    sx={{ height: 24 }}
                  />
                </Tooltip>
                <Tooltip title="Weekly Hours">
                  <Chip
                    size="small"
                    icon={<AccessTime sx={{ fontSize: '0.875rem' }} />}
                    label={`${weeklyHours.total}h`}
                    variant="outlined"
                    sx={{ height: 24 }}
                  />
                </Tooltip>
                <Tooltip title="Assessment Type">
                  <Chip
                    size="small"
                    icon={<AssignmentTurnedIn sx={{ fontSize: '0.875rem' }} />}
                    label={assessmentType.toLowerCase()}
                    variant="outlined"
                    sx={{ height: 24 }}
                  />
                </Tooltip>
              </Stack>

              {/* Enrollment Progress */}
              <Box sx={{ mt: 'auto', pt: 1 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 0.5 }}
                >
                  <Typography
                    variant="caption"
                    color={getStatusColor()}
                    fontWeight={500}
                  >
                    {currentEnrollmentCount}/{maxEnrollmentSpots} enrolled
                  </Typography>
                  <Typography
                    variant="caption"
                    color={getStatusColor()}
                    fontWeight={500}
                  >
                    {Math.round(enrollmentPercentage)}%
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={enrollmentPercentage}
                  color={getStatusColor()}
                  sx={{
                    height: 4,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.grey[500], 0.1),
                    '.MuiLinearProgress-bar': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Box>

              {/* Action Button */}
              <Button
                fullWidth
                variant={isSelected ? 'contained' : 'outlined'}
                color={getStatusColor()}
                onClick={onViewDetails}
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  height: 36,
                  borderRadius: theme.shape.borderRadius,
                  mt: 1,
                }}
              >
                {isSelected
                  ? `Selected (Priority ${selectionCount})`
                  : isEnrollmentPeriodActive
                  ? 'View Details'
                  : 'View Discipline'}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      );
    }
  );
