import {
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import { NavigationItem } from '../../../types/sidebar/sidebar.types';

interface SidebarNavigationProps {
  items: NavigationItem[];
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  items,
}) => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const tooltipPlacement = isMobile ? 'bottom' : 'right';

  return (
    <List
      sx={{
        flex: 1,
        px: 1,
        py: 1,
        '& .MuiListItem-root': {
          width: 'auto',
          mx: 0.5,
        },
      }}
    >
      {items.map((item) => {
        const listButton = (
          <ListItemButton
            component={Link}
            to={item.path}
            selected={location.pathname.startsWith(item.path)}
            disabled={item.disabled}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              color: item.disabled
                ? 'text.disabled'
                : location.pathname.startsWith(item.path)
                ? 'primary.main'
                : 'text.primary',
              '&.Mui-disabled': {
                opacity: 0.7,
                cursor: 'not-allowed',
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: 'inherit',
                minWidth: 40,
                opacity: item.disabled ? 0.5 : 1,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.title}
              primaryTypographyProps={{
                fontWeight: location.pathname.startsWith(item.path) ? 600 : 400,
                sx: { opacity: item.disabled ? 0.7 : 1 },
              }}
            />
            {item.badge && (
              <Chip
                label={item.badge}
                size="small"
                color={item.badgeColor}
                sx={{
                  ml: 1,
                  height: 24,
                  opacity: item.disabled ? 0.7 : 1,
                }}
              />
            )}
          </ListItemButton>
        );

        return (
          <ListItem key={`${item.title}-${item.path}`} disablePadding>
            {item.disabled ? (
              <Tooltip
                title="This enrollment will come soon"
                placement={tooltipPlacement}
                arrow
              >
                <span>{listButton}</span>
              </Tooltip>
            ) : (
              listButton
            )}
          </ListItem>
        );
      })}
    </List>
  );
};
