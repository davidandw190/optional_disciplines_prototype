import {
  Alert,
  Box,
  Container,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Assignment,
  BookmarkBorder,
  LibraryBooks,
} from '@mui/icons-material';
import { FC, SyntheticEvent, useState } from 'react';

import { EnrollmentPeriodType } from '../../../types/disciplines/disciplines.enums';
import { EnrollmentsList } from '../components/EnrollmentsList';
import { useEnrollments } from '../hooks/useEnrollments';
import { useStudent } from '../../../contexts/student.context';

const enrollmentTypes = [
  {
    type: EnrollmentPeriodType.ELECTIVE_DISCIPLINES,
    label: 'Elective Disciplines',
    description:
      'Track your elective course selections that allow you to specialize in specific areas of interest within your academic program.',
  },
  {
    type: EnrollmentPeriodType.COMPLEMENTARY_DISCIPLINES,
    label: 'Complementary Disciplines',
    description:
      'Track your interdisciplinary course selections that broaden your academic perspective and provide valuable additional skills.',
  },
  {
    type: EnrollmentPeriodType.THESIS_REGISTRATION,
    label: 'Thesis Registration',
    description:
      'Track your thesis registration and supervision arrangements, and share drafts of your work with your supervisor.',
  },
];

export const MyEnrollmentsPage: FC = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<EnrollmentPeriodType>(
    EnrollmentPeriodType.ELECTIVE_DISCIPLINES
  );

  const { enrollments, isLoading, error } = useEnrollments(activeTab);

  const getEnrollmentTypeIcon = (type: EnrollmentPeriodType) => {
    switch (type) {
      case EnrollmentPeriodType.ELECTIVE_DISCIPLINES:
        return (
          <LibraryBooks
            sx={{ fontSize: 28, color: theme.palette.primary.main }}
          />
        );
      case EnrollmentPeriodType.COMPLEMENTARY_DISCIPLINES:
        return (
          <BookmarkBorder
            sx={{ fontSize: 28, color: theme.palette.primary.main }}
          />
        );
      case EnrollmentPeriodType.THESIS_REGISTRATION:
        return (
          <Assignment
            sx={{ fontSize: 28, color: theme.palette.primary.main }}
          />
        );
      default:
        return null;
    }
  };

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
          <Stack spacing={3}>
            {/* Title Section */}
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" spacing={2} alignItems="center">
                {/* <School
                  sx={{
                    fontSize: 40,
                    color: theme.palette.primary.main,
                  }}
                /> */}
                <Stack spacing={0.5}>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    My Enrollments
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ fontWeight: 500 }}
                  >
                    View and manage enrollments history
                  </Typography>
                </Stack>
              </Stack>
            </Stack>

            {/* Active Tab Information */}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.03),
                borderRadius: 1.5,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                {getEnrollmentTypeIcon(activeTab)}
                <Stack spacing={0.5}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.primary.main,
                    }}
                  >
                    {activeTabInfo?.label}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ maxWidth: 800 }}
                  >
                    {activeTabInfo?.description}
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
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
          {/* Tab Navigation */}
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
                }}
              >
                {error}
              </Alert>
            ) : (
              <EnrollmentsList
                enrollments={enrollments}
                type={activeTab}
                isLoading={isLoading}
              />
            )}
          </Box>
        </Paper>
      </Stack>
    </Container>
  );
};
