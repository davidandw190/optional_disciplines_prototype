import {
  AccessTime,
  Close,
  CompareArrows,
  FilterList,
  Grade,
  KeyboardArrowDown,
  Language,
  Person,
  School,
} from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  Fade,
  Grid,
  IconButton,
  Paper,
  Slide,
  Stack,
  SwipeableDrawer,
  TextField,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Discipline,
  DisciplinePacket,
} from '../../../../types/disciplines/disciplines.types';
import { FC, useEffect, useRef, useState } from 'react';

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
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [allDisciplines, setAllDisciplines] = useState<Discipline[]>([]);
  const [selectedPacket, setSelectedPacket] = useState<string | null>(
    packet?.id || null
  );
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

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

      if (packet && !selectedPacket) {
        setSelectedPacket(packet.id);
      }
    }
  }, [packetsData, currentDiscipline.id, packet, selectedPacket]);

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

  useEffect(() => {
    if (open && contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [open, comparisonDiscipline]);

  // Helper function to determine if values are equal
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

  // Render selection controls
  const renderSelectionControls = () => (
    <Paper
      elevation={0}
      sx={{
        p: isMobile ? 2 : 2.5,
        mb: 3,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
      }}
    >
      <Stack spacing={isMobile ? 1.5 : 2}>
        {!isMobile && (
          <Typography variant="subtitle1" fontWeight={600}>
            Select a discipline to compare with "{currentDiscipline.name}"
          </Typography>
        )}

        {isMobile ? (
          <>
            <Box sx={{ width: '100%' }}>
              <Autocomplete
                id="discipline-selector-mobile"
                options={filteredDisciplines}
                getOptionLabel={(option) => `${option.code} - ${option.name}`}
                value={comparisonDiscipline}
                onChange={(_, newValue) => {
                  if (newValue) {
                    onSelectComparisonDiscipline(newValue);
                    setIsFilterOpen(false);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select discipline to compare"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                )}
                loading={isLoading}
                loadingText="Loading disciplines..."
                noOptionsText="No disciplines available"
              />
            </Box>

            <Button
              variant="outlined"
              color="primary"
              startIcon={<FilterList />}
              endIcon={isFilterOpen ? <KeyboardArrowDown /> : undefined}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              size="small"
              sx={{
                alignSelf: 'flex-start',
                textTransform: 'none',
                fontWeight: 500,
                borderRadius: 8,
              }}
            >
              Filter by packet
            </Button>

            <Collapse in={isFilterOpen}>
              <Stack spacing={1} sx={{ mt: 1 }}>
                {availablePackets.map((packet) => (
                  <Chip
                    key={packet.id}
                    label={packet.name}
                    clickable
                    variant={
                      selectedPacket === packet.id ? 'filled' : 'outlined'
                    }
                    color={selectedPacket === packet.id ? 'primary' : 'default'}
                    onClick={() => setSelectedPacket(packet.id)}
                    sx={{ mb: 0.5 }}
                  />
                ))}
                {selectedPacket && (
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => setSelectedPacket(null)}
                    sx={{ alignSelf: 'flex-start', mt: 1 }}
                  >
                    Show all disciplines
                  </Button>
                )}
              </Stack>
            </Collapse>
          </>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Autocomplete
                id="packet-filter"
                options={availablePackets}
                getOptionLabel={(option) => option.name}
                value={
                  availablePackets.find((p) => p.id === selectedPacket) || null
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
                getOptionLabel={(option) => `${option.code} - ${option.name}`}
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
        )}
      </Stack>
    </Paper>
  );

  // Render comparison headers
  const renderComparisonHeaders = () => (
    <Grid container spacing={isMobile ? 1 : 2} sx={{ mb: isMobile ? 1 : 2 }}>
      <Grid item xs={isSmallMobile ? 3 : 4} md={3}>
        <Typography
          variant={isSmallMobile ? 'caption' : 'subtitle2'}
          color="text.secondary"
          fontWeight={600}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            pl: isSmallMobile ? 0.5 : 1,
          }}
        >
          Feature
        </Typography>
      </Grid>
      <Grid item xs={isSmallMobile ? 4.5 : 4} md={4.5}>
        <Paper
          elevation={0}
          sx={{
            p: isSmallMobile ? 1 : 1.5,
            bgcolor: alpha(theme.palette.primary.main, 0.08),
            borderRadius: 2,
          }}
        >
          <Typography
            variant={isSmallMobile ? 'caption' : 'subtitle2'}
            fontWeight={600}
            noWrap
            textAlign="center"
            title={currentDiscipline.name}
          >
            {currentDiscipline.name}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={isSmallMobile ? 4.5 : 4} md={4.5}>
        <Paper
          elevation={0}
          sx={{
            p: isSmallMobile ? 1 : 1.5,
            bgcolor: comparisonDiscipline
              ? alpha(theme.palette.secondary.main, 0.08)
              : 'grey.100',
            borderRadius: 2,
          }}
        >
          <Typography
            variant={isSmallMobile ? 'caption' : 'subtitle2'}
            fontWeight={600}
            noWrap
            textAlign="center"
            color={comparisonDiscipline ? 'text.primary' : 'text.secondary'}
            title={
              comparisonDiscipline?.name || 'Select a discipline to compare'
            }
          >
            {comparisonDiscipline
              ? comparisonDiscipline.name
              : 'Select a discipline'}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );

  // Render detailed comparison content
  const renderComparisonContent = () => (
    <>
      {getComparisonSections().map((section, sectionIndex) => (
        <Box key={sectionIndex} sx={{ mb: 3 }}>
          <Typography
            variant={isMobile ? 'body1' : 'subtitle1'}
            gutterBottom
            fontWeight={600}
            sx={{
              mt: sectionIndex > 0 ? 2 : 0,
              fontSize: isMobile ? '0.95rem' : undefined,
            }}
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
                    p: isMobile ? 1.5 : 2,
                    bgcolor: field.isHighlight
                      ? alpha(theme.palette.primary.main, 0.04)
                      : 'inherit',
                  }}
                >
                  <Grid item xs={isSmallMobile ? 3 : 4} md={3}>
                    <Typography
                      variant={isSmallMobile ? 'caption' : 'body2'}
                      fontWeight={field.isHighlight ? 600 : 400}
                    >
                      {field.label}
                    </Typography>
                  </Grid>
                  <Grid item xs={isSmallMobile ? 4.5 : 4} md={4.5}>
                    <Typography
                      variant={isSmallMobile ? 'caption' : 'body2'}
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
                  <Grid item xs={isSmallMobile ? 4.5 : 4} md={4.5}>
                    <Typography
                      variant={isSmallMobile ? 'caption' : 'body2'}
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
        </Box>
      ))}

      {/* Description Comparison */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant={isMobile ? 'body1' : 'subtitle1'}
          gutterBottom
          fontWeight={600}
          sx={{ mt: 2, fontSize: isMobile ? '0.95rem' : undefined }}
        >
          Description
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: isMobile ? 1.5 : 2.5,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                height: '100%',
              }}
            >
              <Typography
                variant={isMobile ? 'body2' : 'subtitle2'}
                fontWeight={600}
                color="primary"
                gutterBottom
              >
                {currentDiscipline.name}
              </Typography>
              <Typography variant={isMobile ? 'caption' : 'body2'}>
                {currentDiscipline.description}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: isMobile ? 1.5 : 2.5,
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
                    variant={isMobile ? 'body2' : 'subtitle2'}
                    fontWeight={600}
                    color="secondary"
                    gutterBottom
                  >
                    {comparisonDiscipline.name}
                  </Typography>
                  <Typography variant={isMobile ? 'caption' : 'body2'}>
                    {comparisonDiscipline.description}
                  </Typography>
                </>
              ) : (
                <Typography
                  variant={isMobile ? 'caption' : 'body2'}
                  color="text.secondary"
                  textAlign="center"
                  sx={{ py: isMobile ? 2 : 4 }}
                >
                  Select a discipline to compare descriptions
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Learning Outcomes Comparison - Simplified for mobile */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant={isMobile ? 'body1' : 'subtitle1'}
          gutterBottom
          fontWeight={600}
          sx={{ mt: 2, fontSize: isMobile ? '0.95rem' : undefined }}
        >
          Learning Outcomes
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: isMobile ? 1.5 : 2.5,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                height: '100%',
              }}
            >
              {currentDiscipline.learningOutcomes.map((outcome, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography
                    variant={isMobile ? 'body2' : 'subtitle2'}
                    color="primary"
                    gutterBottom
                  >
                    {outcome.category}
                  </Typography>
                  {!isMobile && (
                    <Typography variant="body2" gutterBottom>
                      {outcome.description}
                    </Typography>
                  )}
                  <Box
                    component="ul"
                    sx={{
                      pl: isMobile ? 1.5 : 2,
                      mt: 1,
                      listStyleType: isMobile ? 'disc' : 'circle',
                    }}
                  >
                    {outcome.outcomes.map((item, idx) => (
                      <Box component="li" key={idx} sx={{ mb: 0.5 }}>
                        <Typography variant={isMobile ? 'caption' : 'body2'}>
                          {item}
                        </Typography>
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
                p: isMobile ? 1.5 : 2.5,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                height: '100%',
                bgcolor: comparisonDiscipline ? 'inherit' : 'grey.50',
              }}
            >
              {comparisonDiscipline ? (
                comparisonDiscipline.learningOutcomes.map((outcome, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography
                      variant={isMobile ? 'body2' : 'subtitle2'}
                      color="secondary"
                      gutterBottom
                    >
                      {outcome.category}
                    </Typography>
                    {!isMobile && (
                      <Typography variant="body2" gutterBottom>
                        {outcome.description}
                      </Typography>
                    )}
                    <Box
                      component="ul"
                      sx={{
                        pl: isMobile ? 1.5 : 2,
                        mt: 1,
                        listStyleType: isMobile ? 'disc' : 'circle',
                      }}
                    >
                      {outcome.outcomes.map((item, idx) => (
                        <Box component="li" key={idx} sx={{ mb: 0.5 }}>
                          <Typography variant={isMobile ? 'caption' : 'body2'}>
                            {item}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography
                  variant={isMobile ? 'caption' : 'body2'}
                  color="text.secondary"
                  textAlign="center"
                  sx={{ py: isMobile ? 2 : 4 }}
                >
                  Select a discipline to compare learning outcomes
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Teaching Staff Comparison - Responsive */}
      <Box sx={{ mb: isMobile ? 5 : 3 }}>
        <Typography
          variant={isMobile ? 'body1' : 'subtitle1'}
          gutterBottom
          fontWeight={600}
          sx={{ mt: 2, fontSize: isMobile ? '0.95rem' : undefined }}
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
                p: isMobile ? 1.5 : 2,
                borderRight: { xs: 0, md: 1 },
                borderBottom: { xs: 1, md: 0 },
                borderColor: 'divider',
              }}
            >
              <Typography
                variant={isMobile ? 'body2' : 'subtitle2'}
                color="primary"
                gutterBottom
              >
                {currentDiscipline.name}
              </Typography>
              {currentDiscipline.teachingActivities.map((activity, index) => (
                <Stack
                  key={index}
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ mb: 1 }}
                >
                  <Person
                    fontSize={isMobile ? 'small' : 'medium'}
                    color="primary"
                    sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}
                  />
                  <Typography variant={isMobile ? 'caption' : 'body2'}>
                    <strong>{activity.type}:</strong>{' '}
                    {activity.teacher.academicTitle.abbreviation}.{' '}
                    {activity.teacher.firstName} {activity.teacher.lastName}
                  </Typography>
                </Stack>
              ))}
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                p: isMobile ? 1.5 : 2,
                bgcolor: comparisonDiscipline ? 'inherit' : 'grey.50',
              }}
            >
              {comparisonDiscipline ? (
                <>
                  <Typography
                    variant={isMobile ? 'body2' : 'subtitle2'}
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
                        <Person
                          fontSize={isMobile ? 'small' : 'medium'}
                          color="secondary"
                          sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}
                        />
                        <Typography variant={isMobile ? 'caption' : 'body2'}>
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
                  variant={isMobile ? 'caption' : 'body2'}
                  color="text.secondary"
                  textAlign="center"
                  sx={{ py: isMobile ? 1.5 : 2 }}
                >
                  Select a discipline to compare teaching staff
                </Typography>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );

  // Mobile SwipeableDrawer display
  if (isMobile) {
    return (
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={onClose}
        onOpen={() => {}}
        swipeAreaWidth={56}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            height: 'auto',
            maxHeight: '92vh',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            overflow: 'visible',
          },
        }}
      >
        {/* Drag Handle */}
        <Box
          sx={{
            width: 40,
            height: 6,
            backgroundColor: 'grey.300',
            borderRadius: 3,
            margin: '8px auto',
            position: 'relative',
            top: -2,
          }}
        />

        {/* Header */}
        <Box
          sx={{
            px: 2,
            py: 1.5,
            borderBottom: 1,
            borderColor: 'divider',
            position: 'sticky',
            top: 0,
            bgcolor: 'background.paper',
            zIndex: 10,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CompareArrows sx={{ mr: 1 }} color="primary" fontSize="small" />
              <Typography variant="subtitle1" fontWeight={600}>
                Discipline Comparison
              </Typography>
            </Box>
            <IconButton
              onClick={onClose}
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.grey[200], 0.5),
                '&:hover': {
                  bgcolor: alpha(theme.palette.grey[300], 0.7),
                },
              }}
            >
              <Close fontSize="small" />
            </IconButton>
          </Stack>
        </Box>

        {/* Content */}
        <Box
          ref={contentRef}
          sx={{
            px: 2,
            py: 2,
            overflow: 'auto',
            maxHeight: 'calc(92vh - 56px)',
            pb: 8,
          }}
        >
          {renderSelectionControls()}
          {renderComparisonHeaders()}
          {renderComparisonContent()}
        </Box>

        {/* Footer with Close Button */}
        <Box
          sx={{
            py: 1.5,
            px: 2,
            position: 'sticky',
            bottom: 0,
            borderTop: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
            zIndex: 10,
          }}
        >
          <Button
            onClick={onClose}
            color="primary"
            fullWidth
            variant="contained"
          >
            Close Comparison
          </Button>
        </Box>
      </SwipeableDrawer>
    );
  }

  // Desktop Dialog display
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
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

      <DialogContent ref={contentRef} sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Selection Controls */}
          <Grid item xs={12}>
            {renderSelectionControls()}
          </Grid>

          {/* Comparison Headers */}
          <Grid item xs={12}>
            {renderComparisonHeaders()}
          </Grid>

          {/* Comparison Content */}
          <Grid item xs={12}>
            {renderComparisonContent()}
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
