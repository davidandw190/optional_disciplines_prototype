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
import { getStatusColor, getStatusLabel } from '../../utils/utils';

import { DisciplineSelection } from '../../../../types/enrollments/enrollment-summary.types';
import { EnrollmentStatus } from '../../../../types/disciplines/disciplines.enums';
import { FC } from 'react';
import { TeacherInfo } from './TeacherInfo';
import { getStatusIcon } from '../utils/details-utils';

export interface EnrollmentDisciplineCardProps {
  selection: DisciplineSelection;
}
export const EnrollmentDisciplineCard: FC<EnrollmentDisciplineCardProps> = ({
  selection,
}) => {
  const theme = useTheme();
  const statusColor = getStatusColor(selection.status, theme);

  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: alpha(
          statusColor.main,
          selection.status === EnrollmentStatus.CONFIRMED ? 0.05 : 0.02
        ),
        borderRadius: 1.5,
        border: `1px solid ${alpha(
          statusColor.main,
          selection.status === EnrollmentStatus.CONFIRMED ? 0.2 : 0.1
        )}`,
        overflow: 'hidden',
        transition: 'all 0.2s ease',
        '&:hover': {
          bgcolor: alpha(statusColor.main, 0.07),
        },
      }}
    >
      <Box sx={{ p: 2 }}>
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
                {selection.name}
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
                  {selection.code}
                </Typography>
                <Tooltip
                  title={`This is your priority ${
                    selection.priority
                  } choice for this packet. ${
                    selection.priority === 1
                      ? 'This is your top preference.'
                      : 'Higher priority (lower number) selections are considered first.'
                  }`}
                  arrow
                >
                  <Chip
                    label={`Priority ${selection.priority}`}
                    size="small"
                    color={selection.priority === 1 ? 'success' : 'default'}
                    sx={{
                      height: 20,
                      '& .MuiChip-label': {
                        px: 1,
                        fontSize: '0.75rem',
                        fontWeight: 500,
                      },
                    }}
                  />
                </Tooltip>
              </Stack>
            </Stack>
            <Tooltip
              title={`Status: ${getStatusLabel(selection.status)}${
                selection.status === EnrollmentStatus.PENDING
                  ? ' - Your selection is being processed'
                  : selection.status === EnrollmentStatus.WAITLIST
                  ? " - You'll be enrolled if a spot becomes available"
                  : selection.status === EnrollmentStatus.CONFIRMED
                  ? " - You've been successfully enrolled"
                  : selection.status === EnrollmentStatus.REJECTED
                  ? " - Your selection couldn't be processed"
                  : ''
              }`}
              arrow
            >
              <Chip
                label={getStatusLabel(selection.status)}
                size="small"
                icon={getStatusIcon(selection.status)}
                sx={{
                  height: 20,
                  bgcolor: alpha(statusColor.main, 0.1),
                  color: statusColor.main,
                  '& .MuiChip-label': {
                    px: 0.5,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  },
                  '& .MuiChip-icon': {
                    fontSize: '0.875rem',
                    ml: 0.5,
                    mr: -0.25,
                  },
                }}
              />
            </Tooltip>
          </Stack>

          {selection.teacher && <TeacherInfo teacher={selection.teacher} />}
        </Stack>
      </Box>
    </Paper>
  );
};
