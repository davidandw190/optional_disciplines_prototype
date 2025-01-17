import {
  EnrollmentRequest,
  EnrollmentStatus,
  EnrollmentStatusType,
  EnrollmentValidationRequest,
  EnrollmentValidationResponse,
} from '../../types/enrollments/enrollments.types';

export const mockEnrollmentValidation = (
  request: EnrollmentValidationRequest
): Promise<EnrollmentValidationResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isValid = Math.random() > 0.2;
      const waitlistPosition = Math.floor(Math.random() * 10) + 1;

      if (isValid) {
        resolve({
          isValid: true,
          errors: {},
          waitlistPosition: Math.random() > 0.7 ? waitlistPosition : undefined,
          estimatedProcessingTime: Math.floor(Math.random() * 2000) + 1000,
        });
      } else {
        resolve({
          isValid: false,
          errors: {
            prerequisites: ['Required prerequisite courses not completed'],
            credits: ['Exceeds maximum allowed credits for this semester'],
          },
          estimatedProcessingTime: 1000,
        });
      }
    }, Math.random() * 1000 + 500);
  });
};

export const mockEnrollmentConfirmation = (
  request: EnrollmentRequest
): Promise<EnrollmentStatus> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) {
        const isWaitlisted = Math.random() > 0.7;

        resolve({
          status: isWaitlisted
            ? EnrollmentStatusType.WAITLISTED
            : EnrollmentStatusType.ENROLLED,
          enrollmentId: `ENR-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 9)}`,
          waitlistPosition: isWaitlisted
            ? Math.floor(Math.random() * 10) + 1
            : undefined,
          timestamp: new Date().toISOString(),
          nextSteps: [
            'Check your student email for confirmation',
            'Review course materials on the learning platform',
            'Add important dates to your calendar',
          ],
        });
      } else {
        resolve({
          status: EnrollmentStatusType.FAILED,
          timestamp: new Date().toISOString(),
          nextSteps: [
            'Please try enrolling again',
            'If the problem persists, contact student support',
          ],
        });
      }
    }, Math.random() * 2000 + 1000);
  });
};
