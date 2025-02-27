import { Box, Card, Paper, Stack, alpha, styled } from '@mui/material';

export const PageContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

export const HeaderPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
  width: '100%',
}));

export const ContentPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
  overflow: 'hidden',
  width: '100%',
}));

export const TabsContainer = styled(Box)(({ theme }) => ({
  borderBottom: 1,
  borderColor: 'divider',
  backgroundColor: alpha(theme.palette.primary.main, 0.03),
}));

export const TypeInfoPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: alpha(theme.palette.primary.main, 0.03),
  borderRadius: theme.shape.borderRadius * 1.5,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
}));

export const EnrollmentCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2.5),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid',
  borderColor: theme.palette.divider,
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'all 0.2s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    transform: 'translateY(-2px)',
    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.08)}`,
  },
}));

export const StatusChip = styled(Box)<{ color: string }>(
  ({ theme, color }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 1),
    borderRadius: theme.shape.borderRadius,
    fontSize: '0.75rem',
    fontWeight: 500,
    backgroundColor: alpha(color, 0.1),
    color,
    lineHeight: '1.5',
  })
);

export const EmptyStateContainer = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(8, 3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: alpha(theme.palette.primary.main, 0.04),
  borderRadius: theme.shape.borderRadius * 2,
}));
