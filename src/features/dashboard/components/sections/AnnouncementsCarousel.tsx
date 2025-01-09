import { Box, IconButton, Stack, useTheme } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

import { Announcement } from '../../../../types/disciplines/disciplines.types';
import { AnnouncementCard } from '../cards/AnnouncementCard';
import { FC } from 'react';

interface AnnouncementsCarouselProps {
  announcements: Announcement[];
  visibleCount: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export const AnnouncementsCarousel: FC<AnnouncementsCarouselProps> = ({
  announcements,
  visibleCount,
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
}) => {
  const theme = useTheme();

  if (isLoading || announcements.length === 0) {
    return null;
  }

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
    <Box sx={{ position: 'relative', p: 3 }}>
      {currentPage > 1 && (
        <IconButton
          onClick={handlePrevious}
          size="small"
          sx={{
            position: 'absolute',
            left: -20,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'background.paper',
            boxShadow: theme.shadows[2],
            '&:hover': { bgcolor: 'background.paper' },
            zIndex: 2,
          }}
        >
          <KeyboardArrowLeft />
        </IconButton>
      )}
      
      {currentPage < totalPages && (
        <IconButton
          onClick={handleNext}
          size="small"
          sx={{
            position: 'absolute',
            right: -20,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'background.paper',
            boxShadow: theme.shadows[2],
            '&:hover': { bgcolor: 'background.paper' },
            zIndex: 2,
          }}
        >
          <KeyboardArrowRight />
        </IconButton>
      )}

      <Stack spacing={2}>
        {announcements.map((announcement, index) => (
          <AnnouncementCard
            key={`${announcement.title}-${index}`}
            {...announcement}
          />
        ))}
      </Stack>
    </Box>
  );
};