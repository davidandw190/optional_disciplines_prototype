import { Discipline } from '../../../types/disciplines/disciplines.types';
import { DisciplineCard } from './DisciplineCard';
import { FC } from 'react';
import { Grid } from '@mui/material';

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
  <Grid container spacing={3}>
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
);
