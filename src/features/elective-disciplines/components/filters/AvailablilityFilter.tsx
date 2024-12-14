import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';

import { FC } from 'react';

interface AvailabilityFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const AvailabilityFilter: FC<AvailabilityFilterProps> = ({ value, onChange }) => (
  <Grid item xs={10} md={3}>
    <FormControl fullWidth>
      <InputLabel>Availability</InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label="Availability"
      >
        <MenuItem value="all">All Courses</MenuItem>
        <MenuItem value="available">Available</MenuItem>
        <MenuItem value="waitlist">Waitlist Available</MenuItem>
        <MenuItem value="full">Full</MenuItem>
      </Select>
    </FormControl>
  </Grid>
);