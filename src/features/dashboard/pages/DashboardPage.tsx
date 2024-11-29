import {
  Assignment,
  CalendarToday,
  FlashOn,
  MoreVert,
  School,
  Timer,
} from '@mui/icons-material';
import {
  Box,
  Chip,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';

import { FC } from 'react';

// card header for dashboard cards
const CardHeader: FC<{ title: string; icon: React.ReactNode }> = ({
  title,
  icon,
}) => (
  <Stack
    direction="row"
    alignItems="center"
    justifyContent="space-between"
    sx={{ mb: 3 }}
  >
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Box
        sx={{
          width: 40,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '12px',
          bgcolor: 'primary.main',
          color: 'white',
        }}
      >
        {icon}
      </Box>
      <Typography
        variant="h6"
        sx={{
          color: 'text.primary',
          fontWeight: 600,
          fontSize: '1.125rem',
        }}
      >
        {title}
      </Typography>
    </Stack>
    <Tooltip title="More options">
      <IconButton size="small">
        <MoreVert fontSize="small" />
      </IconButton>
    </Tooltip>
  </Stack>
);

const DashboardPage: FC = () => {
  const theme = useTheme();

  // dashboard cards config
  const dashboardCards = [
    {
      title: 'Current Enrollments',
      icon: <School />,
      content: (
        <Stack spacing={2}>
          <Box
            sx={{
              p: 2,
              bgcolor: theme.palette.mode === 'light' ? 'grey.50' : 'background.paper',
              borderRadius: 2,
              border: '1px dashed',
              borderColor: 'divider',
            }}
          >
            <Typography color="text.secondary" variant="body2" align="center">
              No active enrollments for this semester
            </Typography>
          </Box>
          <Chip
            label="Next enrollment period starts in 2 months"
            size="small"
            icon={<Timer fontSize="small" />}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              '& .MuiChip-icon': { color: 'inherit' },
            }}
          />
        </Stack>
      ),
    },
    {
      title: 'Upcoming Deadlines',
      icon: <CalendarToday />,
      content: (
        <Stack spacing={2}>
          <Box
            sx={{
              p: 2,
              bgcolor: theme.palette.mode === 'light' ? 'grey.50' : 'background.paper',
              borderRadius: 2,
              border: '1px dashed',
              borderColor: 'divider',
            }}
          >
            <Typography color="text.secondary" variant="body2" align="center">
              No upcoming deadlines
            </Typography>
          </Box>
        </Stack>
      ),
    },
    {
      title: 'Quick Actions',
      icon: <FlashOn />,
      content: (
        <Stack spacing={2}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              bgcolor: theme.palette.mode === 'light' 
                ? 'background.paper' 
                : 'background.paper',
              '&:hover': {
                bgcolor: theme.palette.mode === 'light'
                  ? 'grey.50'
                  : 'action.hover',
                cursor: 'pointer',
              },
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Assignment color="primary" />
              <Box>
                <Typography variant="body2" fontWeight={500}>
                  View Available Disciplines
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Browse through available courses for next semester
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      {/* page header */}
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 3, md: 4 },
          color: 'primary.main',
          fontWeight: 700,
          letterSpacing: '-0.01em',
        }}
      >
        Dashboard
      </Typography>

      {/* dashboard grid */}
      <Grid container spacing={3}>
        {dashboardCards.map((card, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                borderRadius: '16px',
                boxShadow: theme.customShadows.light,
                transition: 'all 0.3s ease',
                border: '1px solid',
                borderColor: 'divider',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.customShadows.medium,
                  borderColor: 'primary.main',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '4px',
                    height: '100%',
                    backgroundColor: 'primary.main',
                    borderTopRightRadius: '16px',
                    borderBottomRightRadius: '16px',
                  },
                },
              }}
            >
              <CardHeader title={card.title} icon={card.icon} />
              {card.content}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardPage;