import {
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  alpha,
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

  const scrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: 8,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: alpha(theme.palette.primary.main, 0.2),
      borderRadius: 4,
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.3),
      },
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: alpha(theme.palette.grey[200], 0.5),
      borderRadius: 4,
    },
  };

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
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          bgcolor: alpha(theme.palette.background.paper, 0.8),
          backdropFilter: 'blur(8px)',
        }}
      >
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
                  sx={{ mb: 2, gap: 1 }}
                >
                  <Chip
                    icon={<Grade fontSize="small" />}
                    label={`${discipline.credits} credits`}
                    size="small"
                    color={isSelected ? 'success' : 'primary'}
                    sx={{ 
                      '& .MuiChip-label': { fontWeight: 500 },
                      borderRadius: 1
                    }}
                  />
                  <Chip
                    icon={<Language fontSize="small" />}
                    label={discipline.language}
                    size="small"
                    variant="outlined"
                    sx={{ 
                      '& .MuiChip-label': { fontWeight: 500 },
                      borderRadius: 1
                    }}
                  />
                  <Chip
                    icon={<Schedule fontSize="small" />}
                    label={`Semester ${discipline.semester}`}
                    size="small"
                    variant="outlined"
                    sx={{ 
                      '& .MuiChip-label': { fontWeight: 500 },
                      borderRadius: 1
                    }}
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
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
                    '&:hover': {
                      border: `1px solid ${theme.palette.primary.main}`,
                      bgcolor: alpha(theme.palette.primary.main, 0.04),
                    }
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
                sx={{ gap: 1 }}
              >
                <Chip
                  icon={<Grade fontSize="small" />}
                  label={`${discipline.credits} credits`}
                  size="small"
                  color={isSelected ? 'success' : 'primary'}
                  sx={{ 
                    '& .MuiChip-label': { fontWeight: 500 },
                    borderRadius: 1
                  }}
                />
                <Chip
                  icon={<Language fontSize="small" />}
                  label={discipline.language}
                  size="small"
                  variant="outlined"
                  sx={{ 
                    '& .MuiChip-label': { fontWeight: 500 },
                    borderRadius: 1
                  }}
                />
                <Chip
                  icon={<Schedule fontSize="small" />}
                  label={`Semester ${discipline.semester}`}
                  size="small"
                  variant="outlined"
                  sx={{ 
                    '& .MuiChip-label': { fontWeight: 500 },
                    borderRadius: 1
                  }}
                />
                <Tooltip title="Compare with another discipline">
                  <Chip
                    icon={<CompareArrows fontSize="small" />}
                    label="Compare"
                    size="small"
                    variant="outlined"
                    onClick={onOpenComparison}
                    clickable
                    sx={{
                      fontWeight: 500,
                      borderRadius: 1,
                      transition: 'all 0.2s ease',
                      borderColor: alpha(theme.palette.primary.main, 0.5),
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        borderColor: theme.palette.primary.main,
                      },
                    }}
                  />
                </Tooltip>
              </Stack>
            )}
          </Box>
          <IconButton 
            onClick={onClose} 
            size="small"
            sx={{
              bgcolor: alpha(theme.palette.background.paper, 0.6),
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              '&:hover': {
                bgcolor: alpha(theme.palette.background.paper, 0.8),
              }
            }}
          >
            <Close fontSize="small" />
          </IconButton>
        </Stack>
      </Paper>

      {/* Tab Navigation */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          px: { xs: 2, sm: 3 },
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          minHeight: { xs: 48, sm: 56 },
          bgcolor: alpha(theme.palette.background.paper, 0.6),
          '& .MuiTabs-indicator': {
            height: 3,
            borderRadius: '3px 3px 0 0',
          },
          '& .MuiTab-root': {
            fontWeight: 500,
            textTransform: 'none',
            minHeight: { xs: 48, sm: 56 },
            color: theme.palette.text.secondary,
            '&.Mui-selected': {
              color: theme.palette.primary.main,
              fontWeight: 600,
            },
            '&:hover': {
              color: theme.palette.primary.main,
              opacity: 0.9,
            }
          }
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
          bgcolor: alpha(theme.palette.background.paper, 0.8),
          flex: 1,
          px: { xs: 2, sm: 3 },
          ...scrollbarStyles,
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
            borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            bgcolor: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: 'blur(8px)',
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
              boxShadow: 'none',
              borderRadius: 1.5,
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                boxShadow: `0 4px 12px ${alpha(theme.palette[buttonState.color].main, 0.2)}`,
              },
            }}
          >
            {actionButtonText}
          </Button>
          {buttonState.message && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ 
                display: 'block', 
                mt: 1, 
                textAlign: 'center',
                fontStyle: 'italic'
              }}
            >
              {buttonState.message}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};