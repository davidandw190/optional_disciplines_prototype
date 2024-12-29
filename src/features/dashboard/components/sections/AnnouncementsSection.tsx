import { Box, Typography } from '@mui/material';
import { FC, useState } from 'react';

import { AnnouncementsCarousel } from './AnnouncementsCarousel';
import { useGetAnnouncementsQuery } from '../../../../api/announcements/announcementsApi';

const PAGE_SIZE = 3;

export const AnnouncementsSection: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error, refetch } = useGetAnnouncementsQuery({
    page: currentPage,
    pageSize: PAGE_SIZE,
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const announcements = data?.announcements ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
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
          ({total})
        </Typography>
      </Typography>
      <AnnouncementsCarousel
        announcements={announcements}
        visibleCount={PAGE_SIZE}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Box>
  );
};
