import { Box, Skeleton, Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';

import { AnnouncementsCarousel } from './AnnouncementsCarousel';
import { NotificationsOutlined } from '@mui/icons-material';
import { useGetAnnouncementsQuery } from '../../../../api/announcements/announcementsApi';

const PAGE_SIZE = 3;

export const AnnouncementsSection: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useGetAnnouncementsQuery({
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
      {/* Section Header */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ mb: 3 }}
      >
        <NotificationsOutlined color="primary" />
        <Typography
          variant="h6"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontWeight: 600,
          }}
        >
          Latest Announcements
          {!isLoading && !error && (
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
          )}
        </Typography>
      </Stack>

      {/* Content Area */}
      <Box sx={{ minHeight: 300 }}>
        {isLoading ? (
          <Stack spacing={2}>
            {Array.from(new Array(PAGE_SIZE)).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                height={100}
                sx={{ borderRadius: 1 }}
              />
            ))}
          </Stack>
        ) : error ? (
          <Stack
            spacing={2}
            alignItems="center"
            justifyContent="center"
            sx={{ height: '100%', py: 4 }}
          >
            <Typography color="error" align="center">
              Unable to load announcements
            </Typography>
            <Typography
              variant="button"
              color="primary"
              sx={{ cursor: 'pointer' }}
              onClick={() => refetch()}
            >
              Try Again
            </Typography>
          </Stack>
        ) : announcements.length > 0 ? (
          <AnnouncementsCarousel
            announcements={announcements}
            visibleCount={PAGE_SIZE}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />
        ) : (
          <Stack
            spacing={1}
            alignItems="center"
            justifyContent="center"
            sx={{ height: '100%', py: 4 }}
          >
            <Typography color="text.secondary" align="center">
              No announcements available
            </Typography>
            <Typography variant="caption" color="text.disabled">
              Check back later for updates
            </Typography>
          </Stack>
        )}
      </Box>
    </Box>
  );
};