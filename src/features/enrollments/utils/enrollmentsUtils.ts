import { EnrollmentStatus } from '../../../types/disciplines/disciplines.enums';
import { Theme } from '@mui/material';

export const getStatusColor = (status: EnrollmentStatus, theme: Theme) => {
  switch (status) {
    case EnrollmentStatus.CONFIRMED:
      return {
        main: theme.palette.success.main,
        light: theme.palette.success.light,
      };
    case EnrollmentStatus.PENDING:
      return {
        main: theme.palette.warning.main,
        light: theme.palette.warning.light,
      };
    case EnrollmentStatus.REJECTED:
      return {
        main: theme.palette.error.main,
        light: theme.palette.error.light,
      };
    default:
      return {
        main: theme.palette.text.secondary,
        light: theme.palette.grey[400],
      };
  }
};

export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const getStatusLabel = (status: EnrollmentStatus) => {
  switch (status) {
    case EnrollmentStatus.CONFIRMED:
      return 'Confirmed';
    case EnrollmentStatus.PENDING:
      return 'Pending';
    case EnrollmentStatus.REJECTED:
      return 'Rejected';
    default:
      return 'Unknown';
  }
};