import { AccessTime, School } from '@mui/icons-material';
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

import { EnrollmentStatus } from '../../../../types/disciplines/disciplines.enums';
import React from 'react';
import { getStatusIcon } from '../utils/details-utils';

interface DisciplineItemProps {
  name: string;
  code: string;
  priority: number;
  status?: EnrollmentStatus;
  teacher?: {
    academicTitle: { abbreviation: string };
    firstName: string;
    lastName: string;
  };
  isTopPriority?: boolean;
  showStatus?: boolean;
  additionalInfo?: React.ReactNode;
  credits?: number;
  language?: string;
  weeklyHours?: number;
}

export const DisciplineItem: React.FC<DisciplineItemProps> = ({
  name,
  code,
  priority,
  status,
  teacher,
  isTopPriority = false,
  showStatus = false,
  additionalInfo,
  credits,
  language,
  weeklyHours,
}) => {
  const theme = useTheme();
  const getItemColor = () => {
    if (showStatus && status) {
      return getStatusColor(status, theme).main;
    }
    return isTopPriority 
      ? theme.palette.success.main 
      : theme.palette.primary.main;
  };
  
  const itemColor = getItemColor();
  
  const priorityTooltip = priority === 1 
    ? 'This is your top choice and has the highest enrollment priority.' 
    : `This is your priority ${priority} choice and will be considered after higher priorities.`;

  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: alpha(itemColor, 0.05),
        borderRadius: 1.5,
        border: `1px solid ${alpha(itemColor, 0.2)}`,
        overflow: 'hidden',
        transition: 'all 0.2s ease',
        '&:hover': {
          bgcolor: alpha(itemColor, 0.08),
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Stack spacing={1}>
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
                {name}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" gap={1}>
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
                  {code}
                </Typography>
                
                <Tooltip title={priorityTooltip} arrow>
                  <Chip
                    label={`Priority ${priority}`}
                    size="small"
                    color={isTopPriority ? 'success' : 'default'}
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
            
            {showStatus && status && (
              <Tooltip
                title={`Status: ${getStatusLabel(status)}${
                  status === EnrollmentStatus.PENDING
                    ? ' - Your selection is being processed'
                    : status === EnrollmentStatus.WAITLIST
                    ? " - You'll be enrolled if a spot becomes available"
                    : status === EnrollmentStatus.CONFIRMED
                    ? " - You've been successfully enrolled"
                    : status === EnrollmentStatus.REJECTED
                    ? " - Your selection couldn't be processed"
                    : ''
                }`}
                arrow
              >
                <Chip
                  label={getStatusLabel(status)}
                  size="small"
                  icon={getStatusIcon(status)}
                  sx={{
                    height: 20,
                    bgcolor: alpha(getStatusColor(status, theme).main, 0.1),
                    color: getStatusColor(status, theme).main,
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
            )}
          </Stack>

          {/* Teacher info */}
          {teacher && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ 
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5
                }}
              >
                <School fontSize="inherit" />
                {`${teacher.academicTitle.abbreviation} ${teacher.firstName} ${teacher.lastName}`}
              </Typography>
            </Stack>
          )}
          
          {!additionalInfo && (credits || language || weeklyHours) && (
            <Box 
              sx={{ 
                mt: 0.5, 
                p: 1, 
                bgcolor: alpha(theme.palette.background.paper, 0.6),
                borderRadius: 1,
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 1
              }}
            >
              {weeklyHours && (
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <AccessTime sx={{ fontSize: '0.75rem', color: theme.palette.text.secondary }} />
                  <Typography variant="caption" color="text.secondary">
                    {weeklyHours} hours/week
                  </Typography>
                </Stack>
              )}
              
              {credits && (
                <Typography variant="caption" color="text.secondary">
                  {credits} {credits === 1 ? 'credit' : 'credits'}
                </Typography>
              )}
              
              {language && (
                <Typography
                  variant="caption"
                  sx={{
                    ml: 'auto',
                    px: 1,
                    py: 0.25,
                    borderRadius: 0.75,
                    bgcolor: alpha(theme.palette.grey[500], 0.1),
                    color: theme.palette.text.secondary,
                  }}
                >
                  {language === 'EN' ? 'English' : 'Romanian'}
                </Typography>
              )}
            </Box>
          )}
          {additionalInfo}
        </Stack>
      </Box>
    </Paper>
  );
};