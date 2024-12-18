import {
  EnrollmentRequest,
  EnrollmentState,
  EnrollmentValidationRequest,
} from '../../../types/enrollments/enrollments.types';
import { useCallback, useState } from 'react';

import { enrollmentApi } from '../../../api/enrollments/entrollmentsApi';

const ENROLLMENT_TIMEOUT = 15000;

export function useEnrollment() {
  const [state, setState] = useState<EnrollmentState>({
    validationStatus: 'idle',
    enrollmentStatus: 'idle',
    validation: null,
    enrollment: null,
    error: null,
  });

  const resetState = useCallback(() => {
    setState({
      validationStatus: 'idle',
      enrollmentStatus: 'idle',
      validation: null,
      enrollment: null,
      error: null,
    });
  }, []);

  const validateEnrollment = useCallback(
    async (request: EnrollmentValidationRequest) => {
      setState((prev: any) => ({
        ...prev,
        validationStatus: 'loading',
        error: null,
      }));

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(
          () => controller.abort(),
          ENROLLMENT_TIMEOUT
        );

        const validation = await enrollmentApi.validateEnrollment(request, {
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        setState((prev: any) => ({
          ...prev,
          validationStatus: 'succeeded',
          validation,
        }));

        return validation;
      } catch (error) {
        setState((prev: any) => ({
          ...prev,
          validationStatus: 'failed',
          error: error instanceof Error ? error.message : 'Validation failed',
        }));
        throw error;
      }
    },
    []
  );

  const submitEnrollment = useCallback(async (request: EnrollmentRequest) => {
    setState((prev: any) => ({
      ...prev,
      enrollmentStatus: 'loading',
      error: null,
    }));

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        ENROLLMENT_TIMEOUT
      );

      const enrollment = await enrollmentApi.submitEnrollment(request, {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      setState((prev: any) => ({
        ...prev,
        enrollmentStatus: 'succeeded',
        enrollment,
      }));

      return enrollment;
    } catch (error) {
      setState((prev: any) => ({
        ...prev,
        enrollmentStatus: 'failed',
        error: error instanceof Error ? error.message : 'Enrollment failed',
      }));
      throw error;
    }
  }, []);

  return {
    state,
    validateEnrollment,
    submitEnrollment,
    resetState,
  };
}
