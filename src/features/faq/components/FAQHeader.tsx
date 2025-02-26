import { Stack, Typography } from '@mui/material';

import { FC } from 'react';
import { HeaderPaper } from '../styles/faq-styles';

export const FAQHeader: FC = () => {
  return (
    <HeaderPaper elevation={0}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Stack spacing={0.5}>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Enrollment FAQ
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              Find answers to common questions about the enrollment process
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </HeaderPaper>
  );
};
