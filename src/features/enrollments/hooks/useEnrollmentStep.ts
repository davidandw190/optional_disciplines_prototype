import { useCallback, useState } from 'react';

export enum EnrollmentStep {
  VALIDATION = 0,
  CONFIRMATION = 1,
  PROCESSING = 2,
  COMPLETE = 3,
}

export interface EnrollmentStepState {
  currentStep: EnrollmentStep;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export function useEnrollmentStep(
  initialStep: EnrollmentStep = EnrollmentStep.VALIDATION
) {
  const [currentStep, setCurrentStep] = useState<EnrollmentStep>(initialStep);

  const isFirstStep = currentStep === EnrollmentStep.VALIDATION;
  const isLastStep = currentStep === EnrollmentStep.COMPLETE;

  const goToNextStep = useCallback(() => {
    setCurrentStep((current) => {
      if (current < EnrollmentStep.COMPLETE) {
        return current + 1;
      }
      return current;
    });
  }, []);

  const goToPreviousStep = useCallback(() => {
    setCurrentStep((current) => {
      if (current > EnrollmentStep.VALIDATION) {
        return current - 1;
      }
      return current;
    });
  }, []);

  // Reset to initial step
  const resetStep = useCallback(() => {
    setCurrentStep(initialStep);
  }, [initialStep]);

  // Go to a specific step directly
  const goToStep = useCallback((step: EnrollmentStep) => {
    setCurrentStep(step);
  }, []);

  return {
    currentStep,
    isFirstStep,
    isLastStep,
    goToNextStep,
    goToPreviousStep,
    resetStep,
    goToStep,
  };
}
