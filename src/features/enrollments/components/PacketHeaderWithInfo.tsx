import {
  Box,
  Stack,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';

import { Discipline } from '../../../types/disciplines/disciplines.types';
import { FC } from 'react';
import { InfoOutlined } from '@mui/icons-material';

interface PacketHeaderWithInfoProps {
  title: string;
  maxChoices: number;
  currentSelections?: {
    disciplineId: string;
    priority: number;
  }[];
  disciplines?: Record<string, Discipline>;
}

export const PacketHeaderWithInfo: FC<PacketHeaderWithInfoProps> = ({
  title,
  maxChoices,
  currentSelections = [],
  disciplines = {},
}) => {
  const theme = useTheme();

  const getTooltipMessage = () => {
    if (currentSelections.length > 0 && disciplines[currentSelections[0].disciplineId]) {
      return `"${disciplines[currentSelections[0].disciplineId].name}" is your highest priority choice, giving you better enrollment chances if spaces are limited.`;
    }
    return `Select ${maxChoices} discipline${maxChoices > 1 ? 's' : ''} in order of preference. Your first choice has the best enrollment chance.`;
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{
        mb: 2,
        flexWrap: 'wrap',
        gap: 1,
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{
          flexGrow: 1,
          minWidth: { xs: '100%', sm: 'auto' },
        }}
      >
        <Typography
          variant="subtitle1"
          color="primary"
          sx={{
            fontWeight: 600,
            flex: 1,
          }}
        >
          {title}
        </Typography>
        <Tooltip
          title={
            <Typography variant="body2">
              {getTooltipMessage()}
            </Typography>
          }
          arrow
          placement="top"
          enterTouchDelay={0}
          leaveTouchDelay={3000}
          componentsProps={{
            tooltip: {
              sx: {
                bgcolor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
                boxShadow: `0 3px 6px ${alpha(theme.palette.common.black, 0.1)}`,
                p: 2,
                '& .MuiTooltip-arrow': {
                  color: theme.palette.background.paper,
                  '&::before': {
                    border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
                    backgroundColor: theme.palette.background.paper,
                    boxSizing: 'border-box',
                  },
                },
                maxWidth: 300,
                '& .MuiTypography-root': {
                  lineHeight: 1.5,
                },
                backdropFilter: 'blur(8px)',
              },
            },
            popper: {
              sx: {
                zIndex: theme.zIndex.tooltip,
              },
            },
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              color: theme.palette.primary.main,
              transition: 'opacity 0.2s ease',
              opacity: 0.7,
              '&:hover': {
                opacity: 1,
              },
            }}
          >
            <InfoOutlined sx={{ fontSize: '1rem' }} />
          </Box>
        </Tooltip>
      </Stack>
    </Stack>
  );
};