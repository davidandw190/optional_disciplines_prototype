import {
  Alert,
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { Close, Grade, Language, Schedule } from '@mui/icons-material';
import {
  Discipline,
  DisciplinePacket,
} from '../../../../types/disciplines/disciplines.types';
import { FC, SyntheticEvent } from 'react';

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
  onAddToSelection: () => void;
  isEnrollmentPeriodActive: boolean;
  isSelected: boolean;
  canBeSelected: boolean;
  actionButtonText: string;
  enrollmentInfo: {
    packet: DisciplinePacket | undefined;
    selections: {
      packetName: string;
      remainingSelections: number;
      maxSelections: number;
    } | null;
  };
}

export const DetailsTabs: FC<DetailsTabsProps> = ({
  discipline,
  activeTab,
  onTabChange,
  onClose,
  onAddToSelection,
  isEnrollmentPeriodActive,
  isSelected,
  canBeSelected,
  actionButtonText,
  enrollmentInfo,
}) => {
  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    onTabChange(newValue);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header Section */}
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
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
                color={isSelected ? 'success' : 'primary'}
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

        {isEnrollmentPeriodActive && enrollmentInfo.selections && (
          <Box sx={{ mt: 2 }}>
            <Alert 
              severity={isSelected ? "success" : canBeSelected ? "info" : "warning"}
              sx={{ mb: 2 }}
            >
              {isSelected ? (
                `This discipline is in your selection for ${enrollmentInfo.selections.packetName}`
              ) : canBeSelected ? (
                `You can add this discipline to ${enrollmentInfo.selections.packetName} (${enrollmentInfo.selections.remainingSelections} selections remaining)`
              ) : (
                `You have already selected ${enrollmentInfo.selections.maxSelections} disciplines for ${enrollmentInfo.selections.packetName}`
              )}
            </Alert>
          </Box>
        )}
      </Box>

      {/* Tabs Navigation */}
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

      {/* Tab Content */}
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

      {/* Action Footer */}
      {isEnrollmentPeriodActive && (
        <Box sx={{ p: 3, borderTop: 1, borderColor: 'divider' }}>
          <Button
            fullWidth
            variant="contained"
            color={isSelected ? "success" : "primary"}
            onClick={onAddToSelection}
            disabled={!canBeSelected || isSelected}
          >
            {actionButtonText}
          </Button>
        </Box>
      )}
    </Box>
  );
};

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
