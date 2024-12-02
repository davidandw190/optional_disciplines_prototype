import { Box, Paper, Typography } from '@mui/material';

import { Announcement } from '../../../../types/disciplines/disciplines.types';
import { AnnouncementCard } from '../cards/AnnouncementCard';
import { FC } from 'react';

interface AnnouncementsSectionProps {
  announcements: Announcement[];
}

export const AnnouncementsSection: FC<AnnouncementsSectionProps> = ({
  announcements,
}) => (
  <Box sx={{ mt: { xs: 3, md: 4 } }}>
    <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
      Announcements
    </Typography>
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      {announcements.map((announcement, index) => (
        <AnnouncementCard key={index} {...announcement} />
      ))}
    </Paper>
  </Box>
);
