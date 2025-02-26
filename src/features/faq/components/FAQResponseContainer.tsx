import React, { FC } from 'react';

import { Box } from '@mui/material';

interface FAQResponseContainerProps {
  children: React.ReactNode;
}

export const FAQResponseContainer: FC<FAQResponseContainerProps> = ({
  children,
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: { xs: '100%', md: '900px', lg: '1000px' },
        mx: 'auto',
        px: { xs: 0, sm: 2 },
      }}
    >
      {children}
    </Box>
  );
};
