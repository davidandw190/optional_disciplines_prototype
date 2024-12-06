import {
  AccessTime,
  Assignment,
  BookOutlined,
  Close,
  Email,
  Grade,
  Language,
  MenuBook,
  Person,
  Schedule,
  School,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FC, SyntheticEvent, useState } from 'react';

import { Discipline } from '../../../types/disciplines/disciplines.types';
import { TeachingLanguage } from '../../../types/disciplines/disciplines.enums';

interface DisciplineDetailsDrawerProps {
  discipline: Discipline;
  open: boolean;
  onClose: () => void;
  onEnroll?: () => void;
  isEnrollmentPeriodActive?: boolean;
  alreadyEnrolled?: boolean;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: FC<TabPanelProps> = ({ children, value, index }) => (
  <Box
    role="tabpanel"
    hidden={value !== index}
    id={`discipline-tabpanel-${index}`}
    aria-labelledby={`discipline-tab-${index}`}
    sx={{ py: 3 }}
  >
    {value === index && children}
  </Box>
);

export const DisciplineDetailsDrawer: FC<DisciplineDetailsDrawerProps> = ({
  discipline,
  open,
  onClose,
  onEnroll,
  isEnrollmentPeriodActive = false,
  alreadyEnrolled = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const getStatusColor = () => {
    if (alreadyEnrolled) return 'success';
    if (
      discipline.maxEnrollmentSpots &&
      discipline.currentEnrollmentCount >= discipline.maxEnrollmentSpots
    ) {
      return 'error';
    }
    return 'primary';
  };

  return (
    <Drawer
      anchor={isMobile ? 'bottom' : 'right'}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: isMobile ? '100%' : '800px',
          maxHeight: isMobile ? '90vh' : '100vh',
          borderTopLeftRadius: isMobile ? theme.shape.borderRadius : 0,
          borderTopRightRadius: isMobile ? theme.shape.borderRadius : 0,
        },
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
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
                  color={getStatusColor()}
                />
                <Chip
                  icon={<Language fontSize="small" />}
                  label={
                    discipline.language === TeachingLanguage.EN
                      ? 'English'
                      : 'Romanian'
                  }
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

        {/* tabs navigation */}
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

        {/* tabs content */}
        <Box sx={{ overflow: 'auto', flex: 1, px: 3 }}>
          <TabPanel value={activeTab} index={0}>
            <Stack spacing={3}>
              <Box>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ fontWeight: 600 }}
                >
                  Course Description
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {discipline.description || 'No description available.'}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ fontWeight: 600 }}
                >
                  Learning Outcomes
                </Typography>
                <List disablePadding>
                  {discipline.learningOutcomes.map((outcome, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <School fontSize="small" color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={outcome.description}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Stack>
          </TabPanel>

          {/* schedule & activities tab */}
          <TabPanel value={activeTab} index={1}>
            <Stack spacing={3}>
              {discipline.teachingActivities.map((activity, index) => (
                <Box key={index}>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {activity.type}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <Typography variant="body2" color="text.secondary">
                          Teacher:
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Person fontSize="small" color="primary" />
                          <Typography variant="body2">
                            {activity.teacher.academicTitle.abbreviation}.{' '}
                            {activity.teacher.firstName}{' '}
                            {activity.teacher.lastName}
                          </Typography>
                        </Stack>
                        {activity.teacher.email && (
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <Email fontSize="small" color="primary" />
                            <Typography variant="body2">
                              {activity.teacher.email}
                            </Typography>
                          </Stack>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <Typography variant="body2" color="text.secondary">
                          Schedule:
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <AccessTime fontSize="small" color="primary" />
                          <Typography variant="body2">
                            {activity.hoursPerWeek} hours/week
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Stack>
          </TabPanel>

          {/* requirements tab */}
          <TabPanel value={activeTab} index={2}>
            <Stack spacing={3}>
              {discipline.prerequisites && (
                <Box>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    Prerequisites
                  </Typography>
                  <List disablePadding>
                    {discipline.prerequisites.requiredDisciplines?.map(
                      (req, index) => (
                        <ListItem key={index} sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <BookOutlined fontSize="small" color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary={req.name}
                            secondary={req.code}
                            primaryTypographyProps={{ variant: 'body2' }}
                            secondaryTypographyProps={{ variant: 'caption' }}
                          />
                        </ListItem>
                      )
                    )}
                  </List>
                </Box>
              )}
            </Stack>
          </TabPanel>

          {/* evaluation tab */}
          <TabPanel value={activeTab} index={3}>
            <Stack spacing={3}>
              {discipline.evaluationSystem && (
                <>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      Evaluation Components
                    </Typography>
                    <List disablePadding>
                      {discipline.evaluationSystem.components.map(
                        (component, index) => (
                          <ListItem key={index} sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <Assignment fontSize="small" color="primary" />
                            </ListItemIcon>
                            <ListItemText
                              primary={`${component.type} (${component.weightInFinalGrade}%)`}
                              secondary={component.description}
                              primaryTypographyProps={{ variant: 'body2' }}
                              secondaryTypographyProps={{
                                variant: 'body2',
                                color: 'text.secondary',
                              }}
                            />
                          </ListItem>
                        )
                      )}
                    </List>
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      Minimum Requirements
                    </Typography>
                    <List disablePadding>
                      {discipline.evaluationSystem.minimumRequirements.map(
                        (req, index) => (
                          <ListItem key={index} sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <Grade fontSize="small" color="primary" />
                            </ListItemIcon>
                            <ListItemText
                              primary={req}
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        )
                      )}
                    </List>
                  </Box>
                </>
              )}
            </Stack>
          </TabPanel>

          {/* resources tab */}
          <TabPanel value={activeTab} index={4}>
            <Stack spacing={3}>
              {discipline.bibliography && (
                <>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      Required Reading
                    </Typography>
                    <List disablePadding>
                      {discipline.bibliography.required.map((book, index) => (
                        <ListItem key={index} sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <MenuBook fontSize="small" color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary={book.title}
                            secondary={`${book.authors} (${book.year})`}
                            primaryTypographyProps={{ variant: 'body2' }}
                            secondaryTypographyProps={{ variant: 'caption' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </>
              )}
            </Stack>
          </TabPanel>
        </Box>

        {/* footer */}
        <Box sx={{ p: 3, borderTop: 1, borderColor: 'divider' }}>
          <Button
            fullWidth
            variant="contained"
            color={getStatusColor()}
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
    </Drawer>
  );
};

export default DisciplineDetailsDrawer;
