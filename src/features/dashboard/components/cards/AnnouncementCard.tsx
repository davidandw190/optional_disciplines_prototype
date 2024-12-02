import { Box, Chip, Stack, Typography } from '@mui/material';

import { Announcement } from '../../../../types/disciplines/disciplines.types';
import { FC } from 'react';

export const AnnouncementCard: FC<Announcement> = ({
  title,
  date,
  content,
  important,
}) => (
  <Box
    sx={{
      p: { xs: 2, sm: 2.5, md: 3 },
      borderBottom: '1px solid',
      borderColor: 'divider',
      '&:hover': { bgcolor: 'action.hover' },
      transition: 'background-color 0.15s ease',
    }}
  >
    <Stack spacing={2}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={{ xs: 1, sm: 0 }}
      >
        <Typography variant="body2" fontWeight={600}>
          {title}
        </Typography>
        {important && (
          <Chip
            label="Important"
            size="small"
            sx={{
              bgcolor: '#e60054',
              color: 'white',
              fontSize: '0.75rem',
              height: 20,
            }}
          />
        )}
      </Stack>
      <Typography variant="caption" color="text.secondary">
        {date}
      </Typography>
    </Stack>
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{
        fontSize: '0.8125rem',
        lineHeight: 1.5,
      }}
    >
      {content}
    </Typography>
  </Box>
);
