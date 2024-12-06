import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import {
  Assessment,
  CalendarToday,
  Close,
  ExpandMore,
  Grade,
  Group,
  Language,
  MenuBook,
  Schedule,
  School,
} from '@mui/icons-material';
import { Discipline, TeachingActivity } from '../../../types/disciplines/disciplines.types';
import { FC, SyntheticEvent, useState } from 'react';

import { TeachingLanguage } from '../../../types/disciplines/disciplines.enums';

interface DisciplineDetailsProps {
  discipline: Discipline;
  onClose: () => void;
  onEnroll?: () => Promise<void>;
  isEnrollmentPeriodActive?: boolean;
  alreadyEnrolled?: boolean;
  isEnrolling?: boolean;
}

export const DisciplineDetails: FC<DisciplineDetailsProps> = ({
  discipline,
  onClose,
  onEnroll,
  isEnrollmentPeriodActive = false,
  alreadyEnrolled = false,
  isEnrolling = false,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedSection, setExpandedSection] = useState<string | false>('overview');

  const handleTabChange = (_event: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleAccordionChange = (panel: string) => (
    _event: SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpandedSection(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Course Details
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close fontSize="small" />
          </IconButton>
        </Stack>
      </Box>

      <Box sx={{ p: 3, bgcolor: 'background.default' }}>
        <Stack spacing={2}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {discipline.name}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontFamily: 'monospace', color: 'text.secondary' }}
          >
            {discipline.code}
          </Typography>
          
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip
              icon={<Grade fontSize="small" />}
              label={`${discipline.credits} credits`}
              size="small"
              color="primary"
            />
            <Chip
              icon={<Language fontSize="small" />}
              label={discipline.language === TeachingLanguage.EN ? 'English' : 'Romanian'}
              size="small"
              variant="outlined"
            />
            <Chip
              icon={<Schedule fontSize="small" />}
              label={`${discipline.weeklyHours.total}h/week`}
              size="small"
              variant="outlined"
            />
            <Chip
              icon={<CalendarToday fontSize="small" />}
              label={`Semester ${discipline.semester}`}
              size="small"
              variant="outlined"
            />
          </Stack>
        </Stack>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <Accordion
          expanded={expandedSection === 'overview'}
          onChange={handleAccordionChange('overview')}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Stack direction="row" spacing={1} alignItems="center">
              <MenuBook fontSize="small" />
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                Overview
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={3}>
              {/* prereqs */}
              {discipline.prerequisites && (
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    Prerequisites
                  </Typography>
                  <Stack spacing={1}>
                    {discipline.prerequisites.requiredDisciplines?.map((req) => (
                      <Typography key={req.code} variant="body2">
                        • {req.name} ({req.code})
                      </Typography>
                    ))}
                    {discipline.prerequisites.requiredSkills.map((skill, index) => (
                      <Typography key={index} variant="body2">
                        • {skill}
                      </Typography>
                    ))}
                  </Stack>
                </Box>
              )}

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Learning Outcomes
                </Typography>
                <Stack spacing={2}>
                  {discipline.learningOutcomes.map((outcome) => (
                    <Box key={outcome.id}>
                      <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                        {outcome.category}:
                      </Typography>
                      <Stack spacing={0.5}>
                        {outcome.outcomes.map((item, index) => (
                          <Typography key={index} variant="body2">
                            • {item}
                          </Typography>
                        ))}
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expandedSection === 'activities'}
          onChange={handleAccordionChange('activities')}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Stack direction="row" spacing={1} alignItems="center">
              <School fontSize="small" />
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                Teaching Activities
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={3}>
              {discipline.teachingActivities.map((activity) => (
                <TeachingActivitySection
                  key={activity.id}
                  activity={activity}
                />
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expandedSection === 'evaluation'}
          onChange={handleAccordionChange('evaluation')}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Assessment fontSize="small" />
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                Evaluation
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={3}>
              {/* evaluation */}
              {discipline.evaluationSystem.components.map((component) => (
                <Box key={component.id}>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    {component.type} ({component.weightInFinalGrade}%)
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="body2">
                      Minimum grade required: {component.minimumGrade || 'N/A'}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Evaluation Methods:
                    </Typography>
                    {component.evaluationMethods.map((method, index) => (
                      <Typography key={index} variant="body2">
                        • {method}
                      </Typography>
                    ))}
                  </Stack>
                </Box>
              ))}

              {/* additional reqs */}
              {discipline.evaluationSystem.minimumRequirements.length > 0 && (
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    Additional Requirements
                  </Typography>
                  <Stack spacing={0.5}>
                    {discipline.evaluationSystem.minimumRequirements.map((req, index) => (
                      <Typography key={index} variant="body2">
                        • {req}
                      </Typography>
                    ))}
                  </Stack>
                </Box>
              )}
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Footer with Enrollment Status and Action */}
      <Box sx={{ p: 3, borderTop: 1, borderColor: 'divider' }}>
        <Stack spacing={2}>
          {discipline.maxEnrollmentSpots && (
            <Typography variant="body2" color="text.secondary">
              Available spots: {discipline.maxEnrollmentSpots - (discipline.currentEnrollmentCount || 0)} 
              of {discipline.maxEnrollmentSpots}
            </Typography>
          )}
          
          {alreadyEnrolled ? (
            <Alert severity="success">
              You are enrolled in this course
            </Alert>
          ) : isEnrollmentPeriodActive && onEnroll ? (
            <Button
              variant="contained"
              onClick={onEnroll}
              disabled={isEnrolling}
              startIcon={isEnrolling ? <CircularProgress size={20} /> : null}
              fullWidth
            >
              {isEnrolling ? 'Enrolling...' : 'Enroll in Course'}
            </Button>
          ) : null}
        </Stack>
      </Box>
    </Box>
  );
};

// Helper component for teaching activities
const TeachingActivitySection: FC<{ activity: TeachingActivity }> = ({ activity }) => (
  <Box>
    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
      {activity.type} ({activity.hoursPerWeek}h/week)
    </Typography>
    <Stack spacing={2}>
      {/* Teacher Information */}
      <Stack direction="row" spacing={1} alignItems="center">
        <Group fontSize="small" color="action" />
        <Typography variant="body2">
          {activity.teacher.academicTitle.abbreviation}. {activity.teacher.firstName}{' '}
          {activity.teacher.lastName}
        </Typography>
      </Stack>

      {/* Teaching Methods */}
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
          Teaching Methods:
        </Typography>
        <Stack spacing={0.5}>
          {activity.teachingMethods.map((method, index) => (
            <Typography key={index} variant="body2">
              • {method}
            </Typography>
          ))}
        </Stack>
      </Box>

      {/* Location and Requirements */}
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
          Location: {activity.conditions.location}
        </Typography>
        {activity.conditions.requirements.length > 0 && (
          <>
            <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
              Requirements:
            </Typography>
            <Stack spacing={0.5}>
              {activity.conditions.requirements.map((req, index) => (
                <Typography key={index} variant="body2">
                  • {req}
                </Typography>
              ))}
            </Stack>
          </>
        )}
      </Box>
    </Stack>
  </Box>
);

export default DisciplineDetails;