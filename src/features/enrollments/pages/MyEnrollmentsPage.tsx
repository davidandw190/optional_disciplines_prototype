import {
  Alert,
  Box,
  Container,
  Grid,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import { FC, SyntheticEvent, useState } from 'react';

import { ContentSkeleton } from '../../elective-disciplines/components/skeletons/ContentSkeleton';
import { EnrollmentPeriodType } from '../../../types/disciplines/disciplines.enums';
import { EnrollmentsList } from '../components/EnrollmentsList';
import { useEnrollments } from '../hooks/useEnrollments';

const enrollmentTypes = [
  {
    type: EnrollmentPeriodType.ELECTIVE_DISCIPLINES,
    label: 'Elective Disciplines',
    description:
      'View and manage your elective discipline enrollments across academic periods',
  },
  {
    type: EnrollmentPeriodType.COMPLEMENTARY_DISCIPLINES,
    label: 'Complementary Disciplines',
    description:
      'Track your complementary discipline selections and enrollment status',
  },
  {
    type: EnrollmentPeriodType.THESIS_REGISTRATION,
    label: 'Thesis Registration',
    description:
      'Access your thesis topic registrations and supervision assignments',
  },
];

export const MyEnrollmentsPage: FC = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<EnrollmentPeriodType>(
    EnrollmentPeriodType.ELECTIVE_DISCIPLINES
  );

  const { enrollments, isLoading, error } = useEnrollments(activeTab);

  const handleTabChange = (_: SyntheticEvent, value: EnrollmentPeriodType) => {
    setActiveTab(value);
  };

  const activeTabInfo = enrollmentTypes.find((tab) => tab.type === activeTab);

  return (
    <Container
      maxWidth={false}
      sx={{
        py: { xs: 2, sm: 3 },
        px: { xs: 2, sm: 3 },
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
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: theme.palette.background.paper,
            width: '100%',
          }}
        >
          <Stack spacing={2}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              My Enrollments
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {activeTabInfo?.description}
            </Typography>
          </Stack>
        </Paper>

        {/* Main Content Section */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: theme.palette.background.paper,
            overflow: 'hidden',
            width: '100%',
          }}
        >
          {/* Tabs Navigation */}
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              bgcolor: alpha(theme.palette.primary.main, 0.03),
            }}
          >
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                px: { xs: 2, sm: 3 },
                '& .MuiTabs-indicator': {
                  height: 3,
                },
              }}
            >
              {enrollmentTypes.map(({ type, label }) => (
                <Tab
                  key={type}
                  value={type}
                  label={label}
                  sx={{
                    minHeight: 56,
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '0.9375rem',
                  }}
                />
              ))}
            </Tabs>
          </Box>

          {/* Content Area */}
          <Box
            sx={{
              p: { xs: 2, sm: 3 },
              minHeight: 400,
            }}
          >
            {error ? (
              <Alert
                severity="error"
                sx={{
                  mb: 2,
                  '& .MuiAlert-message': {
                    width: '100%',
                  },
                }}
              >
                {error}
              </Alert>
            ) : isLoading ? (
              <ContentSkeleton />
            ) : (
              <EnrollmentsList enrollments={enrollments} type={activeTab} />
            )}
          </Box>
        </Paper>
      </Stack>
    </Container>
  );
};
