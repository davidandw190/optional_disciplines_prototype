import {
  Box,
  IconButton,
  Stack,
  Typography,
  alpha,
  useTheme
} from '@mui/material';

import { Close } from '@mui/icons-material';

interface ModalHeaderProps {
  title: string;
  subtitle?: string | React.ReactNode;
  icon?: React.ReactNode;
  onClose: () => void;
  statusBanner?: React.ReactNode;
  isSubmitting?: boolean;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  subtitle,
  icon,
  onClose,
  statusBanner,
  isSubmitting = false
}) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
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
          <Stack direction="row" spacing={1.5} alignItems="center">
            {icon}
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: theme.palette.primary.main,
              }}
            >
              {title}
            </Typography>
          </Stack>

          {subtitle && (
            typeof subtitle === 'string' 
              ? <Typography variant="subtitle1" color="text.secondary">{subtitle}</Typography>
              : subtitle
          )}
        </Stack>

        <IconButton
          onClick={onClose}
          size="small"
          disabled={isSubmitting}
          aria-label="Close"
          sx={{
            '&:hover': {
              bgcolor: alpha(theme.palette.primary.main, 0.05),
            },
          }}
        >
          <Close />
        </IconButton>
      </Stack>

      {statusBanner && (
        <Box sx={{ mt: 2 }}>
          {statusBanner}
        </Box>
      )}
    </Box>
  );
};