import { DialogTitle, Step, StepLabel, Stepper } from '@mui/material';

import { FC } from 'react';

interface EnrollmentStepperProps {
  currentStep: number;
}

const ENROLLMENT_STEPS = [
  'Validation',
  'Confirmation',
  'Processing',
  'Complete',
];

export const EnrollmentStepper: FC<EnrollmentStepperProps> = ({
  currentStep,
}) => {
  return (
    <DialogTitle sx={{ pb: 3 }}>
      <Stepper activeStep={currentStep} alternativeLabel>
        {ENROLLMENT_STEPS.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </DialogTitle>
  );
};
