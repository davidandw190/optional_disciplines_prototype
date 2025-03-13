import {
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
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
import {
  Close,
  CompareArrows,
  FilterList,
  InfoOutlined,
  KeyboardArrowDown,
  Person,
} from '@mui/icons-material';
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

  useEffect(() => {
    if (open && contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [open, comparisonDiscipline]);

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

  const shouldHighlight = (value1: any, value2: any) => {
    return comparisonDiscipline && !areValuesEqual(value1, value2);
  };

  const truncateText = (text: string, maxLength: number = 15) => {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

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
          label: 'Assessment',
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
  ];

  const containerStyles = {
    bgcolor: alpha(theme.palette.background.paper, 0.98),
    boxShadow: theme.shadows[8],
  };

  const paperStyles = {
    border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
    borderRadius: 2,
    bgcolor: 'background.paper',
    boxShadow: 'none',
    transition: 'all 0.2s ease-in-out',
  };

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

  const renderSelectionControls = () => (
    <Paper
      elevation={0}
      sx={{
        p: isMobile ? 2 : 2.5,
        mb: 3,
        ...paperStyles,
        position: 'relative',
      }}
    >
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: alpha(theme.palette.background.paper, 0.7),
            zIndex: 10,
            borderRadius: 2,
          }}
        >
          <CircularProgress size={28} />
        </Box>
      )}

      <Stack spacing={isMobile ? 1.5 : 2}>
        {!isMobile && (
          <Typography variant="subtitle1" fontWeight={600}>
            Compare with "{currentDiscipline.name}"
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
                renderOption={(props, option) => (
                  <li
                    {...props}
                    style={{
                      display: 'block',
                      padding: '8px 16px',
                      borderBottom: `1px solid ${alpha(
                        theme.palette.divider,
                        0.1
                      )}`,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: theme.palette.text.primary,
                      }}
                    >
                      {option.code} - {option.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: theme.palette.text.secondary,
                        display: 'block',
                        mt: 0.5,
                      }}
                    >
                      {option.credits} credits • {option.language}
                    </Typography>
                  </li>
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

            <Collapse in={isFilterOpen} timeout={300}>
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
                    sx={{
                      mb: 0.5,
                      maxWidth: '100%',
                      '& .MuiChip-label': {
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      },
                    }}
                  />
                ))}
                {selectedPacket && (
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => setSelectedPacket(null)}
                    sx={{ alignSelf: 'flex-start', mt: 1 }}
                    startIcon={<FilterList />}
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
                renderOption={(props, option) => (
                  <li
                    {...props}
                    style={{
                      borderBottom: `1px solid ${alpha(
                        theme.palette.divider,
                        0.1
                      )}`,
                    }}
                  >
                    <Typography>{option.name}</Typography>
                  </li>
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
                renderOption={(props, option) => (
                  <li
                    {...props}
                    style={{
                      borderBottom: `1px solid ${alpha(
                        theme.palette.divider,
                        0.1
                      )}`,
                    }}
                  >
                    <Stack direction="column" spacing={0.5}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          color: theme.palette.text.primary,
                        }}
                      >
                        {option.code} - {option.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        {option.credits} credits • {option.language}
                      </Typography>
                    </Stack>
                  </li>
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
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            borderRadius: 2,
            bgcolor: alpha(theme.palette.primary.main, 0.05),
          }}
        >
          <Typography
            variant={isSmallMobile ? 'caption' : 'subtitle2'}
            fontWeight={600}
            noWrap
            textAlign="center"
            title={currentDiscipline.name}
          >
            {isSmallMobile
              ? truncateText(currentDiscipline.name, 20)
              : currentDiscipline.name}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={isSmallMobile ? 4.5 : 4} md={4.5}>
        <Paper
          elevation={0}
          sx={{
            p: isSmallMobile ? 1 : 1.5,
            border: `1px solid ${
              comparisonDiscipline
                ? alpha(theme.palette.secondary.main, 0.2)
                : alpha(theme.palette.divider, 0.2)
            }`,
            borderRadius: 2,
            bgcolor: comparisonDiscipline
              ? alpha(theme.palette.secondary.main, 0.05)
              : alpha(theme.palette.background.default, 0.5),
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
              ? truncateText(comparisonDiscipline.name)
              : 'Select a discipline'}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );

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
              color: theme.palette.primary.dark,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <InfoOutlined fontSize="small" />
            {section.title}
          </Typography>
          <Paper
            elevation={0}
            sx={{
              ...paperStyles,
              overflow: 'hidden',
              '&:hover': {
                boxShadow: theme.shadows[1],
                borderColor: alpha(theme.palette.primary.main, 0.3),
              },
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
                    transition: 'background-color 0.2s ease-in-out',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                    },
                  }}
                >
                  <Grid item xs={isSmallMobile ? 3 : 4} md={3}>
                    <Typography
                      variant={isSmallMobile ? 'caption' : 'body2'}
                      fontWeight={field.isHighlight ? 600 : 500}
                      sx={{
                        maxWidth: isSmallMobile ? '90px' : '100%',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        color: field.isHighlight
                          ? theme.palette.primary.dark
                          : theme.palette.text.primary,
                      }}
                    >
                      {field.label}
                    </Typography>
                  </Grid>
                  <Grid item xs={isSmallMobile ? 4.5 : 4} md={4.5}>
                    <Typography
                      variant={isSmallMobile ? 'caption' : 'body2'}
                      sx={{
                        fontWeight: shouldHighlight(field.value1, field.value2)
                          ? 600
                          : 400,
                        color: shouldHighlight(field.value1, field.value2)
                          ? theme.palette.primary.main
                          : theme.palette.text.primary,
                        maxWidth: '100%',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      {shouldHighlight(field.value1, field.value2) && (
                        <Box
                          sx={{
                            width: isSmallMobile ? 16 : 20,
                            height: isSmallMobile ? 16 : 20,
                            borderRadius: '50%',
                            bgcolor: theme.palette.primary.main,
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: isSmallMobile ? '0.7rem' : '0.8rem',
                            fontWeight: 'bold',
                          }}
                        >
                          1
                        </Box>
                      )}
                      {field.value1 !== undefined && field.value1 !== null
                        ? field.value1
                        : '-'}
                    </Typography>
                  </Grid>
                  <Grid item xs={isSmallMobile ? 4.5 : 4} md={4.5}>
                    <Typography
                      variant={isSmallMobile ? 'caption' : 'body2'}
                      sx={{
                        fontWeight: shouldHighlight(field.value1, field.value2)
                          ? 600
                          : 400,
                        color: shouldHighlight(field.value1, field.value2)
                          ? theme.palette.secondary.main
                          : comparisonDiscipline
                          ? theme.palette.text.primary
                          : theme.palette.text.secondary,
                        maxWidth: '100%',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      {shouldHighlight(field.value1, field.value2) && (
                        <Box
                          sx={{
                            width: isSmallMobile ? 16 : 20,
                            height: isSmallMobile ? 16 : 20,
                            borderRadius: '50%',
                            bgcolor: theme.palette.secondary.main,
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: isSmallMobile ? '0.7rem' : '0.8rem',
                            fontWeight: 'bold',
                          }}
                        >
                          2
                        </Box>
                      )}
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
          sx={{
            mt: 2,
            fontSize: isMobile ? '0.95rem' : undefined,
            color: theme.palette.primary.dark,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <InfoOutlined fontSize="small" />
          Course Description
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: isMobile ? 1.5 : 2.5,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                borderRadius: 2,
                height: '100%',
                bgcolor: alpha(theme.palette.primary.main, 0.02),
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  boxShadow: theme.shadows[2],
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                },
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
              <Typography
                variant={isMobile ? 'caption' : 'body2'}
                sx={{
                  maxHeight: isMobile ? '150px' : '200px',
                  overflow: 'auto',
                  pr: 1,
                  ...scrollbarStyles,
                }}
              >
                {currentDiscipline.description}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: isMobile ? 1.5 : 2.5,
                border: `1px solid ${
                  comparisonDiscipline
                    ? alpha(theme.palette.secondary.main, 0.15)
                    : alpha(theme.palette.divider, 0.1)
                }`,
                borderRadius: 2,
                height: '100%',
                bgcolor: comparisonDiscipline
                  ? alpha(theme.palette.secondary.main, 0.02)
                  : alpha(theme.palette.background.default, 0.5),
                transition: 'all 0.2s ease-in-out',
                '&:hover': comparisonDiscipline
                  ? {
                      boxShadow: theme.shadows[2],
                      borderColor: alpha(theme.palette.secondary.main, 0.3),
                      bgcolor: alpha(theme.palette.secondary.main, 0.05),
                    }
                  : {},
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
                  <Typography
                    variant={isMobile ? 'caption' : 'body2'}
                    sx={{
                      maxHeight: isMobile ? '150px' : '200px',
                      overflow: 'auto',
                      pr: 1,
                      ...scrollbarStyles,
                    }}
                  >
                    {comparisonDiscipline.description}
                  </Typography>
                </>
              ) : (
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    height: '100%',
                    minHeight: isMobile ? '100px' : '150px',
                    p: 2,
                  }}
                >
                  <Typography
                    variant={isMobile ? 'caption' : 'body2'}
                    color="text.secondary"
                    textAlign="center"
                  >
                    Select a discipline to compare descriptions
                  </Typography>
                </Stack>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Evaluation System - More Compact */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant={isMobile ? 'body1' : 'subtitle1'}
          gutterBottom
          fontWeight={600}
          sx={{
            mt: 2,
            fontSize: isMobile ? '0.95rem' : undefined,
            color: theme.palette.primary.dark,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <InfoOutlined fontSize="small" />
          Evaluation
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.02),
                transition: 'all 0.2s ease-in-out',
                overflow: 'hidden',
                '&:hover': {
                  boxShadow: theme.shadows[1],
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                },
              }}
            >
              <Typography
                variant={isMobile ? 'body2' : 'subtitle2'}
                sx={{
                  p: 1.5,
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                  borderBottom: `1px solid ${alpha(
                    theme.palette.divider,
                    0.1
                  )}`,
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                }}
              >
                {truncateText(currentDiscipline.name)}
              </Typography>

              <Box sx={{ p: 1.5 }}>
                {currentDiscipline.evaluationSystem.components.map(
                  (component, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        mb: 1,
                        pb: 1,
                        borderBottom:
                          idx <
                          currentDiscipline.evaluationSystem.components.length -
                            1
                            ? `1px solid ${alpha(theme.palette.divider, 0.1)}`
                            : 'none',
                      }}
                    >
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography
                          variant={isMobile ? 'caption' : 'body2'}
                          fontWeight={600}
                        >
                          {component.type}
                        </Typography>
                        <Chip
                          label={`${component.weightInFinalGrade}%`}
                          size="small"
                          color="primary"
                          sx={{
                            height: 20,
                            '& .MuiChip-label': {
                              px: 1,
                              fontSize: '0.7rem',
                            },
                          }}
                        />
                      </Stack>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: 'block', mt: 0.5 }}
                      >
                        {component.evaluationMethods.join(', ')}
                        {component.minimumGrade &&
                          ` (Min: ${component.minimumGrade})`}
                      </Typography>
                    </Box>
                  )
                )}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                border: `1px solid ${
                  comparisonDiscipline
                    ? alpha(theme.palette.secondary.main, 0.15)
                    : alpha(theme.palette.divider, 0.1)
                }`,
                borderRadius: 2,
                bgcolor: comparisonDiscipline
                  ? alpha(theme.palette.secondary.main, 0.02)
                  : alpha(theme.palette.background.default, 0.5),
                transition: 'all 0.2s ease-in-out',
                overflow: 'hidden',
                height: '100%',
                '&:hover': comparisonDiscipline
                  ? {
                      boxShadow: theme.shadows[1],
                      borderColor: alpha(theme.palette.secondary.main, 0.3),
                      bgcolor: alpha(theme.palette.secondary.main, 0.05),
                    }
                  : {},
              }}
            >
              {comparisonDiscipline ? (
                <>
                  <Typography
                    variant={isMobile ? 'body2' : 'subtitle2'}
                    sx={{
                      p: 1.5,
                      fontWeight: 600,
                      color: theme.palette.secondary.main,
                      borderBottom: `1px solid ${alpha(
                        theme.palette.divider,
                        0.1
                      )}`,
                      bgcolor: alpha(theme.palette.secondary.main, 0.05),
                    }}
                  >
                    {truncateText(comparisonDiscipline.name)}
                  </Typography>

                  <Box sx={{ p: 1.5 }}>
                    {comparisonDiscipline.evaluationSystem.components.map(
                      (component, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            mb: 1,
                            pb: 1,
                            borderBottom:
                              idx <
                              comparisonDiscipline.evaluationSystem.components
                                .length -
                                1
                                ? `1px solid ${alpha(
                                    theme.palette.divider,
                                    0.1
                                  )}`
                                : 'none',
                          }}
                        >
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Typography
                              variant={isMobile ? 'caption' : 'body2'}
                              fontWeight={600}
                            >
                              {component.type}
                            </Typography>
                            <Chip
                              label={`${component.weightInFinalGrade}%`}
                              size="small"
                              color="secondary"
                              sx={{
                                height: 20,
                                '& .MuiChip-label': {
                                  px: 1,
                                  fontSize: '0.7rem',
                                },
                              }}
                            />
                          </Stack>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: 'block', mt: 0.5 }}
                          >
                            {component.evaluationMethods.join(', ')}
                            {component.minimumGrade &&
                              ` (Min: ${component.minimumGrade})`}
                          </Typography>
                        </Box>
                      )
                    )}
                  </Box>
                </>
              ) : (
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    height: '100%',
                    minHeight: isMobile ? '100px' : '150px',
                    p: 2,
                  }}
                >
                  <Typography
                    variant={isMobile ? 'caption' : 'body2'}
                    color="text.secondary"
                    textAlign="center"
                  >
                    Select a discipline to compare evaluation
                  </Typography>
                </Stack>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Learning Outcomes Comparison */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant={isMobile ? 'body1' : 'subtitle1'}
          gutterBottom
          fontWeight={600}
          sx={{
            mt: 2,
            fontSize: isMobile ? '0.95rem' : undefined,
            color: theme.palette.primary.dark,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <InfoOutlined fontSize="small" />
          Learning Outcomes
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: isMobile ? 1.5 : 2,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                borderRadius: 2,
                height: '100%',
                bgcolor: alpha(theme.palette.primary.main, 0.02),
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  boxShadow: theme.shadows[2],
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                },
              }}
            >
              {currentDiscipline.learningOutcomes.map((outcome, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 2,
                    maxHeight: isMobile ? '150px' : '200px',
                    overflow: 'auto',
                    ...scrollbarStyles,
                  }}
                >
                  <Typography
                    variant={isMobile ? 'body2' : 'subtitle2'}
                    color="primary"
                    fontWeight={600}
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
                      pr: 1,
                    }}
                  >
                    {outcome.outcomes.map((item, idx) => (
                      <Box component="li" key={idx} sx={{ mb: 0.5 }}>
                        <Typography
                          variant={isMobile ? 'caption' : 'body2'}
                          sx={{
                            display: 'block',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: isSmallMobile ? 'nowrap' : 'normal',
                          }}
                        >
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
                p: isMobile ? 1.5 : 2,
                border: `1px solid ${
                  comparisonDiscipline
                    ? alpha(theme.palette.secondary.main, 0.15)
                    : alpha(theme.palette.divider, 0.1)
                }`,
                borderRadius: 2,
                height: '100%',
                bgcolor: comparisonDiscipline
                  ? alpha(theme.palette.secondary.main, 0.02)
                  : alpha(theme.palette.background.default, 0.5),
                transition: 'all 0.2s ease-in-out',
                '&:hover': comparisonDiscipline
                  ? {
                      boxShadow: theme.shadows[2],
                      borderColor: alpha(theme.palette.secondary.main, 0.3),
                      bgcolor: alpha(theme.palette.secondary.main, 0.05),
                    }
                  : {},
              }}
            >
              {comparisonDiscipline ? (
                comparisonDiscipline.learningOutcomes.map((outcome, index) => (
                  <Box
                    key={index}
                    sx={{
                      mb: 2,
                      maxHeight: isMobile ? '150px' : '200px',
                      overflow: 'auto',
                      ...scrollbarStyles,
                    }}
                  >
                    <Typography
                      variant={isMobile ? 'body2' : 'subtitle2'}
                      color="secondary"
                      fontWeight={600}
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
                        pr: 1,
                      }}
                    >
                      {outcome.outcomes.map((item, idx) => (
                        <Box component="li" key={idx} sx={{ mb: 0.5 }}>
                          <Typography
                            variant={isMobile ? 'caption' : 'body2'}
                            sx={{
                              display: 'block',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: isSmallMobile ? 'nowrap' : 'normal',
                            }}
                          >
                            {item}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                ))
              ) : (
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    height: '100%',
                    minHeight: isMobile ? '100px' : '150px',
                    p: 2,
                  }}
                >
                  <Typography
                    variant={isMobile ? 'caption' : 'body2'}
                    color="text.secondary"
                    textAlign="center"
                  >
                    Select a discipline to compare learning outcomes
                  </Typography>
                </Stack>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Teaching Staff - More Compact */}
      <Box sx={{ mb: isMobile ? 5 : 3 }}>
        <Typography
          variant={isMobile ? 'body1' : 'subtitle1'}
          gutterBottom
          fontWeight={600}
          sx={{
            mt: 2,
            fontSize: isMobile ? '0.95rem' : undefined,
            color: theme.palette.primary.dark,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <InfoOutlined fontSize="small" />
          Teaching Staff
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: alpha(theme.palette.primary.main, 0.02),
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  boxShadow: theme.shadows[1],
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                },
              }}
            >
              <Box sx={{ p: 1.5 }}>
                {currentDiscipline.teachingActivities.map((activity, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 1,
                      mb: 1,
                      borderBottom:
                        index < currentDiscipline.teachingActivities.length - 1
                          ? `1px solid ${alpha(theme.palette.divider, 0.1)}`
                          : 'none',
                    }}
                  >
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Person fontSize="small" color="primary" />
                      <Box>
                        <Typography variant="caption" fontWeight={600}>
                          {activity.type}: {activity.hoursPerWeek}h/week
                        </Typography>
                        <Typography variant="caption" display="block">
                          {activity.teacher.academicTitle.abbreviation}.{' '}
                          {activity.teacher.firstName}{' '}
                          {activity.teacher.lastName}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                border: `1px solid ${
                  comparisonDiscipline
                    ? alpha(theme.palette.secondary.main, 0.15)
                    : alpha(theme.palette.divider, 0.1)
                }`,
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: comparisonDiscipline
                  ? alpha(theme.palette.secondary.main, 0.02)
                  : alpha(theme.palette.background.default, 0.5),
                transition: 'all 0.2s ease-in-out',
                height: '100%',
                '&:hover': comparisonDiscipline
                  ? {
                      boxShadow: theme.shadows[1],
                      borderColor: alpha(theme.palette.secondary.main, 0.3),
                      bgcolor: alpha(theme.palette.secondary.main, 0.05),
                    }
                  : {},
              }}
            >
              {comparisonDiscipline ? (
                <Box sx={{ p: 1.5 }}>
                  {comparisonDiscipline.teachingActivities.map(
                    (activity, index) => (
                      <Box
                        key={index}
                        sx={{
                          p: 1,
                          mb: 1,
                          borderBottom:
                            index <
                            comparisonDiscipline.teachingActivities.length - 1
                              ? `1px solid ${alpha(theme.palette.divider, 0.1)}`
                              : 'none',
                        }}
                      >
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Person fontSize="small" color="secondary" />
                          <Box>
                            <Typography variant="caption" fontWeight={600}>
                              {activity.type}: {activity.hoursPerWeek}h/week
                            </Typography>
                            <Typography variant="caption" display="block">
                              {activity.teacher.academicTitle.abbreviation}.{' '}
                              {activity.teacher.firstName}{' '}
                              {activity.teacher.lastName}
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>
                    )
                  )}
                </Box>
              ) : (
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    height: '100%',
                    minHeight: isMobile ? '80px' : '100px',
                    p: 2,
                  }}
                >
                  <Typography
                    variant={isMobile ? 'caption' : 'body2'}
                    color="text.secondary"
                    textAlign="center"
                  >
                    Select a discipline to compare teaching staff
                  </Typography>
                </Stack>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );

  if (isMobile) {
    return (
      <Drawer
        anchor="bottom"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            height: 'auto',
            maxHeight: '92vh',
            background: alpha(theme.palette.background.paper, 0.98),
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            ...containerStyles,
          },
        }}
      >
        {/* Drag Handle */}
        <Box
          sx={{
            width: 40,
            height: 6,
            backgroundColor: alpha(theme.palette.primary.main, 0.2),
            borderRadius: 3,
            margin: '8px auto',
            position: 'relative',
            top: -2,
          }}
        />

        {/* Header */}
        <Box
          sx={{
            p: { xs: 2, sm: 3 },
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            position: 'sticky',
            top: 0,
            bgcolor: alpha(theme.palette.background.paper, 0.98),
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
            <Stack direction="row" spacing={1.5} alignItems="center">
              <CompareArrows
                sx={{
                  fontSize: 24,
                  color: theme.palette.primary.main,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  p: 0.5,
                  borderRadius: '50%',
                }}
              />
              <Typography variant="h6" fontWeight={600}>
                Discipline Comparison
              </Typography>
            </Stack>
            <IconButton
              onClick={onClose}
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.grey[500], 0.1),
                color: 'text.secondary',
                '&:hover': {
                  bgcolor: alpha(theme.palette.grey[500], 0.2),
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
            p: { xs: 2, sm: 3 },
            overflow: 'auto',
            maxHeight: 'calc(92vh - 120px)',
            pb: 8,
            ...scrollbarStyles,
          }}
        >
          {renderSelectionControls()}
          {renderComparisonHeaders()}
          {renderComparisonContent()}
        </Box>

        {/* Footer with Close Button */}
        <Box
          sx={{
            p: { xs: 2, sm: 3 },
            position: 'sticky',
            bottom: 0,
            borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            bgcolor: alpha(theme.palette.background.paper, 0.98),
            zIndex: 10,
          }}
        >
          <Button
            onClick={onClose}
            color="primary"
            fullWidth
            variant="contained"
            sx={{
              height: 48,
              borderRadius: 1.5,
              textTransform: 'none',
              fontSize: '0.9375rem',
              fontWeight: 600,
              boxShadow: theme.shadows[2],
              '&:hover': {
                boxShadow: theme.shadows[4],
              },
            }}
          >
            Close Comparison
          </Button>
        </Box>
      </Drawer>
    );
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '85vh',
          ...containerStyles,
        },
      }}
    >
      <DialogTitle
        sx={{
          p: { xs: 2, sm: 3 },
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: alpha(theme.palette.background.paper, 0.98),
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <CompareArrows
            sx={{
              fontSize: 28,
              color: theme.palette.primary.main,
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              p: 0.5,
              borderRadius: '50%',
            }}
          />
          <Typography variant="h6" fontWeight={600}>
            Discipline Comparison Tool
          </Typography>
        </Stack>
        <IconButton
          onClick={onClose}
          size="small"
          aria-label="Close"
          sx={{
            bgcolor: alpha(theme.palette.grey[500], 0.1),
            color: 'text.secondary',
            '&:hover': {
              bgcolor: alpha(theme.palette.grey[500], 0.2),
            },
          }}
        >
          <Close fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent
        ref={contentRef}
        sx={{
          p: { xs: 2, sm: 3 },
          bgcolor: alpha(theme.palette.background.paper, 0.98),
          ...scrollbarStyles,
        }}
      >
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

      <DialogActions
        sx={{
          p: { xs: 2, sm: 3 },
          borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          bgcolor: alpha(theme.palette.background.paper, 0.98),
        }}
      >
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            px: 3,
            height: 48,
            borderRadius: 1.5,
            textTransform: 'none',
            fontSize: '0.9375rem',
            fontWeight: 600,
            boxShadow: theme.shadows[2],
            '&:hover': {
              boxShadow: theme.shadows[4],
            },
          }}
        >
          Close Comparison
        </Button>
      </DialogActions>
    </Dialog>
  );
};
