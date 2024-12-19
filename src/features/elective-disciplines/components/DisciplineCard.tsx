// DisciplineCard.tsx
import {
  AccessTime,
  AssignmentTurnedIn,
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
import {
  Discipline,
  DisciplinePacket,
} from '../../../types/disciplines/disciplines.types';
import { FC, memo } from 'react';

interface DisciplineCardProps {
  discipline: Discipline;
  packet: DisciplinePacket;
  onViewDetails: () => void;
  isEnrollmentPeriodActive: boolean;
  isSelected: boolean;
  selectionCount?: number;
}

export const DisciplineCard: FC<DisciplineCardProps> = memo(
  ({
    discipline,
    packet,
    onViewDetails,
    isEnrollmentPeriodActive,
    isSelected,
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
          overflow: 'visible', // this allows for hover effects to extend beyond card
        }}
      >
        <CardContent
          sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}
        >
          <Stack spacing={2.5}>
            {/* packet badge */}
            <Chip
              size="small"
              label={packet.name}
              color="primary"
              sx={{
                alignSelf: 'flex-start',
                fontWeight: 500,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                border: 'none',
              }}
            />

            {/* title section */}
            <Stack spacing={1}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, lineHeight: 1.3 }}
              >
                {name}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontFamily: 'monospace',
                  bgcolor: alpha(theme.palette.text.primary, 0.05),
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  display: 'inline-block',
                  width: 'fit-content',
                }}
              >
                {code}
              </Typography>
            </Stack>

            {/* info chips */}
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
              <Tooltip title="Credits">
                <Chip
                  size="small"
                  icon={<Grade sx={{ fontSize: '1rem' }} />}
                  label={`${credits} credits`}
                  color={getStatusColor()}
                  variant={isSelected ? 'filled' : 'outlined'}
                />
              </Tooltip>
              <Tooltip title="Teaching Language">
                <Chip
                  size="small"
                  icon={<Language sx={{ fontSize: '1rem' }} />}
                  label={language}
                  variant="outlined"
                />
              </Tooltip>
              <Tooltip title="Weekly Hours">
                <Chip
                  size="small"
                  icon={<AccessTime sx={{ fontSize: '1rem' }} />}
                  label={`${weeklyHours.total}h/week`}
                  variant="outlined"
                />
              </Tooltip>
              <Tooltip title="Assessment Type">
                <Chip
                  size="small"
                  icon={<AssignmentTurnedIn sx={{ fontSize: '1rem' }} />}
                  label={assessmentType.toLowerCase()}
                  variant="outlined"
                />
              </Tooltip>
            </Stack>

            {/* enrollment progress */}
            <Box sx={{ mt: 'auto', pt: 2 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Typography
                  variant="caption"
                  color={getStatusColor()}
                  fontWeight={500}
                >
                  {currentEnrollmentCount} / {maxEnrollmentSpots} spots
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
                  height: 6,
                  borderRadius: 3,
                  bgcolor: alpha(theme.palette.grey[500], 0.1),
                  '.MuiLinearProgress-bar': {
                    borderRadius: 3,
                  },
                }}
              />
            </Box>

            {/* action button */}
            <Button
              fullWidth
              variant={isSelected ? 'contained' : 'outlined'}
              color={getStatusColor()}
              onClick={onViewDetails}
              sx={{
                mt: 2,
                textTransform: 'none',
                fontWeight: 500,
                height: 40,
                borderRadius: theme.shape.borderRadius,
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
