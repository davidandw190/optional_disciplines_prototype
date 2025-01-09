import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { Close, InfoOutlined } from '@mui/icons-material';

import { Announcement } from '../../../../types/disciplines/disciplines.types';
import { FC } from 'react';
import { formatAnnouncementDate } from '../../../../utils/dateUtils';

interface AnnouncementModalProps {
  announcement: Announcement;
  open: boolean;
  onClose: () => void;
}

export const AnnouncementModal: FC<AnnouncementModalProps> = ({
  announcement,
  open,
  onClose,
}) => {
  const theme = useTheme();
  const { title, content, date, important } = announcement;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          background: theme.palette.background.paper,
        },
      }}
    >
      <DialogTitle
        sx={{
          pb: 2,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <InfoOutlined
            color={important ? 'error' : 'action'}
            sx={{ mt: 0.25 }}
          />
          <Typography variant="h6" component="span" fontWeight={600}>
            {title}
          </Typography>
        </Stack>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: 'text.secondary',
            mt: -0.5,
            mr: -0.5,
          }}
        >
          <Close fontSize="small" />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ pt: 3 }}>
        <Stack spacing={3}>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {content}
          </Typography>

          <Box sx={{ mt: 'auto' }}>
            <Typography
              variant="caption"
              color="text.secondary"
              component="div"
            >
              Posted on {formatAnnouncementDate(date)}
            </Typography>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
