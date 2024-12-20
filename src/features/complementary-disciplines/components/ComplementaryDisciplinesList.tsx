import { Box, Grid } from '@mui/material';

import { ComplementaryDisciplineCard } from './ComplementaryDisciplineCard';
import { Discipline } from '../../../types/disciplines/disciplines.types';
import { DisciplineCard } from '../../elective-disciplines/components/DisciplineCard';
import { FC } from 'react';

interface ComplementaryDisciplineListProps {
  disciplines: Discipline[];
  onViewDetails: (discipline: Discipline) => void;
  isEnrollmentPeriodActive: boolean;
}

export const ComplementaryDisciplineList: FC<
  ComplementaryDisciplineListProps
> = ({ disciplines, onViewDetails, isEnrollmentPeriodActive }) => (
  <Box sx={{ width: '100%', overflow: 'hidden' }}>
    <Grid
      container
      spacing={3}
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: 'repeat(2, minmax(400px, 1fr))',
          xl: 'repeat(3, minmax(400px, 1fr))',
        },
        gap: 3,
        alignItems: 'stretch',
        '& > .MuiPaper-root': {
          height: '100%',
          minWidth: '400px',
          flex: '1 1 auto',
        },
      }}
    >
      {disciplines.map((discipline) => (
        <ComplementaryDisciplineCard
          key={discipline.id}
          discipline={discipline}
          onViewDetails={() => onViewDetails(discipline)}
          isEnrollmentPeriodActive={isEnrollmentPeriodActive}
        />
      ))}
    </Grid>
  </Box>
);
