import { Box, Paper, Stack, Typography } from '@mui/material';

import { FC } from 'react';
import { QuickAction } from '../../../../types/disciplines/disciplines.types';

export const QuickActionCard: FC<QuickAction> = ({ icon, title, description }) => (
  <Paper
    elevation={0}
    sx={{
      p: 2.5,
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'divider',
      '&:hover': {
        bgcolor: 'action.hover',
        cursor: 'pointer',
        borderColor: 'primary.main',
      },
      transition: 'all 0.15s ease',
    }}
  >
    <Stack direction="row" spacing={2} alignItems="flex-start">
      <Box
        sx={{
          p: 1.25,
          borderRadius: 1.5,
          bgcolor: 'primary.main',
          color: 'white',
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="body2" fontWeight={600}>
          {title}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            mt: 0.5,
            display: { xs: 'none', sm: 'block' },
          }}
        >
          {description}
        </Typography>
      </Box>
    </Stack>
  </Paper>
);