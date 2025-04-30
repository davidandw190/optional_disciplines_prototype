import {
  Chip,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import { FC } from 'react';
import { NavigationItem } from '../../../types/sidebar/sidebar.types';
import { showToast } from '../../../utils/toastUtils';

interface SidebarNavItemProps {
  item: NavigationItem;
}

export const SidebarNavItem: FC<SidebarNavItemProps> = ({ item }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const tooltipPlacement = isMobile ? 'bottom' : 'right';

  const handleNavClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (item.disabled) {
      e.preventDefault();

      if (item.path.includes('enrollment-periods')) {
        if (item.badge === 'Upcoming') {
          showToast.info(`${item.title} enrollment period is not active yet`);
        } else if (item.path.includes('elective-disciplines')) {
          showToast.info(
            `Elective disciplines enrollment is currently not available`
          );
        } else if (item.path.includes('complementary-disciplines')) {
          showToast.info(
            `Complementary disciplines enrollment is currently not available`
          );
        } else if (item.path.includes('thesis-registration')) {
          showToast.info(`Thesis registration is currently not available`);
        } else {
          showToast.info(`${item.title} enrollment is currently not available`);
        }
      } else {
        showToast.info(`${item.title} is not currently accessible`);
      }
      return;
    }

    navigate(item.path);
  };

  const getTooltipContent = () => {
    if (!item.disabled) return '';

    if (item.path.includes('enrollment-periods')) {
      if (item.badge === 'Upcoming') {
        return "This enrollment period hasn't started yet";
      } else {
        return 'This enrollment period is not currently active';
      }
    }

    return 'This section is not currently available';
  };

  const listButton = (
    <ListItemButton
      onClick={handleNavClick}
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
        <Tooltip title={getTooltipContent()} placement={tooltipPlacement} arrow>
          <span style={{ width: '100%' }}>{listButton}</span>
        </Tooltip>
      ) : (
        listButton
      )}
    </ListItem>
  );
};
