import { CheckCircleOutline, ErrorOutline, HourglassTop, InfoOutlined, WarningAmber } from '@mui/icons-material';
import { DisciplineSelection, EnrollmentPacketSummary } from '../../../../types/enrollments/enrollment-summary.types';

import { EnrollmentStatus } from '../../../../types/disciplines/disciplines.enums';
import { StatusInfo } from '../../../../types/enrollments/enrollment-selection.types';
import { Theme } from '@mui/material';

export const getStatusIcon = (status: EnrollmentStatus) => {
  switch (status) {
    case EnrollmentStatus.CONFIRMED:
      return <CheckCircleOutline />;
    case EnrollmentStatus.PENDING:
      return <HourglassTop />;
    case EnrollmentStatus.WAITLIST:
      return <WarningAmber />;
    case EnrollmentStatus.REJECTED:
      return <ErrorOutline />;
    default:
      return <InfoOutlined />;
  }
};

export const formatSubmissionTime = (date: Date) =>
  new Date(date).toLocaleString(undefined, {
    dateStyle: 'long',
    timeStyle: 'short',
  });

export const getPacketTooltipMessage = (packet: EnrollmentPacketSummary) => {
  const selectedCount = packet.selections.length;
  const maxChoices = packet.packet.maxChoices;

  const allConfirmed = packet.selections.every(
    (s: DisciplineSelection) => s.status === EnrollmentStatus.CONFIRMED
  );
  
  const pendingSelections = packet.selections.filter(
    (s: DisciplineSelection) => s.status === EnrollmentStatus.PENDING
  ).length;
  
  const waitlistedSelections = packet.selections.filter(
    (s: DisciplineSelection) => s.status === EnrollmentStatus.WAITLIST
  ).length;

  let message = `This packet allows ${maxChoices} selection${
    maxChoices > 1 ? 's' : ''
  }.`;
  
  message += ` You have selected ${selectedCount} discipline${
    selectedCount !== 1 ? 's' : ''
  }.`;

  if (allConfirmed) {
    message += ' All your selections have been confirmed.';
  } else if (pendingSelections > 0) {
    message += ` ${pendingSelections} selection${pendingSelections !== 1 ? 's are' : ' is'} pending approval.`;
  } else if (waitlistedSelections > 0) {
    message += ` You are on the waitlist for ${waitlistedSelections} selection${waitlistedSelections !== 1 ? 's' : ''}.`;
  }

  if (packet.packet.description) {
    message += `\n\nAbout this packet: ${packet.packet.description}`;
  }

  return message;
};

export const getStatusInfo = (
  status: EnrollmentStatus, 
  confirmedCount: number, 
  pendingCount: number, 
  waitlistedCount: number,
  theme: Theme
): StatusInfo => {
  switch (status) {
    case EnrollmentStatus.CONFIRMED:
      return {
        message: `You have been successfully enrolled in ${confirmedCount} discipline${
          confirmedCount !== 1 ? 's' : ''
        }. Your academic schedule is now finalized for the upcoming semester.`,
        icon: <CheckCircleOutline />,
        color: theme.palette.success.main,
        title: 'Enrollment Confirmed'
      };
    case EnrollmentStatus.PENDING:
      return {
        message: `Your enrollment request with ${pendingCount} discipline${
          pendingCount !== 1 ? 's' : ''
        } is being processed. This typically takes 2-3 business days. You'll receive a notification when results are available.`,
        icon: <HourglassTop />,
        color: theme.palette.warning.main,
        title: 'Processing Enrollment'
      };
    case EnrollmentStatus.WAITLIST:
      return {
        message: `You are on the waitlist for ${waitlistedCount} discipline${
          waitlistedCount !== 1 ? 's' : ''
        }. If spaces become available, you'll be automatically enrolled based on your priority order.`,
        icon: <WarningAmber />,
        color: theme.palette.info.main,
        title: 'On Waitlist'
      };
    case EnrollmentStatus.REJECTED:
      return {
        message:
          'Your enrollment request could not be processed. Please contact Student Services for assistance and to discuss alternative options.',
        icon: <ErrorOutline />,
        color: theme.palette.error.main,
        title: 'Enrollment Unsuccessful'
      };
    default:
      return {
        message: '',
        icon: <InfoOutlined />,
        color: theme.palette.grey[500],
        title: 'Status Unknown'
      };
  }
};