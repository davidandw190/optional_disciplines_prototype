import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material';
import { DisciplineCard, DisciplineDetails } from '../components';
import { FC, useState } from 'react';

import { useGetOptionalDisciplinesQuery } from '../api/disciplinesApi';

export const OptionalDisciplinesPage: FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(3);
  const [selectedSemester, setSelectedSemester] = useState<number>(1);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string | null>(null);

  const { data: disciplines, isLoading } = useGetOptionalDisciplinesQuery({
    year: selectedYear,
    semester: selectedSemester,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 3 }}>
        Optional Disciplines
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Year</InputLabel>
              <Select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
              >
                <MenuItem value={1}>Year 1</MenuItem>
                <MenuItem value={2}>Year 2</MenuItem>
                <MenuItem value={3}>Year 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Semester</InputLabel>
              <Select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(Number(e.target.value))}
              >
                <MenuItem value={1}>Semester 1</MenuItem>
                <MenuItem value={2}>Semester 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {disciplines?.map((discipline) => (
          <Grid item xs={12} sm={6} md={4} key={discipline.id}>
            <DisciplineCard
              discipline={discipline}
              onViewDetails={() => setSelectedDiscipline(discipline.id)}
              onEnroll={() => {/* handle enrollment */}}
            />
          </Grid>
        ))}
      </Grid>

      {selectedDiscipline && (
        <DisciplineDetails
          discipline={disciplines?.find(d => d.id === selectedDiscipline)!}
          open={!!selectedDiscipline}
          onClose={() => setSelectedDiscipline(null)}
          onEnroll={() => {/* handle enrollment */}}
        />
      )}
    </Container>
  );
};