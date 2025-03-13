// src/features/enrollments/modals/components/StatusBanner.tsx
import { Box, Paper, Stack, Typography, alpha, useTheme } from '@mui/material';

import React from 'react';

interface StatusBannerProps {
  icon: React.ReactNode;
  title: string;
  message: string;
  color: string;
}

export const StatusBanner: React.FC<StatusBannerProps> = ({ 
  icon, 
  title, 
  message,
  color 
}) => {
  const theme = useTheme();
  
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        bgcolor: alpha(color, 0.08),
        borderRadius: 2,
        border: `1px solid ${alpha(color, 0.2)}`,
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="flex-start">
        <Box
          sx={{
            color,
            display: 'flex',
            alignItems: 'center',
            pt: 0.25,
          }}
        >
          {icon}
        </Box>
        <Stack spacing={0.5} sx={{ flex: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              lineHeight: 1.4,
              fontSize: '0.8125rem',
            }}
          >
            {message}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};