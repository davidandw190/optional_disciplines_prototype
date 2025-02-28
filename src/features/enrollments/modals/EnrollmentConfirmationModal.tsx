import {
  Box,
  Button,
  Chip,
  CircularProgress,
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
  CalendarToday,
  CheckCircle,
  Close,
  Info,
  InfoOutlined,
  School,
} from '@mui/icons-material';
import {
  Discipline,
  DisciplinePacket,
  EnrollmentPeriod,
} from '../../../types/disciplines/disciplines.types';
import { FC, useState } from 'react';
import {
  formatDate,
  getPacketTooltipMessage,
} from './utils/confirmation-utils';

import { DisciplineSelection } from './components/DisciplineSelection';
import { EnrollmentSelectionState } from '../../../types/enrollments/enrollment-selection.types';

interface EnrollmentConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  selections: EnrollmentSelectionState;
  packets: DisciplinePacket[];
  disciplines: Record<string, Discipline>;
  enrollmentPeriod: EnrollmentPeriod;
}

export const EnrollmentConfirmationModal: FC<
  EnrollmentConfirmationModalProps
> = ({
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

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      await onConfirm();
      // Don't close automatically - parent will handle this
    } catch (err) {
      setError(
        'An error occurred while processing your enrollment. Please try again.'
      );
      setIsSubmitting(false);
    }
  };

  // Calculate total selections for the info banner
  const totalSelections = packets.reduce((total, packet) => {
    const packetSelections = selections.packets[packet.id]?.selections || [];
    return total + packetSelections.length;
  }, 0);

  const Content = () => (
    <Stack sx={{ height: '100%' }}>
      {/* Header Section - Identical to EnrollmentDetailsModal */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 2.5 },
          borderBottom: '1px solid',
          borderColor: 'divider',
          position: 'sticky',
          top: 0,
          bgcolor: theme.palette.background.paper,
          zIndex: 1,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
        >
          <Stack spacing={1.5}>
            {/* Title */}
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: theme.palette.primary.main,
              }}
            >
              Confirm Enrollment
            </Typography>

            {/* Academic Information with Minimalist Layout */}
            <Stack spacing={1}>
              {/* Academic Period Info */}
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                spacing={{ xs: 0.5, sm: 2 }}
                sx={{ mb: { xs: 0.5, sm: 0 } }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <School
                    sx={{
                      fontSize: '1rem',
                      color: theme.palette.primary.main,
                    }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{ color: theme.palette.text.primary }}
                  >
                    {`${enrollmentPeriod.academicYear} • Year ${enrollmentPeriod.yearOfStudy} - Semester ${enrollmentPeriod.semester}`}
                  </Typography>
                </Stack>

                <Chip
                  label={`Deadline: ${formatDate(enrollmentPeriod.endDate)}`}
                  size="small"
                  color="primary"
                  icon={<CalendarToday sx={{ fontSize: '0.875rem' }} />}
                  sx={{
                    height: 24,
                    px: 0.25,
                    '& .MuiChip-label': {
                      px: 0.75,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                    },
                    '& .MuiChip-icon': {
                      ml: 0.5,
                      mr: -0.25,
                    },
                  }}
                />
              </Stack>
            </Stack>
          </Stack>

          {/* Close button */}
          <IconButton
            onClick={onClose}
            size="small"
            disabled={isSubmitting}
            aria-label="Close confirmation"
            sx={{
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.05),
              },
            }}
          >
            <Close />
          </IconButton>
        </Stack>

        {/* Information Banner - Matches status banner in EnrollmentDetailsModal */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mt: 2,
            bgcolor: alpha(theme.palette.warning.main, 0.08),
            borderRadius: 2,
            border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="flex-start">
            <Box
              sx={{
                color: theme.palette.warning.main,
                display: 'flex',
                alignItems: 'center',
                pt: 0.25,
              }}
            >
              <Info />
            </Box>
            <Stack spacing={0.5} sx={{ flex: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Review Your Selections
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  lineHeight: 1.4,
                  fontSize: '0.8125rem',
                }}
              >
                You are about to confirm enrollment for {totalSelections}{' '}
                discipline{totalSelections !== 1 ? 's' : ''} across{' '}
                {Object.keys(selections.packets).length} packet
                {Object.keys(selections.packets).length !== 1 ? 's' : ''}.
                Priority order affects enrollment chances. Please review
                carefully before proceeding.
              </Typography>
            </Stack>
          </Stack>
        </Paper>
      </Paper>

      {/* Packets and Selections - Identical to EnrollmentDetailsModal */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: { xs: 2, sm: 2.5 },
          maxHeight: { xs: undefined, sm: 'calc(80vh - 170px)' },
        }}
      >
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
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.03),
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                      }}
                    >
                      {packet.name}
                    </Typography>

                    <Tooltip
                      title={
                        <Typography
                          variant="body2"
                          sx={{ whiteSpace: 'pre-line' }}
                        >
                          {getPacketTooltipMessage(packet, packetSelections)}
                        </Typography>
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
                            border: `1px solid ${alpha(
                              theme.palette.divider,
                              0.15
                            )}`,
                            boxShadow: `0 3px 6px ${alpha(
                              theme.palette.common.black,
                              0.1
                            )}`,
                            p: 2,
                            '& .MuiTooltip-arrow': {
                              color: theme.palette.background.paper,
                              '&::before': {
                                border: `1px solid ${alpha(
                                  theme.palette.divider,
                                  0.15
                                )}`,
                                backgroundColor: theme.palette.background.paper,
                                boxSizing: 'border-box',
                              },
                            },
                            maxWidth: 300,
                            '& .MuiTypography-root': {
                              lineHeight: 1.5,
                            },
                          },
                        },
                        popper: {
                          sx: {
                            zIndex: theme.zIndex.tooltip,
                          },
                        },
                      }}
                    >
                      <IconButton
                        size="small"
                        aria-label="Packet information"
                        sx={{
                          color: theme.palette.primary.main,
                          opacity: 0.7,
                          '&:hover': {
                            opacity: 1,
                            backgroundColor: alpha(
                              theme.palette.primary.main,
                              0.08
                            ),
                          },
                        }}
                      >
                        <InfoOutlined sx={{ fontSize: '1rem' }} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Box>

                <Box sx={{ p: 2 }}>
                  <Stack spacing={1.5}>
                    {packetSelections.map((selection, index) => (
                      <DisciplineSelection
                        key={selection.disciplineId}
                        selection={selection}
                        discipline={disciplines[selection.disciplineId]}
                        isTopPriority={index === 0}
                      />
                    ))}
                  </Stack>
                </Box>
              </Paper>
            );
          })}
        </Stack>
      </Box>

      {/* Footer with Actions */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 2.5 },
          borderTop: '1px solid',
          borderColor: 'divider',
          position: 'sticky',
          bottom: 0,
          bgcolor: theme.palette.background.paper,
          zIndex: 1,
        }}
      >
        <Stack spacing={2}>
          {error && (
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: alpha(theme.palette.error.main, 0.08),
                borderRadius: 1.5,
                border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
              }}
            >
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            </Paper>
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
                sx={{
                  height: 42,
                  px: 3,
                  borderRadius: 1.5,
                  textTransform: 'none',
                  fontWeight: 500,
                }}
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
                height: 42,
                borderRadius: 1.5,
                textTransform: 'none',
                fontSize: '0.9375rem',
                fontWeight: 600,
                position: 'relative',
              }}
            >
              {isSubmitting ? (
                <>
                  <CircularProgress
                    size={20}
                    thickness={4}
                    sx={{
                      mr: 1.5,
                      color: alpha(theme.palette.primary.contrastText, 0.8),
                    }}
                  />
                  Processing...
                </>
              ) : (
                'Confirm Enrollment'
              )}
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
    >
      <Content />
    </Drawer>
  ) : (
    <Dialog
      open={open}
      onClose={!isSubmitting ? onClose : undefined}
      maxWidth="md"
      fullWidth
    >
      <Content />
    </Dialog>
  );
};
