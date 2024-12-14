import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';

import { FC } from 'react';
import { sortOptions } from '../../../../types/filters/filters.types';

interface SortFilterProps {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSortByChange: (value: string) => void;
  onSortOrderChange: (value: 'asc' | 'desc') => void;
}

export const SortFilter: FC<SortFilterProps> = ({
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderChange,
}) => (
  <Grid item xs={12} md={3}>
    <Stack direction="row" spacing={1}>
      <FormControl fullWidth>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
          label="Sort By"
        >
          {sortOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <IconButton
        onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
      >
        {sortOrder === 'asc' ? <ArrowUpward /> : <ArrowDownward />}
      </IconButton>
    </Stack>
  </Grid>
);
