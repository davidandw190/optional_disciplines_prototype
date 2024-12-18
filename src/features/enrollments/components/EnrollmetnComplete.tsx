import { Alert, AlertTitle, Box, Button, Typography } from '@mui/material';

import { EnrollmentState } from '../../../types/enrollments/enrollments.types';
import { FC } from 'react';

interface EnrollmentCompleteProps {
  state: EnrollmentState;
  onClose: () => void;
}

export const EnrollmentComplete: FC<EnrollmentCompleteProps> = ({
  state,
  onClose,
}) => {
  const { enrollment } = state;

  return (
    <Box sx={{ py: 2 }}>
      {enrollment?.status === 'ENROLLED' && (
        <Alert severity="success" sx={{ mb: 3 }}>
          <AlertTitle>Successfully Enrolled</AlertTitle>
          Your enrollment has been confirmed.
        </Alert>
      )}

      {enrollment?.status === 'WAITLISTED' && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <AlertTitle>Added to Waitlist</AlertTitle>
          You have been added to the waitlist at position{' '}
          {enrollment.waitlistPosition}.
        </Alert>
      )}

      {enrollment?.nextSteps && (
        <>
          <Typography variant="subtitle1" gutterBottom>
            Next Steps:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            {enrollment.nextSteps.map((step, index) => (
              <Typography
                component="li"
                key={index}
                variant="body2"
                sx={{ mb: 1 }}
              >
                {step}
              </Typography>
            ))}
          </Box>
        </>
      )}

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Box>
  );
};
