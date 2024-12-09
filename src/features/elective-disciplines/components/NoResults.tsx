import { Box, Button, Typography } from '@mui/material';

import { SearchOff } from '@mui/icons-material';

export const NoResults = ({ onReset }: { onReset: () => void }) => (
  <Box
    sx={{
      textAlign: 'center',
      py: 8,
    }}
  >
    <SearchOff sx={{ fontSize: 48, color: 'action.disabled', mb: 2 }} />
    <Typography variant="h6" gutterBottom>
      No disciplines found
    </Typography>
    <Typography color="text.secondary" sx={{ mb: 3 }}>
      Try adjusting your search or filter criteria
    </Typography>
    <Button variant="outlined" onClick={onReset}>
      Reset Filters
    </Button>
  </Box>
);