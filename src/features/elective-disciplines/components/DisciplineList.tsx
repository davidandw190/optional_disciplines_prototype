import { Box, Grid } from '@mui/material';

import { Discipline } from '../../../types/disciplines/disciplines.types';
import { DisciplineCard } from './DisciplineCard';
import { FC } from 'react';

interface DisciplineListProps {
  disciplines: Discipline[];
  onViewDetails: (discipline: Discipline) => void;
  isEnrollmentPeriodActive: boolean;
}


export const DisciplineList: FC<DisciplineListProps> = ({
  disciplines,
  onViewDetails,
  isEnrollmentPeriodActive,
}) => (
  <Box sx={{ width: '100%', overflow: 'hidden' }}>
    <Grid 
      container 
      spacing={3}
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',                     // One column on mobile
          md: 'repeat(2, minmax(400px, 1fr))', // Two columns with minimum width
          xl: 'repeat(3, minmax(400px, 1fr))', // Three columns with minimum width
        },
        gap: 3,
        alignItems: 'stretch',
        '& > .MuiPaper-root': {
          height: '100%',
          minWidth: '400px',            // Enforce minimum width
          flex: '1 1 auto',             // Allow flex growing but maintain aspect
        }
      }}
    >
      {disciplines.map((discipline) => (
        <DisciplineCard
          key={discipline.id}
          discipline={discipline}
          onViewDetails={() => onViewDetails(discipline)}
          isEnrollmentPeriodActive={isEnrollmentPeriodActive}
          alreadyEnrolled={false}
        />
      ))}
    </Grid>
  </Box>
);