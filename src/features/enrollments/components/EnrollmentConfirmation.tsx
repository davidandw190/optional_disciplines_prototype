import { Alert, AlertTitle, Box, Button, Paper, Typography } from '@mui/material';

import { EnrollmentState } from '../../../types/enrollments/enrollments.types';
import { FC } from 'react';

interface EnrollmentConfirmationProps {
  state: EnrollmentState;
  onConfirm: () => Promise<void>;
  onBack: () => void;
  onCancel: () => void;
}

export const EnrollmentConfirmation: FC<EnrollmentConfirmationProps> = ({
  state,
  onConfirm,
  onBack,
  onCancel,
}) => {
  const { validation } = state;

  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h6" gutterBottom>
        Confirm Enrollment
      </Typography>

      {validation?.waitlistPosition && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <AlertTitle>Waitlist Notice</AlertTitle>
          The course is currently full. By proceeding, you will be added to the
          waitlist at position {validation.waitlistPosition}.
        </Alert>
      )}

      <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Please review your enrollment request:
        </Typography>
        {/* course details would be displayed here I think*/}
        <Typography variant="body2" sx={{ mt: 2 }}>
          By proceeding, you agree to:
        </Typography>
        <Box component="ul" sx={{ mt: 1, pl: 2 }}>
          <Typography component="li" variant="body2">
            Follow the course requirements and deadlines
          </Typography>
          <Typography component="li" variant="body2">
            Participate in required activities
          </Typography>
          <Typography component="li" variant="body2">
            Accept the enrollment terms and conditions
          </Typography>
        </Box>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onBack}>Back</Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          disabled={state.enrollmentStatus === 'loading'}
        >
          Confirm Enrollment
        </Button>
      </Box>
    </Box>
  );
};