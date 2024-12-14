import { Box, Typography } from '@mui/material';

import { Announcement } from '../../../../types/disciplines/disciplines.types';
import { AnnouncementsCarousel } from './AnnouncementsCarousel';
import { FC } from 'react';

interface AnnouncementsSectionProps {
  announcements: Announcement[];
}

export const AnnouncementsSection: FC<AnnouncementsSectionProps> = ({
  announcements,
}) => (
  <Box sx={{ mt: { xs: 3, md: 4 } }}>
    <Typography 
      variant="h6" 
      sx={{ 
        mb: 3,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        fontWeight: 600,
      }}
    >
      Latest Announcements
      <Typography 
        component="span" 
        variant="caption" 
        sx={{ 
          color: 'text.secondary',
          ml: 1,
        }}
      >
        ({announcements.length})
      </Typography>
    </Typography>
    <AnnouncementsCarousel
      announcements={announcements} 
      visibleCount={3}
    />
  </Box>
);