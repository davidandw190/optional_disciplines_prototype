import { Box, Grid, Skeleton } from "@mui/material";

import { FC } from "react";

export const PacketSkeleton: FC = () => (
  <Box sx={{ mb: { xs: 4, md: 6 } }}>
    <Skeleton variant="text" width="30%" height={32} sx={{ mb: 1 }} />
    <Skeleton variant="text" width="50%" height={24} sx={{ mb: 3 }} />
    <Grid container spacing={3}>
      {[1, 2, 3].map((i) => (
        <Grid item xs={12} sm={6} md={4} key={i}>
          <Skeleton variant="rectangular" height={320} sx={{ borderRadius: 2 }} />
        </Grid>
      ))}
    </Grid>
  </Box>
);