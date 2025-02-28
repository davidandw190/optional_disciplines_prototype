import { Paper, Stack, Typography, alpha, useTheme } from '@mui/material';

import { FC } from 'react';
import { Info } from '@mui/icons-material';

export interface InfoBannerProps {
  message: string;
  title: string;
}


export const InfoBanner: FC<InfoBannerProps> = ({ title, message }) => {
  const theme = useTheme();
  
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        bgcolor: alpha(theme.palette.info.main, 0.08),
        borderRadius: 1.5,
        border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="flex-start">
        <Info color="info" sx={{ fontSize: '1.25rem', mt: 0.25 }} />
        <Stack spacing={0.5}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.4 }}
          >
            {message}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};