import { Box, Grid, Skeleton, Stack } from "@mui/material";

import { FC } from "react";

export const ContentSkeleton: FC = () => (
  <Stack spacing={3}>
    <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
    {[1, 2].map((i) => (
      <Box key={i} sx={{ mb: 4 }}>
        <Skeleton variant="text" width={200} height={40} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="100%" height={20} sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          {[1, 2, 3].map((j) => (
            <Grid item xs={12} sm={6} md={4} key={j}>
              <Skeleton variant="rectangular" height={280} sx={{ borderRadius: 2 }} />
            </Grid>
          ))}
        </Grid>
      </Box>
    ))}
  </Stack>
);