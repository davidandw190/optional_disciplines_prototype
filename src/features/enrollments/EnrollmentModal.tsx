import { Dialog, DialogContent } from '@mui/material';
import { FC, useEffect } from 'react';

import { EnrollmentComplete } from './components/EnrollmetnComplete';
import { EnrollmentConfirmation } from './components/EnrollmentConfirmation';
import { EnrollmentProcessing } from './components/EnrollmentProcessing';
import { EnrollmentStepper } from './components/EnrollmentStepper';
import { EnrollmentValidation } from './components/EnrollmentValidation';
import { useEnrollment } from './hooks/useEnrollment';
import { useEnrollmentStep } from './hooks/useEnrollmentStep';

interface EnrollmentModalProps {
  open: boolean;
  onClose: () => void;
  disciplineId: string;
  packetId: string;
  studentId: string;
  onEnrollmentComplete: () => void;
}

export const EnrollmentModal: FC<EnrollmentModalProps> = ({
  open,
  onClose,
  disciplineId,
  packetId,
  studentId,
  onEnrollmentComplete,
}) => {
  const { state, validateEnrollment, submitEnrollment, resetState } =
    useEnrollment();
  const { currentStep, goToNextStep, goToPreviousStep } = useEnrollmentStep();

  useEffect(() => {
    if (open) {
      validateEnrollment({ studentId, disciplineId, packetId });
    }
    return () => resetState();
  }, [open]);

  const handleClose = () => {
    if (state.enrollmentStatus !== 'loading') {
      resetState();
      onClose();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <EnrollmentValidation
            state={state}
            onNext={goToNextStep}
            onCancel={handleClose}
          />
        );
      case 1:
        return (
          <EnrollmentConfirmation
            state={state}
            onConfirm={async () => {
              if (state.validation?.isValid) {
                await submitEnrollment({
                  studentId,
                  disciplineId,
                  packetId,
                  validationId: 'temp-id', 
                });
                goToNextStep();
              }
            }}
            onBack={goToPreviousStep}
            onCancel={handleClose}
          />
        );
      case 2:
        return (
          <EnrollmentProcessing
            state={state}
            estimatedTime={state.validation?.estimatedProcessingTime || 2000}
          />
        );
      case 3:
        return (
          <EnrollmentComplete
            state={state}
            onClose={() => {
              handleClose();
              onEnrollmentComplete();
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown={state.enrollmentStatus === 'loading'}
    >
      <EnrollmentStepper currentStep={currentStep} />
      <DialogContent>{renderStepContent()}</DialogContent>
    </Dialog>
  );
};
