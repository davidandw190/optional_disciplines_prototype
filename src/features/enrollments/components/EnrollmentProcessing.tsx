import { Box, LinearProgress, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';

import { EnrollmentState } from '../../../types/enrollments/enrollments.types';

interface EnrollmentProcessingProps {
  state: EnrollmentState;
  estimatedTime: number;
}

export const EnrollmentProcessing: FC<EnrollmentProcessingProps> = ({
  state,
  estimatedTime,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / estimatedTime) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [estimatedTime]);

  return (
    <Box sx={{ py: 4, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Processing Your Enrollment
      </Typography>
      <Box sx={{ width: '100%', mt: 4 }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 8, borderRadius: 4 }}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Please wait while we process your request...
        </Typography>
      </Box>
    </Box>
  );
};
