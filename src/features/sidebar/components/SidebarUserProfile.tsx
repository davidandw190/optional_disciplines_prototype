import {
  Avatar,
  Box,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
} from '@mui/material';

import { Person } from '@mui/icons-material';
import { Student } from '../../../types/student/student.types';

interface SidebarUserProfileProps {
  student?: Student | null;
  onMenuOpen: (event: React.MouseEvent<HTMLDivElement>) => void;
  isLoading?: boolean;
}

export const SidebarUserProfile: React.FC<SidebarUserProfileProps> = ({
  student,
  onMenuOpen,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <Box>
        <Divider />
        <ListItem sx={{ p: 1.5 }}>
          <ListItemIcon>
            <Skeleton variant="circular" width={32} height={32} />
          </ListItemIcon>
          <Box sx={{ width: '100%' }}>
            <Skeleton width="80%" height={20} />
            <Skeleton width="60%" height={16} />
          </Box>
        </ListItem>
      </Box>
    );
  }

  if (!student) {
    return (
      <Box>
        <Divider />
        <ListItem
          sx={{
            p: 1.5,
            '&:hover': { backgroundColor: 'action.hover' },
          }}
        >
          <ListItemButton onClick={onMenuOpen} sx={{ px: 1.5 }}>
            <ListItemIcon>
              <Avatar
                sx={{
                  bgcolor: 'grey.400',
                  width: 32,
                  height: 32,
                }}
              >
                <Person fontSize="small" />
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary="User Profile"
              secondary="Login for full access"
              primaryTypographyProps={{
                variant: 'body2',
                fontWeight: 600,
                color: 'text.primary',
              }}
              secondaryTypographyProps={{
                variant: 'caption',
                color: 'text.secondary',
              }}
            />
          </ListItemButton>
        </ListItem>
      </Box>
    );
  }

  const getInitial = (name?: string) => {
    return name && name.length > 0 ? name[0].toUpperCase() : '?';
  };

  return (
    <Box>
      <Divider />
      <ListItem
        sx={{
          p: 1.5,
          '&:hover': { backgroundColor: 'action.hover' },
        }}
      >
        <ListItemButton
          onClick={onMenuOpen}
          sx={{
            px: 1.5,
            '& .MuiListItemText-root': {
              overflow: 'hidden',
            },
          }}
        >
          <ListItemIcon>
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                width: 32,
                height: 32,
              }}
            >
              {getInitial(student.firstName)}
            </Avatar>
          </ListItemIcon>
          <ListItemText
            primary={`${student.firstName || ''} ${student.lastName || ''}`}
            secondary={student.email || 'No email provided'}
            primaryTypographyProps={{
              variant: 'body2',
              fontWeight: 600,
              color: 'text.primary',
            }}
            secondaryTypographyProps={{
              variant: 'caption',
              color: 'text.secondary',
            }}
          />
        </ListItemButton>
      </ListItem>
    </Box>
  );
};
