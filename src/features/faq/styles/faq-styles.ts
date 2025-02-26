import { Accordion, Box, Paper, styled } from '@mui/material';

import { alpha } from '@mui/material/styles';

export const StyledAccordion = styled(Accordion)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '8px !important',
  marginBottom: theme.spacing(1),
  boxShadow: 'none',
  transition: theme.transitions.create(['border-color', 'box-shadow'], {
    duration: 200,
  }),

  '&:hover': {
    borderColor: alpha(theme.palette.primary.main, 0.3),
  },

  '&:before': {
    display: 'none',
  },

  '& .MuiAccordionSummary-root': {
    padding: theme.spacing(1.5, 2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(1.5, 3),
    },
  },

  '& .MuiAccordionDetails-root': {
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2, 3, 3),
    },
  },
}));

export const HeaderPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
}));

export const ContentPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
  overflow: 'hidden',
}));

export const TabsContainer = styled(Box)(({ theme }) => ({
  borderBottom: 1,
  borderColor: 'divider',
  backgroundColor: alpha(theme.palette.primary.main, 0.03),
}));

export const FeaturePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  backgroundColor: alpha(theme.palette.primary.main, 0.04),
  borderRadius: theme.shape.borderRadius * 2,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: alpha(theme.palette.primary.main, 0.1),
}));

export const WarningPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  backgroundColor: alpha(theme.palette.warning.main, 0.05),
  borderRadius: theme.shape.borderRadius * 2,
  border: '1px solid',
  borderColor: alpha(theme.palette.warning.main, 0.1),
}));
