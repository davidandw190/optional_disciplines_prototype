import {
  AccessTime,
  AssignmentTurnedIn,
  Grade,
  Language,
  ViewModule
} from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Tooltip,
  Typography,
  alpha,
} from '@mui/material';
import { Discipline, DisciplinePacket } from '../../../types/disciplines/disciplines.types';
import { FC, memo } from 'react';

interface DisciplineCardProps {
  discipline: Discipline;
  packet: DisciplinePacket;
  onViewDetails: () => void;
  isEnrollmentPeriodActive: boolean;
  isSelected: boolean;
  selectionCount?: number;
}

export const DisciplineCard: FC<DisciplineCardProps> = memo(({
  discipline,
  packet,
  onViewDetails,
  isEnrollmentPeriodActive,
  isSelected,
  selectionCount = 0,
}) => {
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

  // Calculate enrollment statistics
  const enrollmentPercentage = maxEnrollmentSpots 
    ? (currentEnrollmentCount / maxEnrollmentSpots) * 100 
    : 0;

  // Get appropriate status colors
  const getStatusColor = () => {
    if (isSelected) return 'success';
    if (enrollmentPercentage >= 100) return 'error';
    if (enrollmentPercentage >= 80) return 'warning';
    return 'primary';
  };

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          borderColor: `${getStatusColor()}.main`,
          transform: 'translateY(-2px)',
          boxShadow: (theme) => `0 4px 20px ${alpha(theme.palette.primary.main, 0.15)}`,
        },
      }}
    >
      <Box sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Stack spacing={2}>
          {/* Packet Information */}
          <Chip
            icon={<ViewModule fontSize="small" />}
            label={packet.name}
            size="small"
            color="primary"
            sx={{ alignSelf: 'flex-start' }}
          />

          {/* Discipline Title and Code */}
          <Stack spacing={0.5}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {name}
            </Typography>
            <Typography
              variant="caption"
              sx={{ 
                fontFamily: 'monospace',
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                px: 1,
                py: 0.5,
                borderRadius: 1,
                display: 'inline-block'
              }}
            >
              {code}
            </Typography>
          </Stack>

          {/* Information Chips */}
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Tooltip title="Credits">
              <Chip
                size="small"
                icon={<Grade sx={{ fontSize: '1rem' }} />}
                label={`${credits} credits`}
                color={getStatusColor()}
                variant={isSelected ? "filled" : "outlined"}
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

          {/* Enrollment Progress */}
          <Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 1 }}
            >
              <Typography variant="caption" color={getStatusColor()}>
                {currentEnrollmentCount} / {maxEnrollmentSpots} spots
              </Typography>
              <Typography variant="caption" color={getStatusColor()}>
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
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.1),
              }}
            />
          </Box>

          {/* Action Button */}
          <Button
            fullWidth
            variant={isSelected ? "contained" : "outlined"}
            color={getStatusColor()}
            onClick={onViewDetails}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              height: 40,
              borderRadius: 2,
            }}
          >
            {isSelected 
              ? `Selected (Priority ${selectionCount})` 
              : isEnrollmentPeriodActive 
                ? 'View Details' 
                : 'View Discipline'}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
});