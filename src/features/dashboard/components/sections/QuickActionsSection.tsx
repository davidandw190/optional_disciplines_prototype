import { Grid, Paper, Stack, Typography } from '@mui/material';

import { FC } from 'react';
import { QuickAction } from '../../../../types/disciplines/disciplines.types';
import { QuickActionCard } from '../cards/QuickActionCard';

interface QuickActionsSectionProps {
  actions: QuickAction[];
}

export const QuickActionsSection: FC<QuickActionsSectionProps> = ({ actions }) => (
  <Grid item xs={12} lg={4}>
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3 },
        borderRadius: 2,
        bgcolor: 'background.paper',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack spacing={2.5} sx={{ flex: 1 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          Quick Actions
        </Typography>
        {actions.map((action, index) => (
          <QuickActionCard key={index} {...action} />
        ))}
      </Stack>
    </Paper>
  </Grid>
);