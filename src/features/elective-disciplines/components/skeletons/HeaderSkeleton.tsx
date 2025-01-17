import { Divider, Paper, Skeleton, Stack } from "@mui/material";

import { FC } from "react";

export const HeaderSkeleton: FC = () => (
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
      <Stack spacing={1}>
        <Skeleton variant="text" width="60%" height={40} />
        <Skeleton variant="text" width="40%" height={24} />
      </Stack>
      <Divider />
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        spacing={2}
      >
        <Skeleton variant="text" width={200} height={24} />
        <Skeleton variant="rectangular" width={160} height={36} />
      </Stack>
    </Stack>
  </Paper>
);