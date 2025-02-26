import { Stack, Typography } from '@mui/material';

import { EnrollmentPeriodType } from '../../../types/disciplines/disciplines.enums';
import { EnrollmentTypeInfo } from './EnrollmentTypeInfo';
import { FC } from 'react';
import { HeaderPaper } from '../styles/enrollment-styles';

interface MyEnrollmentsHeaderProps {
  activeTab: EnrollmentPeriodType;
}

export const MyEnrollmentsHeader: FC<MyEnrollmentsHeaderProps> = ({ activeTab }) => {
  return (
    <HeaderPaper elevation={0}>
      <Stack spacing={3}>
        {/* Title Section */}
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
          <Stack spacing={0.5}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              My Enrollments
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 500 }}>
              View and manage your enrollment history
            </Typography>
          </Stack>
        </Stack>

        {/* Active Tab Information */}
        <EnrollmentTypeInfo activeTab={activeTab} />
      </Stack>
    </HeaderPaper>
  );
};