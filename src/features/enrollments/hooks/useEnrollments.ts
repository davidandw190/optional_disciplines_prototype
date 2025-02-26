import { useCallback, useEffect, useState } from 'react';

import { EnrollmentPeriodType } from '../../../types/disciplines/disciplines.enums';
import { EnrollmentSummary } from '../../../types/enrollments/enrollment-summary.types';
import { getEnrollmentsByType } from '../../mocks/enrollments.mock';

export const useEnrollments = (type: EnrollmentPeriodType) => {
  const [enrollments, setEnrollments] = useState<EnrollmentSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEnrollments = useCallback(async () => {
    try {
      setIsLoading(true);
      // we just simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const data = getEnrollmentsByType(type);
      setEnrollments(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch enrollments. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [type]);

  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  return {
    enrollments,
    isLoading,
    error,
    refetch: fetchEnrollments,
  };
};
