import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from '@mui/material';

import { Discipline } from '../../../types/disciplines';
import { FC } from 'react';

interface DisciplineCardProps {
  discipline: Discipline;
  onViewDetails: () => void;
  onEnroll: () => void;
  isEnrollmentEnabled: boolean;
}

export const DisciplineCard: FC<DisciplineCardProps> = ({
  discipline,
  onViewDetails,
  onEnroll,
  isEnrollmentEnabled,
}) => {
  const availablePlaces = discipline.maxCapacity - discipline.currentEnrollments;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {discipline.name}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {discipline.description}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Chip label={`${discipline.credits} credits`} color="primary" />
          <Chip 
            label={`${availablePlaces} places left`}
            color={availablePlaces > 0 ? 'success' : 'error'}
          />
        </Box>

        <Typography variant="body2">
          <strong>Course teacher:</strong> {discipline.teachers.course}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" onClick={onViewDetails}>
          View Details
        </Button>
        <Button 
          size="small" 
          color="primary" 
          onClick={onEnroll}
          disabled={!isEnrollmentEnabled || availablePlaces === 0}
        >
          Enroll
        </Button>
      </CardActions>
    </Card>
  );
};