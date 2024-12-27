import {
  Alert,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import {
  CheckCircleOutline,
  Class,
  Close,
  Info
} from '@mui/icons-material';

import { DisciplinePacket } from '../../../types/disciplines/disciplines.types';
import { FC } from 'react';

interface SelectionRequirementsModalProps {
  open: boolean;
  onClose: () => void;
  packets: DisciplinePacket[];
}

export const SelectionRequirementsModal: FC<SelectionRequirementsModalProps> = ({
  open,
  onClose,
  packets,
}) => {
  const theme = useTheme();

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
      <DialogTitle sx={{ 
        pb: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Info color="primary" />
          <Typography variant="h6" component="span">
            Selection Requirements
          </Typography>
        </Box>
        <IconButton 
          onClick={onClose}
          size="small"
          sx={{ color: 'text.secondary' }}
        >
          <Close fontSize="small" />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="subtitle1" 
            color="primary"
            sx={{ mb: 2, fontWeight: 600 }}
          >
            Required Selections by Packet
          </Typography>
          <List disablePadding>
            {packets.map((packet) => (
              <ListItem 
                key={packet.id}
                sx={{
                  px: 2,
                  py: 1.5,
                  bgcolor: alpha(theme.palette.background.default, 0.6),
                  borderRadius: 1,
                  mb: 1,
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <CheckCircleOutline color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={packet.name}
                  secondary={`Select ${packet.maxChoices} discipline${packet.maxChoices > 1 ? 's' : ''} in order of preference`}
                  primaryTypographyProps={{
                    fontWeight: 500,
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box>
          <Typography 
            variant="subtitle1" 
            color="primary"
            sx={{ mb: 2, fontWeight: 600 }}
          >
            Selection Process
          </Typography>
          <Alert 
            icon={<Class />} 
            severity="info"
            sx={{ 
              mb: 2,
              '& .MuiAlert-message': {
                width: '100%',
              },
            }}
          >
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Priority-based Enrollment
            </Typography>
            <Typography variant="body2">
              Your selections will be processed in priority order. If you cannot be enrolled in your primary choice, we will attempt to enroll you in your backup selections.
            </Typography>
          </Alert>
          
          <List disablePadding>
            <ListItem sx={{ px: 2, py: 1 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CheckCircleOutline fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="Set priorities carefully - they determine enrollment order"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
            <ListItem sx={{ px: 2, py: 1 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CheckCircleOutline fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="You can reorder selections at any time before submission"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          </List>
        </Box>
      </DialogContent>
    </Dialog>
  );
};