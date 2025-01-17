import { AutoMode, DarkMode, LightMode } from '@mui/icons-material';
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

interface ThemeDialogProps {
  open: boolean;
  onClose: () => void;
  onThemeSelect: (theme: 'dark' | 'light' | 'system') => void;
}

export const ThemeDialog: React.FC<ThemeDialogProps> = ({
  open,
  onClose,
  onThemeSelect,
}) => {
  const themeOptions = [
    { icon: <DarkMode />, label: 'Dark', value: 'dark' as const },
    { icon: <LightMode />, label: 'Light', value: 'light' as const },
    { icon: <AutoMode />, label: 'System', value: 'system' as const },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { minWidth: '300px' },
      }}
    >
      <DialogTitle>Select theme</DialogTitle>
      <List>
        {themeOptions.map((option) => (
          <ListItem key={option.value} disableGutters>
            <ListItemButton onClick={() => onThemeSelect(option.value)}>
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText primary={option.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};
