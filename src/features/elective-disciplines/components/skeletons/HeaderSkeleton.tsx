import { Box, Paper, Skeleton, Stack } from '@mui/material';

export const HeaderSkeleton = () => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      mb: 4,
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'divider',
    }}
  >
    <Stack spacing={3}>
      {/* Title and Period Info */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={{ xs: 2, sm: 0 }}
      >
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" height={40} />
          <Skeleton variant="text" width="40%" height={24} sx={{ mt: 1 }} />
        </Box>
        <Skeleton
          variant="rounded"
          width={150}
          height={32}
          sx={{ borderRadius: '16px' }}
        />
      </Stack>

      <Skeleton variant="text" sx={{ width: '100%' }} />

      {/* Period Details */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', md: 'center' }}
        spacing={2}
      >
        <Skeleton variant="text" width={200} height={24} />
        <Skeleton
          variant="rounded"
          width={180}
          height={36}
          sx={{ borderRadius: 1 }}
        />
      </Stack>
    </Stack>
  </Paper>
);
