import { Button, CircularProgress, Paper, Stack, Typography, alpha, useTheme } from '@mui/material';

import { FC } from 'react';

interface ConfirmationActionsProps {
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting: boolean;
  error: string | null;
  isMobile: boolean;
}

export const ConfirmationActions: FC<ConfirmationActionsProps> = ({
  onClose,
  onConfirm,
  isSubmitting,
  error,
  isMobile
}) => {
  const theme = useTheme();
  
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        position: 'sticky',
        bottom: 0,
        bgcolor: 'transparent',
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
            onClick={onConfirm}
            disabled={isSubmitting}
            sx={{
              height: 48,
              borderRadius: 1.5,
              textTransform: 'none',
              fontSize: '0.9375rem',
              fontWeight: 600,
              position: 'relative',
              overflow: 'hidden',
            }}
            
          >
            {isSubmitting ? (
              <>
                <CircularProgress 
                  size={24} 
                  thickness={4}
                  sx={{ 
                    position: 'absolute',
                    left: 16,
                    color: alpha(theme.palette.primary.contrastText, 0.8)
                  }}
                />
                Processing Enrollment...
              </>
            ) : (
              'Confirm Enrollment'
            )}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};