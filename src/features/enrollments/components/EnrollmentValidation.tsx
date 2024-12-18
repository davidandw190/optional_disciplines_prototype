import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';

import { EnrollmentState } from '../../../types/enrollments/enrollments.types';
import { FC } from 'react';

interface EnrollmentValidationProps {
  state: EnrollmentState;
  onNext: () => void;
  onCancel: () => void;
}

export const EnrollmentValidation: FC<EnrollmentValidationProps> = ({
  state,
  onNext,
  onCancel,
}) => {
  const { validationStatus, validation, error } = state;

  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h6" gutterBottom>
        Checking Enrollment Eligibility
      </Typography>

      {validationStatus === 'loading' && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
          <CircularProgress size={24} />
          <Typography>Validating your enrollment request...</Typography>
        </Box>
      )}

      {validationStatus === 'succeeded' && (
        <>
          {validation?.isValid ? (
            <Alert severity="success" sx={{ mt: 2 }}>
              <AlertTitle>Ready to Enroll</AlertTitle>
              You are eligible to enroll in this course.
              {validation.waitlistPosition && (
                <Typography sx={{ mt: 1 }}>
                  Note: You will be placed on the waitlist at position{' '}
                  {validation.waitlistPosition}.
                </Typography>
              )}
            </Alert>
          ) : (
            <Alert severity="error" sx={{ mt: 2 }}>
              <AlertTitle>Cannot Proceed</AlertTitle>
              {Object.entries(validation?.errors || {}).map(
                ([key, messages]) => (
                  <Box key={key} sx={{ mt: 1 }}>
                    {Array.isArray(messages) &&
                      messages.map((message, index) => (
                        <Typography key={index} variant="body2">
                          • {message}
                        </Typography>
                      ))}
                  </Box>
                )
              )}
            </Alert>
          )}
          <Box
            sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}
          >
            <Button onClick={onCancel}>Cancel</Button>
            <Button
              variant="contained"
              onClick={onNext}
              disabled={!validation?.isValid}
            >
              Continue
            </Button>
          </Box>
        </>
      )}

      {validationStatus === 'failed' && (
        <Alert severity="error" sx={{ mt: 2 }}>
          <AlertTitle>Validation Error</AlertTitle>
          {error || 'An error occurred during validation. Please try again.'}
        </Alert>
      )}
    </Box>
  );
};
