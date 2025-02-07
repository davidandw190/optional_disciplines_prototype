import {
  AccessTime,
  CalendarToday,
  Close,
  Info,
  InfoOutlined,
  School,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  Dialog,
  Drawer,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Discipline,
  DisciplinePacket,
  EnrollmentPeriod,
} from '../../../types/disciplines/disciplines.types';
import { FC, useState } from 'react';

import { EnrollmentSelectionState } from '../../../types/enrollments/enrollment-selection.types';

interface EnrollmentConfirmationProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  selections: EnrollmentSelectionState;
  packets: DisciplinePacket[];
  disciplines: Record<string, Discipline>;
  enrollmentPeriod: EnrollmentPeriod;
}

export const EnrollmentConfirmation: FC<EnrollmentConfirmationProps> = ({
  open,
  onClose,
  onConfirm,
  selections,
  packets,
  disciplines,
  enrollmentPeriod,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const containerStyles = {
    backgroundImage: 'none',
    bgcolor: alpha(theme.palette.background.paper, 0.95),
    backdropFilter: 'blur(20px)',
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      await onConfirm();
      onClose();
    } catch (err) {
      setError(
        'An error occurred while processing your enrollment. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const content = (
    <Stack
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        ...containerStyles,
      }}
    >
      {/* Header Section with Title and Period Information */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          position: 'sticky',
          top: 0,
          bgcolor: 'transparent',
          zIndex: 1,
        }}
      >
        <Stack spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <School color="primary" sx={{ fontSize: 28 }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Confirm Enrollment
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ mt: 0.5 }}
                >
                  <CalendarToday
                    sx={{ fontSize: '0.875rem', color: 'text.secondary' }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {enrollmentPeriod.academicYear} - Semester{' '}
                    {enrollmentPeriod.semester}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
            <IconButton
              onClick={onClose}
              disabled={isSubmitting}
              sx={{ color: 'text.secondary' }}
            >
              <Close />
            </IconButton>
          </Stack>

          {/* Information Banner */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              bgcolor: alpha(theme.palette.info.main, 0.08),
              borderRadius: 1,
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="flex-start">
              <Info color="info" sx={{ fontSize: '1.25rem', mt: 0.25 }} />
              <Stack spacing={0.5}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Review Your Selections
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Please review your selections carefully before confirming.
                  Priority 1 has the highest chance of enrollment.
                </Typography>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Paper>

      {/* Scrollable Content Area with Packet Selections */}
      <Box sx={{ flex: 1, overflow: 'auto', p: { xs: 2, sm: 3 } }}>
        <Stack spacing={3}>
          {packets.map((packet) => {
            const packetSelections =
              selections.packets[packet.id]?.selections || [];
            if (packetSelections.length === 0) return null;

            return (
              <Paper
                key={packet.id}
                elevation={0}
                sx={{
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  borderRadius: 2,
                  overflow: 'hidden',
                  bgcolor: 'transparent',
                }}
              >
                <Box sx={{ p: 2.5 }}>
                  {/* Packet Header with Info Tooltip */}
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{
                      mb: 2,
                      flexWrap: 'wrap',
                      gap: 1,
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{
                        flexGrow: 1,
                        minWidth: { xs: '100%', sm: 'auto' },
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        color="primary"
                        sx={{
                          fontWeight: 600,
                          flex: 1,
                        }}
                      >
                        {packet.name}
                      </Typography>
                      <Tooltip
                        title={
                          <Stack spacing={1}>
                            <Typography variant="body2">
                              {packetSelections.length > 0
                                ? `"${
                                    disciplines[
                                      packetSelections[0].disciplineId
                                    ].name
                                  }" is your highest priority choice for this packet, giving you better enrollment chances if spaces are limited.`
                                : `Select ${packet.maxChoices} discipline${
                                    packet.maxChoices > 1 ? 's' : ''
                                  } in order of preference. Your first choice has the best enrollment chance.`}
                            </Typography>
                          </Stack>
                        }
                        arrow
                        placement="top"
                        enterTouchDelay={0}
                        leaveTouchDelay={3000}
                        componentsProps={{
                          tooltip: {
                            sx: {
                              bgcolor: theme.palette.background.paper,
                              color: theme.palette.text.primary,
                              boxShadow: theme.shadows[2],
                              p: 2,
                              '& .MuiTooltip-arrow': {
                                color: theme.palette.background.paper,
                              },
                              maxWidth: 300,
                              '& .MuiTypography-root': {
                                lineHeight: 1.5,
                              },
                            },
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            color: theme.palette.primary.main,
                            transition: 'opacity 0.2s ease',
                            opacity: 0.7,
                            '&:hover': {
                              opacity: 1,
                            },
                          }}
                        >
                          <InfoOutlined sx={{ fontSize: '1rem' }} />
                        </Box>
                      </Tooltip>
                    </Stack>
                  </Stack>

                  {/* Selection Items */}
                  <Stack spacing={2}>
                    {packetSelections.map((selection, index) => {
                      const discipline = disciplines[selection.disciplineId];
                      return (
                        <Paper
                          key={selection.disciplineId}
                          elevation={0}
                          sx={{
                            p: 2,
                            bgcolor: alpha(theme.palette.background.paper, 0.6),
                            borderRadius: 1.5,
                            border: `1px solid ${alpha(
                              theme.palette.divider,
                              0.1
                            )}`,
                          }}
                        >
                          <Stack spacing={1.5}>
                            <Stack
                              direction="row"
                              spacing={1.5}
                              alignItems="center"
                            >
                              <Chip
                                label={`Priority ${selection.priority}`}
                                color={index === 0 ? 'success' : 'default'}
                                size="small"
                                sx={{
                                  height: 24,
                                  '& .MuiChip-label': {
                                    px: 1,
                                    fontSize: '0.75rem',
                                    fontWeight: 500,
                                  },
                                }}
                              />
                              <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: 500 }}
                              >
                                {discipline.name}
                              </Typography>
                            </Stack>

                            <Stack
                              direction="row"
                              spacing={2}
                              alignItems="center"
                            >
                              <Stack
                                direction="row"
                                spacing={0.5}
                                alignItems="center"
                              >
                                <AccessTime
                                  sx={{
                                    fontSize: '0.875rem',
                                    color: 'text.secondary',
                                  }}
                                />
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {discipline.weeklyHours.total}h/week
                                </Typography>
                              </Stack>
                              <Typography
                                variant="caption"
                                sx={{
                                  px: 1,
                                  py: 0.25,
                                  borderRadius: 0.75,
                                  bgcolor: alpha(
                                    theme.palette.primary.main,
                                    0.1
                                  ),
                                  color: theme.palette.primary.main,
                                }}
                              >
                                {discipline.code}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Paper>
                      );
                    })}
                  </Stack>
                </Box>
              </Paper>
            );
          })}
        </Stack>
      </Box>

      {/* Footer with Action Buttons */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          position: 'sticky',
          bottom: 0,
          bgcolor: 'transparent',
          zIndex: 1,
        }}
      >
        <Stack spacing={2}>
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="flex-end"
          >
            {!isMobile && (
              <Button
                variant="outlined"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            )}
            <Button
              fullWidth={isMobile}
              variant="contained"
              onClick={handleConfirm}
              disabled={isSubmitting}
              sx={{
                height: 48,
                borderRadius: 1.5,
                textTransform: 'none',
                fontSize: '0.9375rem',
                fontWeight: 600,
              }}
            >
              {isSubmitting ? 'Confirming...' : 'Confirm Enrollment'}
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );

  return isMobile ? (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={!isSubmitting ? onClose : undefined}
      PaperProps={{
        sx: {
          height: '85vh',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          ...containerStyles,
        },
      }}
    >
      {content}
    </Drawer>
  ) : (
    <Dialog
      open={open}
      onClose={!isSubmitting ? onClose : undefined}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '90vh',
          ...containerStyles,
        },
      }}
      BackdropProps={{
        sx: {
          bgcolor: alpha(theme.palette.background.default, 0.8),
          backdropFilter: 'blur(8px)',
        },
      }}
    >
      {content}
    </Dialog>
  );
};
