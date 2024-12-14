import { Box, IconButton, Paper, Stack, useTheme } from '@mui/material';
import { FC, useState } from 'react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

import { Announcement } from '../../../../types/disciplines/disciplines.types';
import { AnnouncementCard } from '../cards/AnnouncementCard';

interface AnnouncementsCarouselProps {
  announcements: Announcement[];
  visibleCount?: number;
}

export const AnnouncementsCarousel: FC<AnnouncementsCarouselProps> = ({
  announcements,
  visibleCount = 3,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const theme = useTheme();

  const handlePrevious = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => 
      Math.min(announcements.length - visibleCount, prev + 1)
    );
  };

  return (
    <Box sx={{ position: 'relative' }}>
      {startIndex > 0 && (
        <IconButton
          onClick={handlePrevious}
          sx={{
            position: 'absolute',
            left: -50,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'background.paper',
            boxShadow: theme.shadows[2],
            '&:hover': { bgcolor: 'background.paper' },
          }}
        >
          <KeyboardArrowLeft />
        </IconButton>
      )}
      
      {startIndex < announcements.length - visibleCount && (
        <IconButton
          onClick={handleNext}
          sx={{
            position: 'absolute',
            right: -50,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'background.paper',
            boxShadow: theme.shadows[2],
            '&:hover': { bgcolor: 'background.paper' },
          }}
        >
          <KeyboardArrowRight />
        </IconButton>
      )}

      <Stack spacing={2}>
        {announcements
          .slice(startIndex, startIndex + visibleCount)
          .map((announcement, index) => (
            <AnnouncementCard key={index} {...announcement} />
          ))}
      </Stack>
    </Box>
  );
};