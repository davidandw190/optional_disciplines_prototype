import { Box, Card, Skeleton, Stack } from '@mui/material';

export const DisciplineCardSkeleton = () => (
  <Card
    elevation={0}
    sx={{
      height: '100%',
      p: 2.5,
    }}
  >
    <Stack spacing={2}>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={2}
      >
        <Box>
          <Skeleton variant="rounded" width={80} height={24} />
          <Skeleton variant="text" width={200} height={24} />
        </Box>
        <Skeleton
          variant="rounded"
          width={90}
          height={24}
          sx={{ borderRadius: '12px' }}
        />
      </Stack>

      {/* Teacher Info */}
      <Stack direction="row" spacing={1} alignItems="center">
        <Skeleton variant="circular" width={20} height={20} />
        <Skeleton variant="text" width="60%" height={24} />
      </Stack>

      {/* Chips */}
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {[1, 2, 3, 4].map((i) => (
          <Skeleton
            key={i}
            variant="rounded"
            width={90}
            height={24}
            sx={{ borderRadius: '12px' }}
          />
        ))}
      </Stack>

      {/* Button */}
      <Skeleton
        variant="rounded"
        width="100%"
        height={40}
        sx={{ mt: 'auto', borderRadius: 1 }}
      />
    </Stack>
  </Card>
);
