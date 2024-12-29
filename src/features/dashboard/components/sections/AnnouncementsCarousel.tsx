import { Box, IconButton, Paper, Stack, useTheme } from '@mui/material';
import { FC, useState } from 'react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

import { Announcement } from '../../../../types/disciplines/disciplines.types';
import { AnnouncementCard } from '../cards/AnnouncementCard';

interface AnnouncementsCarouselProps {
  announcements: Announcement[];
  visibleCount?: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const AnnouncementsCarousel: FC<AnnouncementsCarouselProps> = ({
  announcements,
  visibleCount = 3,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const theme = useTheme();

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      {currentPage > 1 && (
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
      
      {currentPage < totalPages && (
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
        {announcements.map((announcement, index) => (
          <AnnouncementCard key={`${announcement.title}-${index}`} {...announcement} />
        ))}
      </Stack>
    </Box>
  );
};