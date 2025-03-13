import { Box, IconButton, Paper, Stack, Tooltip, Typography, alpha, useTheme } from '@mui/material';

import { InfoOutlined } from '@mui/icons-material';
import React from 'react';

interface PacketSectionProps {
  packetName: string;
  packetInfo?: string;
  children: React.ReactNode;
  emptyMessage?: string;
}

export const PacketSection: React.FC<PacketSectionProps> = ({
  packetName,
  packetInfo,
  children,
  emptyMessage = "No selections in this packet"
}) => {
  const theme = useTheme();
  
  // Check if children is empty
  const isEmpty = React.Children.count(children) === 0;
  
  return (
    <Paper
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        overflow: 'hidden',
        mb: 3,
      }}
    >
      <Box
        sx={{
          p: 2,
          bgcolor: alpha(theme.palette.primary.main, 0.03),
          borderBottom: isEmpty ? 'none' : '1px solid',
          borderColor: 'divider',
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: theme.palette.primary.main,
            }}
          >
            {packetName}
          </Typography>

          {packetInfo && (
            <Tooltip
              title={
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                  {packetInfo}
                </Typography>
              }
              arrow
              placement="top"
            >
              <IconButton
                size="small"
                aria-label="Packet information"
                sx={{
                  color: theme.palette.primary.main,
                  opacity: 0.7,
                  '&:hover': {
                    opacity: 1,
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  },
                }}
              >
                <InfoOutlined sx={{ fontSize: '1rem' }} />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </Box>

      {isEmpty ? (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {emptyMessage}
          </Typography>
        </Box>
      ) : (
        <Box sx={{ p: 2 }}>
          <Stack spacing={1.5}>
            {children}
          </Stack>
        </Box>
      )}
    </Paper>
  );
};