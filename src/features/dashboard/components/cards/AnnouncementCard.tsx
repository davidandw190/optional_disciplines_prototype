import { AccessTime, InfoOutlined } from '@mui/icons-material';
import { Chip, Paper, Stack, Typography, alpha } from '@mui/material';
import { FC, useState } from 'react';

import { Announcement } from '../../../../types/disciplines/disciplines.types';
import { AnnouncementModal } from '../modals/AnnouncementModal';
import { formatAnnouncementDate } from '../../../../utils/dateUtils';

export const AnnouncementCard: FC<Announcement> = (announcement) => {
  const { title, date, content, important } = announcement;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Paper
        elevation={0}
        onClick={() => setIsModalOpen(true)}
        sx={{
          p: 2,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          transition: 'all 0.2s ease',
          cursor: 'pointer',
          '&:hover': {
            borderColor: 'primary.main',
            transform: 'translateY(-2px)',
            boxShadow: (theme) =>
              `0 4px 12px ${alpha(theme.palette.primary.main, 0.08)}`,
          },
        }}
      >
        <Stack spacing={1.5}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <InfoOutlined
                fontSize="small"
                color={important ? 'error' : 'action'}
              />
              <Typography
                variant="subtitle2"
                fontWeight={600}
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {title}
              </Typography>
            </Stack>
            {important && (
              <Chip
                label="Important"
                size="small"
                color="error"
                variant="outlined"
                sx={{ height: 24, flexShrink: 0 }}
              />
            )}
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.5,
            }}
          >
            {content}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ mt: 'auto' }}
          >
            <AccessTime fontSize="small" color="action" />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              {formatAnnouncementDate(date)}
            </Typography>
          </Stack>
        </Stack>
      </Paper>

      <AnnouncementModal
        announcement={announcement}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
