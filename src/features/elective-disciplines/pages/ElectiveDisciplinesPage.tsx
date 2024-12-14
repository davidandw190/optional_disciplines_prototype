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
import { DisciplineList } from '../components/DisciplineList';
import { FilterPanel } from '../components/filters/FilterPanel';
import { FilterState } from '../../../types/filters/filters.types';
import { NoResults } from '../components/NoResults';
import { mockDisciplines } from '../../mocks/elective-disciplines.mock';

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
    <Box sx={{ p: { xs: 3, sm: 4, md: 5 }, maxWidth: '1920px', mx: 'auto' }}>
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

      <FilterPanel filters={filters} onFilterChange={handleFilterChange} />

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
        <DisciplineList
          disciplines={filteredDisciplines}
          onViewDetails={handleViewDetails}
          isEnrollmentPeriodActive={true}
        />
      ) : (
        <NoResults onReset={handleResetFilters} />
      )}

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

      {/* {isEnrollmentInProgress && <LoadingOverlay />} */}
    </Box>
  );
};
