import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Drawer,
  Stack,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  CalendarToday,
  Info,
  School,
} from '@mui/icons-material';
import {
  Discipline,
  DisciplinePacket,
  EnrollmentPeriod,
} from '../../../types/disciplines/disciplines.types';
import { FC, useMemo, useState } from 'react';
import { formatDate, getEnrollmentSummary, getPacketTooltipMessage } from './utils/confirmation-utils';

import { DisciplineItem } from './components/DisciplineItem';
import { EnrollmentSelectionState } from '../../../types/enrollments/enrollment-selection.types';
import { ModalHeader } from './components/ModalHeader';
import { PacketSection } from './components/PacketSection';
import { StatusBanner } from './components/StatusBanner';

interface EnrollmentConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  selections: EnrollmentSelectionState;
  packets: DisciplinePacket[];
  disciplines: Record<string, Discipline>;
  enrollmentPeriod: EnrollmentPeriod;
}

export const EnrollmentConfirmationModal: FC<EnrollmentConfirmationModalProps> = ({
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
    if (isSubmitting) return; 
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      await onConfirm();
    } catch (err) {
      setError(
        err instanceof Error 
          ? err.message 
          : 'An error occurred while processing your enrollment. Please try again.'
      );
      setIsSubmitting(false);
    }
  };

  const renderSubtitle = useMemo(() => (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      alignItems={{ xs: 'flex-start', sm: 'center' }}
      spacing={{ xs: 0.5, sm: 2 }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <CalendarToday
          sx={{
            fontSize: '0.875rem',
            color: theme.palette.text.secondary,
          }}
        />
        <Typography variant="body2" color="text.secondary">
          {enrollmentPeriod.academicYear} - Semester {enrollmentPeriod.semester}
        </Typography>
      </Stack>
      <Typography 
        variant="caption" 
        sx={{ 
          px: 1, 
          py: 0.25, 
          bgcolor: alpha(theme.palette.primary.main, 0.08),
          color: theme.palette.primary.main,
          borderRadius: 1,
          fontWeight: 500
        }}
      >
        Deadline: {formatDate(enrollmentPeriod.endDate)}
      </Typography>
    </Stack>
  ), [enrollmentPeriod, theme]);

  const renderStatusBanner = useMemo(() => (
    <StatusBanner
      icon={<Info />}
      title="Review Your Selections"
      message={getEnrollmentSummary(selections, packets)}
      color={theme.palette.info.main}
      severity="info"
    />
  ), [selections, packets, theme]);

  const hasSelections = useMemo(() => {
    return packets.some(packet => 
      selections.packets[packet.id]?.selections.length > 0
    );
  }, [selections, packets]);

  const Content = () => (
    <Stack sx={{ height: '100%' }}>
      {/* Header */}
      <ModalHeader
        title="Confirm Enrollment"
        subtitle={renderSubtitle}
        icon={<School color="primary" sx={{ fontSize: 28 }} />}
        onClose={!isSubmitting ? onClose : () => {}}
        statusBanner={renderStatusBanner}
        isSubmitting={isSubmitting}
      />

      {/* Content Area */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: { xs: 2, sm: 2.5 },
          maxHeight: { xs: undefined, sm: 'calc(80vh - 170px)' },
          bgcolor: (theme) => alpha(theme.palette.background.paper, 0.98),
        }}
      >
        {hasSelections ? (
          <Stack spacing={3}>
            {packets.map((packet) => {
              const packetSelections = selections.packets[packet.id]?.selections || [];
              if (packetSelections.length === 0) return null;

              return (
                <PacketSection
                  key={packet.id}
                  packetName={packet.name}
                  packetInfo={getPacketTooltipMessage(packet, packetSelections)}
                >
                  {packetSelections.map((selection, index) => {
                    const discipline = disciplines[selection.disciplineId];
                    return (
                      <DisciplineItem
                        key={selection.disciplineId}
                        name={discipline.name}
                        code={discipline.code}
                        priority={selection.priority}
                        isTopPriority={index === 0}
                        teacher={discipline.teachingActivities.find(
                          activity => activity.type === 'COURSE'
                        )?.teacher}
                        credits={discipline.credits}
                        language={discipline.language}
                        weeklyHours={discipline.weeklyHours.total}
                      />
                    );
                  })}
                </PacketSection>
              );
            })}
          </Stack>
        ) : (
          <Stack 
            alignItems="center" 
            justifyContent="center" 
            spacing={2} 
            sx={{ py: 6 }}
          >
            <Typography variant="subtitle1" color="text.secondary">
              No selections to confirm
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please select disciplines before proceeding to confirmation.
            </Typography>
            <Button variant="outlined" onClick={onClose}>
              Go Back to Selection
            </Button>
          </Stack>
        )}
      </Box>

      {/* Footer with Action Buttons */}
      {hasSelections && (
        <Box
          sx={{
            p: { xs: 2, sm: 2.5 },
            borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            position: 'sticky',
            bottom: 0,
            bgcolor: theme.palette.background.paper,
            zIndex: 1,
          }}
        >
          <Stack spacing={2}>
            {error && (
              <Typography 
                color="error" 
                variant="body2"
                sx={{
                  p: 1,
                  bgcolor: alpha(theme.palette.error.main, 0.05),
                  borderRadius: 1,
                  border: `1px solid ${alpha(theme.palette.error.main, 0.1)}`,
                }}
              >
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
                  position: 'relative',
                }}
              >
                {isSubmitting ? (
                  <>
                    <CircularProgress 
                      size={24} 
                      thickness={4}
                      sx={{ 
                        mr: 1.5,
                        color: alpha(theme.palette.primary.contrastText, 0.8)
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
        </Box>
      )}
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
        },
      }}
    >
      <Content />
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
        }
      }}
      disableEscapeKeyDown={isSubmitting}
    >
      <Content />
    </Dialog>
  );
};