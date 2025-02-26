import { Box, Container, Stack } from '@mui/material';
import { ContentPaper, PageContainer } from '../styles/enrollment-styles';
import { FC, SyntheticEvent, useCallback, useState } from 'react';

import { EnrollmentPeriodType } from '../../../types/disciplines/disciplines.enums';
import { EnrollmentTypeTabs } from '../components/EnrollmentTypeTabs';
import { EnrollmentsList } from '../components/EnrollmentsList';
import { MyEnrollmentsHeader } from '../components/MyEnrollmentHeader';
import { useEnrollments } from '../hooks/useEnrollments';

export const MyEnrollmentsPage: FC = () => {
  const [activeTab, setActiveTab] = useState<EnrollmentPeriodType>(
    EnrollmentPeriodType.ELECTIVE_DISCIPLINES
  );

  const { enrollments, isLoading, error, refetch } = useEnrollments(activeTab);

  const handleTabChange = (_: SyntheticEvent, value: EnrollmentPeriodType) => {
    setActiveTab(value);
  };

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <PageContainer>
      <Container
        maxWidth={false}
        sx={{
          height: '100%',
          minWidth: {
            sm: '600px',
            md: '600px',
            lg: '1450px',
          },
          mx: 'auto',
        }}
      >
        <Stack spacing={3}>
          {/* Header Section */}
          <MyEnrollmentsHeader activeTab={activeTab} />

          {/* Main Content Section */}
          <ContentPaper elevation={0}>
            {/* Tab Navigation */}
            <EnrollmentTypeTabs activeTab={activeTab} onChange={handleTabChange} />

            {/* Content Area */}
            <Box
              sx={{
                p: { xs: 2, sm: 3 },
                minHeight: 400,
              }}
            >
              <EnrollmentsList
                enrollments={enrollments}
                type={activeTab}
                isLoading={isLoading}
                error={error}
                onRetry={handleRetry}
              />
            </Box>
          </ContentPaper>
        </Stack>
      </Container>
    </PageContainer>
  );
};