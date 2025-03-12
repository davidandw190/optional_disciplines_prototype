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
import {
  Close,
  CompareArrows,
  Grade,
  Language,
  Schedule,
} from '@mui/icons-material';
import {
  Discipline,
  DisciplinePacket,
} from '../../../../types/disciplines/disciplines.types';
import { FC, SyntheticEvent, useMemo } from 'react';

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
  isMobile: boolean;
  onOpenComparison: () => void;
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
  isMobile,
  onOpenComparison,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    onTabChange(newValue);
  };

  const buttonState = useMemo(() => {
    if (!isEnrollmentPeriodActive) {
      return {
        disabled: true,
        color: 'primary' as const,
        message: null,
      };
    }

    if (!enrollmentInfo.packet) {
      return {
        disabled: true,
        color: 'primary' as const,
        message: 'This discipline is not available for selection',
      };
    }

    if (isSelected) {
      return {
        disabled: true,
        color: 'success' as const,
        message: `Already selected in ${enrollmentInfo.selections?.packetName}`,
      };
    }

    if (!canBeSelected) {
      return {
        disabled: true,
        color: 'primary' as const,
        message: `Maximum selections reached for ${enrollmentInfo.selections?.packetName} (${enrollmentInfo.selections?.maxSelections}/${enrollmentInfo.selections?.maxSelections})`,
      };
    }

    return {
      disabled: false,
      color: 'primary' as const,
      message: null,
    };
  }, [isEnrollmentPeriodActive, enrollmentInfo, isSelected, canBeSelected]);

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Header Section with Discipline Information */}
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

            {isSmallScreen ? (
              <>
                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"
                  useFlexGap
                  sx={{ mb: 2 }}
                >
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

                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<CompareArrows />}
                  onClick={onOpenComparison}
                  fullWidth
                  size="medium"
                  sx={{
                    mt: 1,
                    height: 40,
                    borderRadius: 1.5,
                    textTransform: 'none',
                    fontWeight: 500,
                  }}
                >
                  Compare with another discipline
                </Button>
              </>
            ) : (
              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                useFlexGap
                alignItems="center"
              >
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
                <Chip
                  icon={<CompareArrows fontSize="small" />}
                  label="Compare"
                  size="small"
                  variant="outlined"
                  // clickable
                  onClick={onOpenComparison}
                  // sx={{
                  //   fontWeight: 500,
                  //   '&:hover': {
                  //     backgroundColor: (theme) => theme.palette.primary.light,
                  //     color: 'white',
                  //     '& .MuiChip-icon': {
                  //       color: 'white',
                  //     },
                  //   },
                  // }}
                />
              </Stack>
            )}
          </Box>
          <IconButton onClick={onClose} size="small">
            <Close fontSize="small" />
          </IconButton>
        </Stack>
      </Box>

      {/* Tab Navigation */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          px: { xs: 2, sm: 3 },
          borderBottom: 1,
          borderColor: 'divider',
          minHeight: { xs: 48, sm: 56 },
        }}
      >
        <Tab label="Overview" />
        <Tab label="Schedule & Activities" />
        <Tab label="Requirements" />
        <Tab label="Evaluation" />
        <Tab label="Resources" />
      </Tabs>

      {/* Tab Content Area */}
      <Box
        sx={{
          overflow: 'auto',
          flex: 1,
          px: { xs: 2, sm: 3 },
          ...(isMobile && {
            pb: '80px',
          }),
        }}
      >
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
        <Box
          sx={{
            p: { xs: 2, sm: 3 },
            borderTop: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
            ...(isMobile && {
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 1,
              boxShadow: 3,
            }),
          }}
        >
          <Button
            fullWidth
            variant="contained"
            color={buttonState.color}
            onClick={onAddToSelection}
            disabled={buttonState.disabled}
            sx={{
              height: { xs: 44, sm: 52 },
              opacity: buttonState.disabled ? 0.7 : 1,
              transition: 'opacity 0.2s ease',
            }}
          >
            {actionButtonText}
          </Button>
        </Box>
      )}
    </Box>
  );
};
