import { Grid, Paper } from '@mui/material';

import { AvailabilityFilter } from './AvailablilityFilter';
import { FC } from 'react';
import { FilterState } from '../../../../types/filters/filters.types';
import { SearchFilters } from './SearchFilters';
import { SortFilter } from './SortFilter';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (field: keyof FilterState, value: any) => void;
}

export const FilterPanel: FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
}) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      mb: 3,
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 2,
    }}
  >
    <Grid container spacing={1}>
      <SearchFilters
        value={filters.search}
        onChange={(value) => onFilterChange('search', value)}
      />
      <AvailabilityFilter
        value={filters.availabilityStatus}
        onChange={(value) => onFilterChange('availabilityStatus', value)}
      />
      <SortFilter
        sortBy={filters.sortBy}
        sortOrder={filters.sortOrder}
        onSortByChange={(value) => onFilterChange('sortBy', value)}
        onSortOrderChange={(value) => onFilterChange('sortOrder', value)}
      />
    </Grid>
  </Paper>
);
