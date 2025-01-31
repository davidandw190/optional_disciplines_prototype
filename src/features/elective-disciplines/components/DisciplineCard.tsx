import {
  AccessTime,
  AssignmentTurnedIn,
  CalendarToday,
  Grade,
  Language,
  Person,
  School,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
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
      language: teachingLanguage,
      assessmentType,
      weeklyHours,
      semester,
      yearOfStudy,
      teachingActivities,
    } = discipline;

    const courseTeacher = teachingActivities.find(
      (activity) => activity.type === 'COURSE'
    )?.teacher;

    const getStatusColor = () => {
      return isSelected ? 'success' : 'primary';
    };

    return (
      <Card
        elevation={0}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          border: isSelected
            ? `2px solid ${theme.palette.success.main}`
            : `2px solid ${alpha(theme.palette.divider, 0.1)}`,
          backgroundColor: alpha(theme.palette.background.paper, 0.8),
          backdropFilter: 'blur(8px)',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.12)}`,

            border: isSelected
              ? `2px solid ${theme.palette.success.main}`
              : `2px solid ${theme.palette.primary.main}`,

            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        <CardContent
          sx={{
            p: 2.5,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {/* Header Section */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            <Box>
              <Typography
                variant="caption"
                sx={{
                  fontFamily: 'monospace',
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                  color: theme.palette.primary.main,
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  fontWeight: 600,
                  display: 'inline-block',
                  mb: 1,
                }}
              >
                {code}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  lineHeight: 1.3,
                  color: theme.palette.text.primary,
                }}
              >
                {name}
              </Typography>
            </Box>

            <Tooltip title="Semester & Year">
              <Chip
                icon={<School sx={{ fontSize: '1rem' }} />}
                label={`S${semester}/Y${yearOfStudy}`}
                size="small"
                variant="outlined"
                sx={{
                  height: 24,
                  bgcolor: alpha(theme.palette.background.paper, 0.5),
                  '& .MuiChip-label': {
                    px: 1,
                    fontSize: '0.75rem',
                    fontWeight: 500,
                  },
                }}
              />
            </Tooltip>
          </Stack>

          {/* Teacher Information */}
          {courseTeacher && (
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{
                borderRadius: 1,
                p: 1,
              }}
            >
              <Person
                sx={{ fontSize: '1rem', color: theme.palette.primary.main }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: 500,
                }}
              >
                {`${courseTeacher.academicTitle.abbreviation} ${courseTeacher.firstName} ${courseTeacher.lastName}`}
              </Typography>
            </Stack>
          )}

          {/* Course Details */}
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
                sx={{
                  height: 24,
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                }}
              />
            </Tooltip>
            <Tooltip title="Teaching Language">
              <Chip
                size="small"
                icon={<Language sx={{ fontSize: '0.875rem' }} />}
                label={teachingLanguage}
                variant="outlined"
                sx={{ height: 24 }}
              />
            </Tooltip>
            <Tooltip title="Weekly Hours">
              <Chip
                size="small"
                icon={<AccessTime sx={{ fontSize: '0.875rem' }} />}
                label={`${weeklyHours.total}h/week`}
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

          {/* Action Button */}
          <Button
            fullWidth
            variant={isSelected ? 'contained' : 'outlined'}
            color={getStatusColor()}
            onClick={onViewDetails}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              height: 40,
              mt: 'auto',
              borderRadius: theme.shape.borderRadius,
              boxShadow: 'none',
              backgroundColor: isSelected
                ? theme.palette.success.main
                : 'transparent',
              borderColor: isSelected
                ? theme.palette.success.main
                : theme.palette.primary.main,
              '&:hover': {
                backgroundColor: isSelected
                  ? theme.palette.success.dark
                  : alpha(theme.palette.primary.main, 0.04),
                boxShadow: isSelected
                  ? `0 4px 12px ${alpha(theme.palette.success.main, 0.2)}`
                  : 'none',
              },
            }}
          >
            {isSelected ? 'View Selected Discipline' : 'View Details'}
          </Button>
        </CardContent>
      </Card>
    );
  }
);

DisciplineCard.displayName = 'DisciplineCard';
