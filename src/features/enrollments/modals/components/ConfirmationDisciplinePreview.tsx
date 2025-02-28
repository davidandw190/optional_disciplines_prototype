import { AccessTime, School } from '@mui/icons-material';
import {
  Chip,
  Paper,
  Stack,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';

import { Discipline } from '../../../../types/disciplines/disciplines.types';
import { FC } from 'react';
import { getPriorityDescription } from '../utils/confirmation-utils';

export interface ConfirmationDisciplinePreviewItemProps {
  discipline: Discipline;
  priority: number;
  index: number;
}

export const ConfirmationDisciplinePreviewItem: FC<
  ConfirmationDisciplinePreviewItemProps
> = ({ discipline, priority, index }) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        bgcolor: alpha(
          priority === 1
            ? theme.palette.success.main
            : theme.palette.background.paper,
          priority === 1 ? 0.04 : 0.6
        ),
        borderRadius: 1.5,
        border: `1px solid ${alpha(
          priority === 1 ? theme.palette.success.main : theme.palette.divider,
          priority === 1 ? 0.2 : 0.1
        )}`,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          bgcolor: alpha(
            priority === 1
              ? theme.palette.success.main
              : theme.palette.primary.main,
            priority === 1 ? 0.08 : 0.04
          ),
        },
      }}
    >
      <Stack spacing={1.5}>
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
                <School
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
            title={getPriorityDescription(priority)}
            arrow
            placement="top"
          >
            <Chip
              label={`Priority ${priority}`}
              color={index === 0 ? 'success' : 'default'}
              size="small"
              sx={{
                height: 24,
                '& .MuiChip-label': {
                  px: 1,
                  fontSize: '0.75rem',
                  fontWeight: 500,
                },
              }}
            />
          </Tooltip>
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{
            p: 1,
            bgcolor: alpha(theme.palette.background.paper, 0.4),
            borderRadius: 1,
          }}
        >
          <Stack direction="row" spacing={0.5} alignItems="center">
            <AccessTime
              sx={{
                fontSize: '0.875rem',
                color: theme.palette.primary.main,
              }}
            />
            <Typography variant="body2" sx={{ fontSize: '0.8125rem' }}>
              {discipline.weeklyHours.total} hours/week
            </Typography>
          </Stack>

          {discipline.language && (
            <Typography
              variant="caption"
              sx={{
                display: 'flex',
                alignItems: 'center',
                px: 1,
                py: 0.25,
                borderRadius: 0.75,
                bgcolor: alpha(theme.palette.grey[500], 0.1),
                color: theme.palette.text.secondary,
              }}
            >
              {discipline.language === 'EN' ? 'English' : 'Romanian'}
            </Typography>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
};
