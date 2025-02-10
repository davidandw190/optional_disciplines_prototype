export const getStatusColor = (status: string, theme: any) => {
  switch (status.toLowerCase()) {
    case 'confirmed':
      return theme.palette.success;
    case 'pending':
      return theme.palette.warning;
    case 'rejected':
      return theme.palette.error;
    case 'waitlist':
      return theme.palette.info;
    default:
      return theme.palette.grey;
  }
};