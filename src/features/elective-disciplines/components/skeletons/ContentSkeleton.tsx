import { FC } from 'react';
import { HeaderSkeleton } from './HeaderSkeleton';
import { PacketSkeleton } from './PacketSkeleton';
import { Stack } from '@mui/material';

export const ContentSkeleton: FC = () => {
  return (
    <Stack spacing={3}>
      <HeaderSkeleton />
      {[1, 2].map((i) => (
        <PacketSkeleton key={i} />
      ))}
    </Stack>
  );
};
