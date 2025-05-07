import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { DarkMode, Logout } from '@mui/icons-material';

import { useAuth } from '../../../contexts/auth.context';
import { useState } from 'react';

interface UserMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onThemeClick: () => void;
  onLogout: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({
  anchorEl,
  open,
  onClose,
  onThemeClick,
}) => {

  const { logout } = useAuth();
  const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false);

  const handleLogoutClick = () => {
    onClose(); 
    setConfirmLogoutOpen(true); 
  };

  const handleCancelLogout = () => {
    setConfirmLogoutOpen(false);
  };

  const handleConfirmLogout = () => {
    setConfirmLogoutOpen(false);
    logout(); 
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1,
            minWidth: 180,
            borderRadius: 1,
          },
        }}
      >
        <MenuItem onClick={onThemeClick}>
          <ListItemIcon>
            <DarkMode fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Toggle Theme" />
        </MenuItem>
        
        {/* Red logout button */}
        <MenuItem onClick={handleLogoutClick} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <Logout fontSize="small" sx={{ color: 'error.main' }} />
          </ListItemIcon>
          <ListItemText primary="Sign out" />
        </MenuItem>
      </Menu>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={confirmLogoutOpen}
        onClose={handleCancelLogout}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" component="div">
            Confirm Logout
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to log out? You'll need to sign in again to access your account.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            variant="outlined" 
            onClick={handleCancelLogout}
            sx={{ minWidth: '80px' }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleConfirmLogout}
            color="error"
            sx={{ 
              minWidth: '80px',
              ml: 1,
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};