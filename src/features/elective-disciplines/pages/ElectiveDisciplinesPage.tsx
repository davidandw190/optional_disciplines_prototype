import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ArrowDownward, ArrowUpward, Search, SearchOff } from '@mui/icons-material';
import {
  AssessmentType,
  DisciplineType,
  TeachingLanguage,
} from '../../../types/disciplines/disciplines.enums';
import { FC, useMemo, useState } from 'react';

import { Discipline } from '../../../types/disciplines/disciplines.types';
import { DisciplineCard } from '../components/DisciplineCard';
import { DisciplineDetailsDrawer } from '../components/DisciplineDetailsDrawer';
import { mockDisciplines } from '../../mocks/elective-disciplines.mock';

interface FilterState {
  search: string;
  credits: number[];
  languages: TeachingLanguage[];
  types: DisciplineType[];
  assessmentTypes: AssessmentType[];
  availabilityStatus: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

// available sorting options for disciplines
interface SortOption {
  value: string;
  label: string;
}

const sortOptions: SortOption[] = [
  { value: 'name', label: 'Course Name' },
  { value: 'credits', label: 'Credits' },
  { value: 'spots', label: 'Available Spots' },
  { value: 'enrollmentCount', label: 'Enrollment Count' },
  { value: 'language', label: 'Teaching Language' },
];

export const ElectiveDisciplinesPage: FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    credits: [],
    languages: [],
    types: [],
    assessmentTypes: [],
    availabilityStatus: 'all',
    sortBy: 'name',
    sortOrder: 'asc',
  });

  const [selectedDiscipline, setSelectedDiscipline] =
    useState<Discipline | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEnrollmentInProgress, setIsEnrollmentInProgress] = useState(false);
  const [enrollmentError, setEnrollmentError] = useState<string | null>(null);

  const handleFilterChange = (field: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleViewDetails = (discipline: Discipline) => {
    setSelectedDiscipline(discipline);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setTimeout(() => setSelectedDiscipline(null), 300);
  };

  const handleEnrollment = async (discipline: Discipline) => {
    try {
      setIsEnrollmentInProgress(true);
      setEnrollmentError(null);

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      setEnrollmentError(
        error instanceof Error ? error.message : 'Enrollment failed'
      );
    } finally {
      setIsEnrollmentInProgress(false);
    }
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      credits: [],
      languages: [],
      types: [],
      assessmentTypes: [],
      availabilityStatus: 'all',
      sortBy: 'name',
      sortOrder: 'asc',
    });
  };

  const filteredDisciplines = useMemo(() => {
    let results = [...mockDisciplines];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      results = results.filter(
        (d) =>
          d.name.toLowerCase().includes(searchLower) ||
          d.code.toLowerCase().includes(searchLower)
      );
    }

    if (filters.languages.length > 0) {
      results = results.filter((d) => filters.languages.includes(d.language));
    }

    if (filters.availabilityStatus !== 'all') {
      results = results.filter((d) => {
        const availableSpots =
          (d.maxEnrollmentSpots || 0) - (d.currentEnrollmentCount || 0);
        switch (filters.availabilityStatus) {
          case 'available':
            return availableSpots > 0;
          case 'waitlist':
            return (
              availableSpots <= 0 && d.waitlistLimit && d.waitlistLimit > 0
            );
          case 'full':
            return availableSpots <= 0;
          default:
            return true;
        }
      });
    }

    results.sort((a, b) => {
      switch (filters.sortBy) {
        case 'spots':
          return (
            (a.maxEnrollmentSpots || 0) -
            (a.currentEnrollmentCount || 0) -
            ((b.maxEnrollmentSpots || 0) - (b.currentEnrollmentCount || 0))
          );
        case 'credits':
          return a.credits - b.credits;
        case 'enrollmentCount':
          return (
            (a.currentEnrollmentCount || 0) - (b.currentEnrollmentCount || 0)
          );
        case 'language':
          return a.language.localeCompare(b.language);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    if (filters.sortOrder === 'desc') {
      results.reverse();
    }

    return results;
  }, [filters, mockDisciplines]);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        variant="h4"
        color="primary.main"
        sx={{
          mb: 4,
          fontWeight: 700,
          fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
        }}
      >
        Elective Disciplines
      </Typography>

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
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search by course name or code..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Availability</InputLabel>
              <Select
                value={filters.availabilityStatus}
                onChange={(e) =>
                  handleFilterChange('availabilityStatus', e.target.value)
                }
                label="Availability"
              >
                <MenuItem value="all">All Courses</MenuItem>
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="waitlist">Waitlist Available</MenuItem>
                <MenuItem value="full">Full</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <Stack direction="row" spacing={1}>
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
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
                onClick={() =>
                  handleFilterChange(
                    'sortOrder',
                    filters.sortOrder === 'asc' ? 'desc' : 'asc'
                  )
                }
              >
                {filters.sortOrder === 'asc' ? (
                  <ArrowUpward />
                ) : (
                  <ArrowDownward />
                )}
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Showing {filteredDisciplines.length} disciplines
        </Typography>
      </Box>

      {enrollmentError && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          onClose={() => setEnrollmentError(null)}
        >
          {enrollmentError}
        </Alert>
      )}

      {filteredDisciplines.length > 0 ? (
        <Grid container spacing={3}>
          {filteredDisciplines.map((discipline) => (
            <DisciplineCard
              key={discipline.id}
              discipline={discipline}
              onViewDetails={() => handleViewDetails(discipline)}
              isEnrollmentPeriodActive={true}
              alreadyEnrolled={false}
            />
          ))}
        </Grid>
      ) : (
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
          <Button variant="outlined" onClick={handleResetFilters}>
            Reset Filters
          </Button>
        </Box>
      )}

      {/* details drawer */}
      {selectedDiscipline && (
        <DisciplineDetailsDrawer
          discipline={selectedDiscipline}
          open={isDetailsOpen}
          onClose={handleCloseDetails}
          onEnroll={() => handleEnrollment(selectedDiscipline)}
          isEnrollmentPeriodActive={true}
          alreadyEnrolled={false}
        />
      )}

      {/* temp loading overlay */}
      {isEnrollmentInProgress && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};
