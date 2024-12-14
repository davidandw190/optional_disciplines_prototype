import { Grid, InputAdornment, TextField } from '@mui/material';

import { FC } from 'react';
import { Search } from '@mui/icons-material';

interface SearchFiltersProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchFilters: FC<SearchFiltersProps> = ({ value, onChange }) => (
  <Grid item xs={10} md={5}>
    <TextField
      fullWidth
      placeholder="Search by course name or code..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          'aria-label': 'search disciplines'
        }
      }}
    />
  </Grid>
);