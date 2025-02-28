import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Close, CompareArrows, Person } from '@mui/icons-material';
import {
  Discipline,
  DisciplinePacket,
} from '../../../../types/disciplines/disciplines.types';
import { FC, useEffect, useState } from 'react';

import { useGetElectivePacketsQuery } from '../../../../api/elective-disciplines/electiveDisciplinesApi';
import { useParams } from 'react-router-dom';

interface DisciplineComparisonModalProps {
  open: boolean;
  onClose: () => void;
  currentDiscipline: Discipline;
  comparisonDiscipline: Discipline | null;
  onSelectComparisonDiscipline: (discipline: Discipline) => void;
  packet: DisciplinePacket | undefined;
}

export const DisciplineComparisonModal: FC<DisciplineComparisonModalProps> = ({
  open,
  onClose,
  currentDiscipline,
  comparisonDiscipline,
  onSelectComparisonDiscipline,
  packet,
}) => {
  const theme = useTheme();
  const { periodId } = useParams();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [allDisciplines, setAllDisciplines] = useState<Discipline[]>([]);
  const [selectedPacket, setSelectedPacket] = useState<string | null>(
    packet?.id || null
  );

  const { data: packetsData, isLoading } = useGetElectivePacketsQuery(
    periodId || ''
  );

  useEffect(() => {
    if (packetsData) {
      let disciplines: Discipline[] = [];
      packetsData.packets.forEach(({ disciplines: packetDisciplines }) => {
        disciplines = [
          ...disciplines,
          ...packetDisciplines.filter((d) => d.id !== currentDiscipline.id),
        ];
      });
      disciplines = disciplines.filter(
        (discipline, index, self) =>
          index === self.findIndex((d) => d.id === discipline.id)
      );
      setAllDisciplines(disciplines);
    }
  }, [packetsData, currentDiscipline.id]);

  const filteredDisciplines = selectedPacket
    ? allDisciplines.filter((d) => {
        const packetInfo = packetsData?.packets.find(
          (p) => p.packet.id === selectedPacket
        );
        return packetInfo?.disciplines.some((pd) => pd.id === d.id);
      })
    : allDisciplines;

  const availablePackets =
    packetsData?.packets.map((p) => ({
      id: p.packet.id,
      name: p.packet.name,
    })) || [];

  const areValuesEqual = (value1: any, value2: any) => {
    if (value1 === value2) return true;
    if (value1 == null || value2 == null) return false;

    if (typeof value1 === 'number' && typeof value2 === 'number') {
      return value1 === value2;
    }

    if (typeof value1 === 'string' && typeof value2 === 'string') {
      return value1.toLowerCase() === value2.toLowerCase();
    }

    return false;
  };

  // Define comparison sections
  const getComparisonSections = () => [
    {
      title: 'Basic Information',
      fields: [
        {
          label: 'Code',
          value1: currentDiscipline.code,
          value2: comparisonDiscipline?.code,
        },
        {
          label: 'Credits',
          value1: currentDiscipline.credits,
          value2: comparisonDiscipline?.credits,
          isHighlight: true,
        },
        {
          label: 'Language',
          value1: currentDiscipline.language,
          value2: comparisonDiscipline?.language,
        },
        {
          label: 'Assessment Type',
          value1: currentDiscipline.assessmentType,
          value2: comparisonDiscipline?.assessmentType,
        },
        {
          label: 'Weekly Hours',
          value1: `${currentDiscipline.weeklyHours.total} hours/week`,
          value2: comparisonDiscipline
            ? `${comparisonDiscipline.weeklyHours.total} hours/week`
            : null,
        },
      ],
    },
    {
      title: 'Teaching Activities',
      fields: [
        {
          label: 'Course Hours',
          value1: `${currentDiscipline.weeklyHours.course} hours/week`,
          value2: comparisonDiscipline
            ? `${comparisonDiscipline.weeklyHours.course} hours/week`
            : null,
        },
        {
          label: 'Lab Hours',
          value1: currentDiscipline.weeklyHours.laboratory
            ? `${currentDiscipline.weeklyHours.laboratory} hours/week`
            : 'None',
          value2: comparisonDiscipline?.weeklyHours.laboratory
            ? `${comparisonDiscipline.weeklyHours.laboratory} hours/week`
            : 'None',
        },
        {
          label: 'Seminar Hours',
          value1: currentDiscipline.weeklyHours.seminar
            ? `${currentDiscipline.weeklyHours.seminar} hours/week`
            : 'None',
          value2: comparisonDiscipline?.weeklyHours.seminar
            ? `${comparisonDiscipline.weeklyHours.seminar} hours/week`
            : 'None',
        },
      ],
    },
    {
      title: 'Time Allocation',
      fields: [
        {
          label: 'Individual Study',
          value1: `${currentDiscipline.timeAllocation.individualStudyHours} hours`,
          value2: comparisonDiscipline
            ? `${comparisonDiscipline.timeAllocation.individualStudyHours} hours`
            : null,
        },
        {
          label: 'Total Semester Hours',
          value1: `${currentDiscipline.timeAllocation.totalSemesterHours} hours`,
          value2: comparisonDiscipline
            ? `${comparisonDiscipline.timeAllocation.totalSemesterHours} hours`
            : null,
          isHighlight: true,
        },
      ],
    },
    {
      title: 'Evaluation',
      fields: [
        {
          label: 'Evaluation Components',
          value1: currentDiscipline.evaluationSystem.components
            .map((c) => `${c.type} (${c.weightInFinalGrade}%)`)
            .join(', '),
          value2: comparisonDiscipline
            ? comparisonDiscipline.evaluationSystem.components
                .map((c) => `${c.type} (${c.weightInFinalGrade}%)`)
                .join(', ')
            : null,
        },
      ],
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 2,
          height: isMobile ? '100%' : 'auto',
          maxHeight: '90vh',
        },
      }}
    >
      <DialogTitle
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CompareArrows sx={{ mr: 1 }} color="primary" />
          <Typography variant="h6">Discipline Comparison</Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <Close fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Selection Controls */}
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 3,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
              }}
            >
              <Stack spacing={2}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Select a discipline to compare with "{currentDiscipline.name}"
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Autocomplete
                      id="packet-filter"
                      options={availablePackets}
                      getOptionLabel={(option) => option.name}
                      value={
                        availablePackets.find((p) => p.id === selectedPacket) ||
                        null
                      }
                      onChange={(_, newValue) => {
                        setSelectedPacket(newValue?.id || null);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Filter by packet"
                          variant="outlined"
                          size="small"
                        />
                      )}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Autocomplete
                      id="discipline-selector"
                      options={filteredDisciplines}
                      getOptionLabel={(option) =>
                        `${option.code} - ${option.name}`
                      }
                      value={comparisonDiscipline}
                      onChange={(_, newValue) => {
                        if (newValue) {
                          onSelectComparisonDiscipline(newValue);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select discipline to compare"
                          variant="outlined"
                          size="small"
                        />
                      )}
                      fullWidth
                      loading={isLoading}
                      loadingText="Loading disciplines..."
                      noOptionsText="No disciplines available"
                    />
                  </Grid>
                </Grid>
              </Stack>
            </Paper>
          </Grid>

          {/* Comparison Headers */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4} md={3}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  fontWeight={600}
                >
                  Feature
                </Typography>
              </Grid>
              <Grid item xs={4} md={4.5}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 1.5,
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    noWrap
                    textAlign="center"
                  >
                    {currentDiscipline.name}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={4} md={4.5}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 1.5,
                    bgcolor: comparisonDiscipline
                      ? alpha(theme.palette.secondary.main, 0.08)
                      : 'grey.100',
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    noWrap
                    textAlign="center"
                    color={
                      comparisonDiscipline ? 'text.primary' : 'text.secondary'
                    }
                  >
                    {comparisonDiscipline
                      ? comparisonDiscipline.name
                      : 'Select a discipline to compare'}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          {/* Comparison Content */}
          {getComparisonSections().map((section, sectionIndex) => (
            <Grid item xs={12} key={sectionIndex}>
              <Typography
                variant="subtitle1"
                gutterBottom
                fontWeight={600}
                sx={{ mt: sectionIndex > 0 ? 2 : 0 }}
              >
                {section.title}
              </Typography>
              <Paper
                elevation={0}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                {section.fields.map((field, fieldIndex) => (
                  <Box key={fieldIndex}>
                    {fieldIndex > 0 && <Divider />}
                    <Grid
                      container
                      sx={{
                        p: 2,
                        bgcolor: field.isHighlight
                          ? alpha(theme.palette.primary.main, 0.04)
                          : 'inherit',
                      }}
                    >
                      <Grid item xs={4} md={3}>
                        <Typography
                          variant="body2"
                          fontWeight={field.isHighlight ? 600 : 400}
                        >
                          {field.label}
                        </Typography>
                      </Grid>
                      <Grid item xs={4} md={4.5}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight:
                              comparisonDiscipline &&
                              !areValuesEqual(field.value1, field.value2)
                                ? 600
                                : 400,
                            color:
                              comparisonDiscipline &&
                              !areValuesEqual(field.value1, field.value2)
                                ? 'primary.main'
                                : 'text.primary',
                          }}
                        >
                          {field.value1 !== undefined && field.value1 !== null
                            ? field.value1
                            : '-'}
                        </Typography>
                      </Grid>
                      <Grid item xs={4} md={4.5}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight:
                              comparisonDiscipline &&
                              !areValuesEqual(field.value1, field.value2)
                                ? 600
                                : 400,
                            color:
                              comparisonDiscipline &&
                              !areValuesEqual(field.value1, field.value2)
                                ? 'secondary.main'
                                : comparisonDiscipline
                                ? 'text.primary'
                                : 'text.secondary',
                          }}
                        >
                          {field.value2 !== undefined && field.value2 !== null
                            ? field.value2
                            : '-'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Paper>
            </Grid>
          ))}

          {/* Description Comparison */}
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              gutterBottom
              fontWeight={600}
              sx={{ mt: 2 }}
            >
              Description
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    height: '100%',
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    color="primary"
                    gutterBottom
                  >
                    {currentDiscipline.name}
                  </Typography>
                  <Typography variant="body2">
                    {currentDiscipline.description}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    height: '100%',
                    bgcolor: comparisonDiscipline ? 'inherit' : 'grey.50',
                  }}
                >
                  {comparisonDiscipline ? (
                    <>
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        color="secondary"
                        gutterBottom
                      >
                        {comparisonDiscipline.name}
                      </Typography>
                      <Typography variant="body2">
                        {comparisonDiscipline.description}
                      </Typography>
                    </>
                  ) : (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="center"
                      sx={{ py: 4 }}
                    >
                      Select a discipline to compare descriptions
                    </Typography>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          {/* Learning Outcomes Comparison */}
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              gutterBottom
              fontWeight={600}
              sx={{ mt: 2 }}
            >
              Learning Outcomes
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    height: '100%',
                  }}
                >
                  {currentDiscipline.learningOutcomes.map((outcome, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Typography
                        variant="subtitle2"
                        color="primary"
                        gutterBottom
                      >
                        {outcome.category}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {outcome.description}
                      </Typography>
                      <Box component="ul" sx={{ pl: 2, mt: 1 }}>
                        {outcome.outcomes.map((item, idx) => (
                          <Box component="li" key={idx} sx={{ mb: 0.5 }}>
                            <Typography variant="body2">{item}</Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  ))}
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    height: '100%',
                    bgcolor: comparisonDiscipline ? 'inherit' : 'grey.50',
                  }}
                >
                  {comparisonDiscipline ? (
                    comparisonDiscipline.learningOutcomes.map(
                      (outcome, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                          <Typography
                            variant="subtitle2"
                            color="secondary"
                            gutterBottom
                          >
                            {outcome.category}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            {outcome.description}
                          </Typography>
                          <Box component="ul" sx={{ pl: 2, mt: 1 }}>
                            {outcome.outcomes.map((item, idx) => (
                              <Box component="li" key={idx} sx={{ mb: 0.5 }}>
                                <Typography variant="body2">{item}</Typography>
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      )
                    )
                  ) : (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="center"
                      sx={{ py: 4 }}
                    >
                      Select a discipline to compare learning outcomes
                    </Typography>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          {/* Teaching Staff Comparison */}
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              gutterBottom
              fontWeight={600}
              sx={{ mt: 2 }}
            >
              Teaching Staff
            </Typography>
            <Paper
              elevation={0}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <Grid container>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    p: 2,
                    borderRight: { xs: 0, md: 1 },
                    borderBottom: { xs: 1, md: 0 },
                    borderColor: 'divider',
                  }}
                >
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    {currentDiscipline.name}
                  </Typography>
                  {currentDiscipline.teachingActivities.map(
                    (activity, index) => (
                      <Stack
                        key={index}
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{ mb: 1 }}
                      >
                        <Person fontSize="small" color="primary" />
                        <Typography variant="body2">
                          <strong>{activity.type}:</strong>{' '}
                          {activity.teacher.academicTitle.abbreviation}.{' '}
                          {activity.teacher.firstName}{' '}
                          {activity.teacher.lastName}
                        </Typography>
                      </Stack>
                    )
                  )}
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    p: 2,
                    bgcolor: comparisonDiscipline ? 'inherit' : 'grey.50',
                  }}
                >
                  {comparisonDiscipline ? (
                    <>
                      <Typography
                        variant="subtitle2"
                        color="secondary"
                        gutterBottom
                      >
                        {comparisonDiscipline.name}
                      </Typography>
                      {comparisonDiscipline.teachingActivities.map(
                        (activity, index) => (
                          <Stack
                            key={index}
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            sx={{ mb: 1 }}
                          >
                            <Person fontSize="small" color="secondary" />
                            <Typography variant="body2">
                              <strong>{activity.type}:</strong>{' '}
                              {activity.teacher.academicTitle.abbreviation}.{' '}
                              {activity.teacher.firstName}{' '}
                              {activity.teacher.lastName}
                            </Typography>
                          </Stack>
                        )
                      )}
                    </>
                  ) : (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="center"
                      sx={{ py: 2 }}
                    >
                      Select a discipline to compare teaching staff
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Button onClick={onClose} color="inherit">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
