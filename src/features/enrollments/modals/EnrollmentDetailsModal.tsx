import {
  Box,
  Dialog,
  Drawer,
  Stack,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { formatSubmissionTime, getPacketTooltipMessage, getStatusInfo } from './utils/details-utils';

import { DisciplineItem } from './components/DisciplineItem';
import { EnrollmentStatus } from '../../../types/disciplines/disciplines.enums';
import { EnrollmentSummary } from '../../../types/enrollments/enrollment-summary.types';
import { FC } from 'react';
import { ModalHeader } from './components/ModalHeader';
import { PacketSection } from './components/PacketSection';
import {
  School,
} from '@mui/icons-material';
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

  const getSpecializationInfo = () => {
    const { targetSpecializations } = enrollment.enrollmentPeriod;
    if (targetSpecializations?.includes(student.specialization)) {
      return student.specialization;
    }
    if (targetSpecializations?.includes('All Specializations')) {
      return student.specialization;
    }
    return null;
  };

  const specialization = getSpecializationInfo();

  // Calculate counts for status message
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

  const renderSubtitle = () => (
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
            <Typography
              variant="subtitle2"
              sx={{ color: theme.palette.text.primary }}
            >
              {`${enrollment.enrollmentPeriod.academicYear} • Year ${enrollment.enrollmentPeriod.yearOfStudy} - Sem ${enrollment.enrollmentPeriod.semester}`}
            </Typography>

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

      <Typography
        variant="caption"
        sx={{
          color: theme.palette.text.secondary,
          display: 'flex',
          alignItems: 'center',
          gap: 0.75,
        }}
      >
        Submitted on {formatSubmissionTime(enrollment.enrollmentDate)}
      </Typography>
    </Stack>
  );

  const renderStatusBanner = () => {
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
      />
    );
  };

  const Content = () => (
    <Stack sx={{ height: '100%' }}>
      {/* Header */}
      <ModalHeader
        title={enrollment.enrollmentPeriod.type.split('_').join(' ')}
        subtitle={renderSubtitle()}
        icon={<School color="primary" sx={{ fontSize: 28 }} />}
        onClose={onClose}
        statusBanner={renderStatusBanner()}
      />

      {/* Packets and Selections */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: { xs: 2, sm: 2.5 },
          maxHeight: { xs: undefined, sm: 'calc(80vh - 170px)' },
        }}
      >
        <Stack spacing={3}>
          {enrollment.packets.map((packet) => (
            <PacketSection
              key={packet.packet.id}
              packetName={packet.packet.name}
              packetInfo={getPacketTooltipMessage(packet)}
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
          ))}
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
        },
      }}
    >
      <Content />
    </Dialog>
  );
};