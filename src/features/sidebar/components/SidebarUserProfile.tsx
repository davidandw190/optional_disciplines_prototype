import {
  Avatar,
  Box,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import { Student } from '../../../types/student/student.types';

interface SidebarUserProfileProps {
  student: Student;
  onMenuOpen: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const SidebarUserProfile: React.FC<SidebarUserProfileProps> = ({
  student,
  onMenuOpen,
}) => {
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
              {student.firstName[0]}
            </Avatar>
          </ListItemIcon>
          <ListItemText
            primary={`${student.firstName} ${student.lastName}`}
            secondary={student.email}
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
