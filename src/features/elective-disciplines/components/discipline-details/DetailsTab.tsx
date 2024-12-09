import {
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Close, Grade, Language, Schedule } from '@mui/icons-material';
import { FC, SyntheticEvent } from 'react';

import { Discipline } from '../../../../types/disciplines/disciplines.types';
import { EvaluationTab } from './EvaluationTab';
import { OverviewTab } from './OverviewTab';
import { RequirementsTab } from './RequirementsTab';
import { ResourcesTab } from './ResourcesTab';
import { ScheduleTab } from './ScheduleTab';

interface DetailsTabsProps {
  discipline: Discipline;
  activeTab: number;
  onTabChange: (value: number) => void;
  onClose: () => void;
  onEnroll?: () => void;
  isEnrollmentPeriodActive?: boolean;
  alreadyEnrolled?: boolean;
}

const TabPanel: FC<{
  children?: React.ReactNode;
  value: number;
  index: number;
}> = ({ children, value, index }) => (
  <Box
    role="tabpanel"
    hidden={value !== index}
    id={`discipline-tabpanel-${index}`}
    sx={{ py: 3 }}
  >
    {value === index && children}
  </Box>
);

const getStatusColor = (discipline: Discipline, alreadyEnrolled: boolean) => {
  if (alreadyEnrolled) return 'success';
  if (
    discipline.maxEnrollmentSpots &&
    discipline.currentEnrollmentCount >= discipline.maxEnrollmentSpots
  ) {
    return 'error';
  }
  return 'primary';
};

export const DetailsTabs: FC<DetailsTabsProps> = ({
  discipline,
  activeTab,
  onTabChange,
  onClose,
  onEnroll,
  isEnrollmentPeriodActive = false,
  alreadyEnrolled = false,
}) => {
  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    onTabChange(newValue);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box sx={{ flex: 1, pr: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              {discipline.name}
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ fontFamily: 'monospace', mb: 2 }}
            >
              {discipline.code}
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip
                icon={<Grade fontSize="small" />}
                label={`${discipline.credits} credits`}
                size="small"
                color={getStatusColor(discipline, alreadyEnrolled)}
              />
              <Chip
                icon={<Language fontSize="small" />}
                label={discipline.language}
                size="small"
              />
              <Chip
                icon={<Schedule fontSize="small" />}
                label={`Semester ${discipline.semester}`}
                size="small"
              />
            </Stack>
          </Box>
          <IconButton onClick={onClose} size="small">
            <Close fontSize="small" />
          </IconButton>
        </Stack>
      </Box>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ px: 3, borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="Overview" />
        <Tab label="Schedule & Activities" />
        <Tab label="Requirements" />
        <Tab label="Evaluation" />
        <Tab label="Resources" />
      </Tabs>

      <Box sx={{ overflow: 'auto', flex: 1, px: 3 }}>
        <TabPanel value={activeTab} index={0}>
          <OverviewTab discipline={discipline} />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <ScheduleTab discipline={discipline} />
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          <RequirementsTab discipline={discipline} />
        </TabPanel>
        <TabPanel value={activeTab} index={3}>
          <EvaluationTab discipline={discipline} />
        </TabPanel>
        <TabPanel value={activeTab} index={4}>
          <ResourcesTab discipline={discipline} />
        </TabPanel>
      </Box>

      <Box sx={{ p: 3, borderTop: 1, borderColor: 'divider' }}>
        <Button
          fullWidth
          variant="contained"
          color={getStatusColor(discipline, alreadyEnrolled)}
          onClick={onEnroll}
          disabled={!isEnrollmentPeriodActive || alreadyEnrolled}
        >
          {alreadyEnrolled
            ? 'Already Enrolled'
            : isEnrollmentPeriodActive
            ? 'Enroll in Course'
            : 'Enrollment Closed'}
        </Button>
      </Box>
    </Box>
  );
};