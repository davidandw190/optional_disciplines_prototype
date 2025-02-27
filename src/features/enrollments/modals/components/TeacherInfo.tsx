import {
  Paper,
  Stack,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';

import { DisciplineSelection } from '../../../../types/enrollments/enrollment-summary.types';
import { FC } from 'react';
import { Person } from '@mui/icons-material';

export interface TeacherInfoProps {
  teacher: DisciplineSelection['teacher'];
}

export const TeacherInfo: FC<TeacherInfoProps> = ({ teacher }) => {
  const theme = useTheme();

  if (!teacher) return null;

  const { academicTitle, firstName, lastName, department, email } = teacher;

  return (
    <Tooltip
      title={
        <Stack spacing={0.5}>
          <Typography variant="subtitle2" fontWeight={600}>
            {`${academicTitle.title} ${firstName} ${lastName}`}
          </Typography>
          {email && (
            <Typography variant="body2">
              <strong>Email:</strong> {email}
            </Typography>
          )}
        </Stack>
      }
      arrow
      placement="top"
    >
      <Paper
        elevation={0}
        sx={{
          p: 1.25,
          bgcolor: alpha(theme.palette.background.paper, 0.6),
          borderRadius: 1,
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          transition: 'all 0.2s ease',
          cursor: 'pointer',
          '&:hover': {
            bgcolor: alpha(theme.palette.primary.main, 0.04),
            borderColor: alpha(theme.palette.primary.main, 0.2),
          },
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Person
            sx={{
              fontSize: '1rem',
              color: theme.palette.primary.main,
            }}
          />
          <Stack spacing={0}>
            <Typography
              variant="body2"
              sx={{
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: theme.palette.text.primary,
              }}
            >
              {`${academicTitle.abbreviation} ${firstName} ${lastName}`}
            </Typography>
          </Stack>
        </Stack>
      </Paper>
    </Tooltip>
  );
};
