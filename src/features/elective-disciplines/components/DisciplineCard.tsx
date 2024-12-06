import {
  AccessTime,
  AccountTree,
  AssignmentTurnedIn,
  BookOutlined,
  Grade,
  Group,
  Language,
  School,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Tooltip,
  Typography,
  alpha,
} from '@mui/material';
import { Discipline, Teacher } from '../../../types/disciplines/disciplines.types';
import { FC, memo } from 'react';

import { TeachingActivityType } from '../../../types/disciplines/disciplines.enums';

// Interface for the component's props
interface DisciplineCardProps {
  discipline: Discipline;
  onViewDetails: (discipline: Discipline) => void;
  isEnrollmentPeriodActive?: boolean;
  alreadyEnrolled?: boolean;
}

// Helper function to format teacher names with their academic titles
const formatTeacherName = (teacher: Teacher): string => {
  return `${teacher.academicTitle.abbreviation}. ${teacher.lastName}`;
};

// Helper function to get activity icon based on type
const getActivityIcon = (type: TeachingActivityType) => {
  const icons = {
    [TeachingActivityType.COURSE]: <BookOutlined fontSize="small" />,
    [TeachingActivityType.SEMINAR]: <Group fontSize="small" />,
    [TeachingActivityType.LABORATORY]: <AccountTree fontSize="small" />,
    [TeachingActivityType.PROJECT]: <Grade fontSize="small" />,
  };
  return icons[type];
};

export const DisciplineCard: FC<DisciplineCardProps> = memo(({
  discipline,
  onViewDetails,
  isEnrollmentPeriodActive = false,
  alreadyEnrolled = false,
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

  const enrollmentPercentage = maxEnrollmentSpots 
    ? (currentEnrollmentCount / maxEnrollmentSpots) * 100 
    : 0;

  const getStatusColor = () => {
    if (alreadyEnrolled) return 'success';
    if (enrollmentPercentage >= 100) return 'error';
    if (enrollmentPercentage >= 80) return 'warning';
    return 'primary';
  };

  const getEnrollmentColor = () => {
    if (enrollmentPercentage >= 100) return 'error';
    if (enrollmentPercentage >= 80) return 'warning';
    return 'success';
  };

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Paper
        elevation={0}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            borderColor: `${getStatusColor()}.main`,
            transform: 'translateY(-2px)',
            boxShadow: (theme) => `0 4px 20px ${alpha(theme.palette.primary.main, 0.15)}`,
          },
          overflow: 'hidden',
        }}
      >
        <Box sx={{ p: 2.5 }}>
          <Stack spacing={2}>
            {/* Header */}
            <Stack spacing={0.5}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  lineHeight: 1.3,
                  minHeight: '2.6em',
                }}
              >
                {name}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography
                  variant="caption"
                  sx={{ 
                    fontFamily: 'monospace', 
                    fontWeight: 500,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                  }}
                >
                  {code}
                </Typography>
                <Chip
                  size="small"
                  label={language}
                  icon={<Language sx={{ fontSize: '0.9rem' }} />}
                  variant="outlined"
                  sx={{ height: 24 }}
                />
              </Box>
            </Stack>

            {/* Core Info */}
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Tooltip title="Credits">
                <Chip
                  size="small"
                  icon={<Grade sx={{ fontSize: '1rem' }} />}
                  label={`${credits} credits`}
                  color={getStatusColor()}
                  variant={alreadyEnrolled ? "filled" : "outlined"}
                  sx={{ height: 28 }}
                />
              </Tooltip>
              <Tooltip title="Assessment Type">
                <Chip
                  size="small"
                  icon={<AssignmentTurnedIn sx={{ fontSize: '1rem' }} />}
                  label={assessmentType.toLowerCase()}
                  variant="outlined"
                  sx={{ height: 28 }}
                />
              </Tooltip>
              <Tooltip title="Weekly Hours">
                <Chip
                  size="small"
                  icon={<AccessTime sx={{ fontSize: '1rem' }} />}
                  label={`${weeklyHours.total}h/week`}
                  variant="outlined"
                  sx={{ height: 28 }}
                />
              </Tooltip>
            </Stack>

            {/* Enrollment Progress */}
            <Box sx={{ pt: 1 }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1
              }}>
                <Typography
                  variant="caption"
                  sx={{ 
                    color: `${getEnrollmentColor()}.main`,
                    fontWeight: 500
                  }}
                >
                  {currentEnrollmentCount} / {maxEnrollmentSpots} spots
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ 
                    color: `${getEnrollmentColor()}.main`,
                    fontWeight: 500
                  }}
                >
                  {Math.round(enrollmentPercentage)}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={enrollmentPercentage}
                color={getEnrollmentColor()}
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
              variant="outlined"
              color={getStatusColor()}
              onClick={() => onViewDetails(discipline)}
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                height: 36,
                borderRadius: 1.5,
              }}
            >
              {alreadyEnrolled 
                ? 'View Enrollment' 
                : isEnrollmentPeriodActive 
                  ? 'Enroll Now' 
                  : 'View Details'}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Grid>
  );
});