import {
  EnrollmentRequest,
  EnrollmentValidationRequest,
  EnrollmentValidationResponse,
} from '../../types/enrollments/enrollments.types';
import {
  mockEnrollmentConfirmation,
  mockEnrollmentValidation,
} from '../../features/mocks/enrollments.mock';

import { EnrollmentStatus } from '../../types/disciplines/disciplines.enums';

export const enrollmentApi = {
  async validateEnrollment(
    request: EnrollmentValidationRequest,
    { signal }: { signal?: AbortSignal } = {}
  ): Promise<EnrollmentValidationResponse> {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(async () => {
        try {
          const response = await mockEnrollmentValidation(request);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      }, 1000);

      signal?.addEventListener('abort', () => {
        clearTimeout(timeoutId);
        reject(new Error('Request timeout'));
      });
    });
  },

  async submitEnrollment(
    request: EnrollmentRequest,
    { signal }: { signal?: AbortSignal } = {}
  ): Promise<EnrollmentStatus> {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(async () => {
        try {
          const response = await mockEnrollmentConfirmation(request);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      }, 1500);

      signal?.addEventListener('abort', () => {
        clearTimeout(timeoutId);
        reject(new Error('Request timeout'));
      });
    });
  },
};
