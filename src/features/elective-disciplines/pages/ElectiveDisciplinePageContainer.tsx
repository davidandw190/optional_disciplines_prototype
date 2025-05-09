import { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DisciplineSelectionProvider } from '../../../contexts/discipline-selection.context';
import { ElectiveDisciplinesPage } from './ElectiveDisciplinesPage';
import { completedEnrollmentsUtils } from '../../../utils/enrollmentUtils';
import { showToast } from '../../../utils/toastUtils';
import { useGetElectivePeriodQuery } from '../../../api/elective-disciplines/electiveDisciplinesApi';

export const ElectiveDisciplinesPageContainer: FC = () => {
  const { periodId } = useParams();
  const navigate = useNavigate();

  if (!periodId) return null;

  const { data: enrollmentPeriod, isLoading } =
    useGetElectivePeriodQuery(periodId);

  useEffect(() => {
    if (!isLoading && periodId) {
      if (completedEnrollmentsUtils.isEnrollmentCompleted(periodId)) {
        showToast.info(
          "You've already submitted your enrollment for this period."
        );
        navigate('/dashboard');
      }
    }
  }, [periodId, navigate, isLoading]);

  if (!enrollmentPeriod) return null;

  return (
    <DisciplineSelectionProvider enrollmentPeriod={enrollmentPeriod}>
      <ElectiveDisciplinesPage />
    </DisciplineSelectionProvider>
  );
};
