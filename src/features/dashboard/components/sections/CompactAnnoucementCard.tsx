import { Box, Stack, Typography } from "@mui/material";

import { Announcement } from "../../../../types/disciplines/disciplines.types";
import { FC } from "react";

interface CompactAnnouncementCardProps extends Announcement {
  isLast?: boolean;
}

export const CompactAnnouncementCard: FC<CompactAnnouncementCardProps> = ({
  title,
  date,
  content,
  important,
  isLast,
}) => (
  <Box
    sx={{
      p: 2,
      borderBottom: (theme) => !isLast ? `1px solid ${theme.palette.divider}` : 'none',
      '&:hover': { 
        bgcolor: 'action.hover',
        cursor: 'pointer'
      },
      transition: 'background-color 0.15s ease',
    }}
  >
    <Stack spacing={1}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography 
            variant="body2" 
            fontWeight={600}
            sx={{ 
              color: important ? 'error.main' : 'text.primary',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5
            }}
          >
            {title}
          </Typography>
          {important && (
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'error.main',
                bgcolor: 'error.light',
                px: 1,
                py: 0.25,
                borderRadius: 1,
                fontSize: '0.65rem',
                fontWeight: 500,
              }}
            >
              Important
            </Typography>
          )}
        </Stack>
        <Typography 
          variant="caption" 
          color="text.secondary"
          sx={{ fontWeight: 500 }}
        >
          {date}
        </Typography>
      </Stack>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          fontSize: '0.8125rem',
          lineHeight: 1.5,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {content}
      </Typography>
    </Stack>
  </Box>
);