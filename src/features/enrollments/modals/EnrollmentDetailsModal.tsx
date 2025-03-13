import {
  Box,
  Dialog,
  Drawer,
  Stack,
  alpha,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FC, useMemo } from 'react';
import { formatSubmissionTime, getPacketTooltipMessage, getStatusInfo } from './utils/details-utils';

import { DisciplineItem } from './components/DisciplineItem';
import { EnrollmentStatus } from '../../../types/disciplines/disciplines.enums';
import { EnrollmentSummary } from '../../../types/enrollments/enrollment-summary.types';
import { ModalHeader } from './components/ModalHeader';
import { PacketSection } from './components/PacketSection';
import { School } from '@mui/icons-material';
import { StatusBanner } from './components/StatusBanner';
import { Student } from '../../../types/student/student.types';

interface EnrollmentDetailsModalProps {
  open: boolean;
  onClose: () => void;
  enrollment: EnrollmentSummary;
  student: Student;
}

export const EnrollmentDetailsModal: FC<EnrollmentDetailsModalProps> = ({
  open,
  onClose,
  enrollment,
  student,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const specialization = useMemo(() => {
    const { targetSpecializations } = enrollment.enrollmentPeriod;
    if (targetSpecializations?.includes(student.specialization)) {
      return student.specialization;
    }
    if (targetSpecializations?.includes('All Specializations')) {
      return student.specialization;
    }
    return null;
  }, [enrollment.enrollmentPeriod, student.specialization]);

  const statusCounts = useMemo(() => {
    const confirmedCount = enrollment.packets.reduce(
      (count, packet) =>
        count +
        packet.selections.filter((s) => s.status === EnrollmentStatus.CONFIRMED)
          .length,
      0
    );

    const pendingCount = enrollment.packets.reduce(
      (count, packet) =>
        count +
        packet.selections.filter((s) => s.status === EnrollmentStatus.PENDING)
          .length,
      0
    );

    const waitlistedCount = enrollment.packets.reduce(
      (count, packet) =>
        count +
        packet.selections.filter((s) => s.status === EnrollmentStatus.WAITLIST)
          .length,
      0
    );

    return { confirmedCount, pendingCount, waitlistedCount };
  }, [enrollment.packets]);

  const renderSubtitle = useMemo(() => (
    <Stack spacing={1}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={{ xs: 0.5, sm: 2 }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <School
            sx={{
              fontSize: '1rem',
              color: theme.palette.primary.main,
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Box component="span" sx={{ fontWeight: 500 }}>
              {`${enrollment.enrollmentPeriod.academicYear} • Year ${enrollment.enrollmentPeriod.yearOfStudy} - Sem ${enrollment.enrollmentPeriod.semester}`}
            </Box>

            {specialization && (
              <Box 
                component="span" 
                sx={{ 
                  px: 1, 
                  py: 0.125, 
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  borderRadius: 1,
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  ml: 0.5,
                }}
              >
                {specialization}
              </Box>
            )}
          </Box>
        </Stack>
      </Stack>

      <Box
        sx={{ 
          color: theme.palette.text.secondary,
          fontSize: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: 0.75,
        }}
      >
        Submitted on {formatSubmissionTime(enrollment.enrollmentDate)}
      </Box>
    </Stack>
  ), [enrollment.enrollmentPeriod, enrollment.enrollmentDate, specialization, theme]);

  const renderStatusBanner = useMemo(() => {
    const { confirmedCount, pendingCount, waitlistedCount } = statusCounts;
    const statusInfo = getStatusInfo(
      enrollment.status,
      confirmedCount,
      pendingCount,
      waitlistedCount,
      theme
    );

    return (
      <StatusBanner
        icon={statusInfo.icon}
        title={statusInfo.title}
        message={statusInfo.message}
        color={statusInfo.color}
        severity={
          enrollment.status === EnrollmentStatus.CONFIRMED ? 'success' :
          enrollment.status === EnrollmentStatus.PENDING ? 'info' :
          enrollment.status === EnrollmentStatus.WAITLIST ? 'warning' :
          'error'
        }
      />
    );
  }, [enrollment.status, statusCounts, theme]);

  const Content = () => (
    <Stack sx={{ height: '100%' }}>
      {/* Header */}
      <ModalHeader
        title={enrollment.enrollmentPeriod.type.split('_').join(' ')}
        subtitle={renderSubtitle}
        icon={<School color="primary" sx={{ fontSize: 28 }} />}
        onClose={onClose}
        statusBanner={renderStatusBanner}
      />

      {/* Packets and Selections */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: { xs: 2, sm: 2.5 },
          maxHeight: { xs: undefined, sm: 'calc(80vh - 170px)' },
          bgcolor: (theme) => alpha(theme.palette.background.paper, 0.98),
        }}
      >
        <Stack spacing={3}>
          {enrollment.packets.length === 0 ? (
            <PacketSection
              packetName="No Selections"
              emptyMessage="You have no selections for this enrollment" children={undefined}            />
          ) : (
            enrollment.packets.map((packet) => (
              <PacketSection
                key={packet.packet.id}
                packetName={packet.packet.name}
                packetInfo={getPacketTooltipMessage(packet)}
                emptyMessage="No selections in this packet"
              >
                {packet.selections.map((selection, index) => (
                  <DisciplineItem
                    key={selection.disciplineId}
                    name={selection.name}
                    code={selection.code}
                    priority={selection.priority}
                    status={selection.status}
                    teacher={selection.teacher}
                    isTopPriority={index === 0}
                    showStatus={true}
                  />
                ))}
              </PacketSection>
            ))
          )}
        </Stack>
      </Box>
    </Stack>
  );

  return isMobile ? (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          height: '90vh',
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
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '90vh',
           bgcolor: (theme) => alpha(theme.palette.background.paper, 0.98),
        },
      }}
    >
      <Content />
    </Dialog>
  );
};