import { Box, Typography } from '@mui/material';

import { FC } from 'react';

export const AvailableThesisPage: FC = () => {
  return (
    <Box
      sx={{
        mt: { xs: 3, sm: 4, md: 5 },
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Typography
        variant="h4"
        color="primary.main"
        sx={{
          fontWeight: 700,
          fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
        }}
      >
        Available Thesis
      </Typography>
    </Box>
  );
};
