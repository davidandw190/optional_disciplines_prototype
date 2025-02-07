import { Box, Grid, Skeleton } from '@mui/material';

import { DisciplineCardSkeleton } from './DisciplineCardSkeleton';

export const PacketSkeleton = () => (
  <Box sx={{ mb: 4 }}>
    <Skeleton variant="text" width="30%" height={32} sx={{ mb: 1 }} />
    <Skeleton variant="text" width="70%" height={24} sx={{ mb: 3 }} />
    <Grid container spacing={3}>
      {[1, 2, 3].map((i) => (
        <Grid item xs={12} sm={6} md={4} key={i}>
          <DisciplineCardSkeleton />
        </Grid>
      ))}
    </Grid>
  </Box>
);
