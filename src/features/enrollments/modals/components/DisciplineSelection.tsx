import {
  Box,
  Chip,
  Paper,
  Stack,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';

import {Book} from '@mui/icons-material';
import { Discipline } from '../../../../types/disciplines/disciplines.types';
import { FC } from 'react';
import { TeacherInfo } from './TeacherInfo';

interface DisciplineSelectionProps {
  selection: {
    disciplineId: string;
    priority: number;
  };
  discipline: Discipline;
  isTopPriority: boolean;
}

export const DisciplineSelection: FC<DisciplineSelectionProps> = ({
  selection,
  discipline,
  isTopPriority,
}) => {
  const theme = useTheme();

  const priorityColor = isTopPriority
    ? theme.palette.success.main
    : selection.priority === 2
    ? theme.palette.primary.main
    : theme.palette.grey[600];

  const courseTeacher = discipline.teachingActivities.find(
    (activity) => activity.type === 'COURSE'
  )?.teacher;

  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: alpha(priorityColor, isTopPriority ? 0.05 : 0.02),
        borderRadius: 1.5,
        border: `1px solid ${alpha(priorityColor, isTopPriority ? 0.2 : 0.1)}`,
        overflow: 'hidden',
        transition: 'all 0.2s ease',
        '&:hover': {
          bgcolor: alpha(priorityColor, 0.07),
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Stack spacing={1.5}>
          {/* Header with discipline name and priority */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            <Stack spacing={0.5} sx={{ flex: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, lineHeight: 1.3 }}
              >
                {discipline.name}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography
                  variant="caption"
                  sx={{
                    px: 1,
                    py: 0.25,
                    borderRadius: 0.75,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    fontFamily: 'monospace',
                    fontWeight: 500,
                  }}
                >
                  {discipline.code}
                </Typography>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Book
                    sx={{
                      fontSize: '0.75rem',
                      color: 'text.secondary',
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {discipline.credits}{' '}
                    {discipline.credits === 1 ? 'credit' : 'credits'}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>

            <Tooltip
              title={`This is your priority ${selection.priority} choice${
                isTopPriority
                  ? '. Top priority selections have the highest enrollment chance.'
                  : '. Higher priority (lower number) selections are considered first.'
              }`}
              arrow
            >
              <Chip
                label={`Priority ${selection.priority}`}
                color={isTopPriority ? 'success' : 'default'}
                size="small"
                sx={{
                  height: 20,
                  '& .MuiChip-label': {
                    px: 0.5,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  },
                }}
              />
            </Tooltip>
          </Stack>

          {/* Teacher information*/}
          {courseTeacher && <TeacherInfo teacher={courseTeacher} />}
        </Stack>
      </Box>
    </Paper>
  );
};
