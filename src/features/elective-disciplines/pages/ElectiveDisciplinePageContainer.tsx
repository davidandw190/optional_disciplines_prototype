import { DisciplineSelectionProvider } from '../../../contexts/discipline-selection.context';
import { ElectiveDisciplinesPage } from './ElectiveDisciplinesPage';
import { FC } from 'react';
import { useGetElectivePeriodQuery } from '../../../api/elective-disciplines/electiveDisciplinesApi';
import { useParams } from 'react-router-dom';

export const ElectiveDisciplinesPageContainer: FC = () => {
  const { periodId } = useParams();

  if (!periodId) return null;
  
  const { data: enrollmentPeriod } = useGetElectivePeriodQuery(periodId);

  if (!enrollmentPeriod) return null;

  return (
    <DisciplineSelectionProvider enrollmentPeriod={enrollmentPeriod}>
      <ElectiveDisciplinesPage />
    </DisciplineSelectionProvider>
  );
};