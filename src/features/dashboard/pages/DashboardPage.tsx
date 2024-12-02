import {
  AutoStories,
  BookOutlined,
  CalendarToday,
  History,
  InfoOutlined,
  MenuBook,
  MoreVert,
  School,
} from '@mui/icons-material';
import {
  Box,
  Chip,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { FC } from 'react';

interface EnrollmentPeriod {
  type: string;
  status: 'upcoming' | 'active' | 'ended';
  startDate: string;
  endDate: string;
  progress?: number;
}

interface Announcement {
  title: string;
  date: string;
  content: string;
  important: boolean;
}

const EnrollmentPeriodCard: FC<{ period: EnrollmentPeriod }> = ({ period }) => (
  <Paper
    elevation={0}
    sx={{
      p: { xs: 2, sm: 2.5 },
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'divider',
      '&:hover': {
        bgcolor: 'action.hover',
        borderColor: 'primary.main',
      },
      transition: 'all 0.15s ease',
    }}
  >
    <Stack spacing={2.5}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              p: 1.25,
              borderRadius: 1.5,
              bgcolor: 'primary.main',
              color: 'white',
            }}
          >
            {period.type === 'Elective Disciplines' && <BookOutlined fontSize="small" />}
            {period.type === 'Complementary Disciplines' && <MenuBook fontSize="small" />}
            {period.type === 'Thesis Registration' && <AutoStories fontSize="small" />}
          </Box>
          <Box>
            <Typography variant="body1" fontWeight={600}>
              {period.type}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
              {period.startDate} - {period.endDate}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1.5} alignItems="center">
          <Chip
            label={period.status.toUpperCase()}
            size="small"
            sx={{
              bgcolor: period.status === 'active' ? '#00C853' : '#e60054',
              color: 'white',
              px: 1,
              height: 24,
              fontSize: '0.75rem',
              fontWeight: 500,
            }}
          />
          <IconButton size="small">
            <MoreVert fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      {period.progress !== undefined && (
        <Box sx={{ width: '100%' }}>
          <Box sx={{ mb: 0.75 }}>
            <Typography variant="caption" color="text.secondary" fontWeight={500}>
              Progress
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={period.progress}
            sx={{
              height: 6,
              borderRadius: 3,
              bgcolor: 'grey.100',
              '& .MuiLinearProgress-bar': {
                borderRadius: 3,
              },
            }}
          />
        </Box>
      )}
    </Stack>
  </Paper>
);

const QuickActionCard: FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <Paper
    elevation={0}
    sx={{
      p: 2.5,
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'divider',
      '&:hover': {
        bgcolor: 'action.hover',
        cursor: 'pointer',
        borderColor: 'primary.main',
      },
      transition: 'all 0.15s ease',
    }}
  >
    <Stack direction="row" spacing={2} alignItems="flex-start">
      <Box
        sx={{
          p: 1.25,
          borderRadius: 1.5,
          bgcolor: 'primary.main',
          color: 'white',
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="body2" fontWeight={600}>
          {title}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            mt: 0.5,
            display: { xs: 'none', sm: 'block' },
          }}
        >
          {description}
        </Typography>
      </Box>
    </Stack>
  </Paper>
);

const AnnouncementCard: FC<Announcement> = ({
  title,
  date,
  content,
  important,
}) => (
  <Box
    sx={{
      p: { xs: 2, sm: 2.5, md: 3 },
      borderBottom: '1px solid',
      borderColor: 'divider',
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        bgcolor: 'action.hover',
      },
    }}
  >
    <Stack spacing={2}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={{ xs: 1, sm: 0 }}
      >
        <Typography variant="body2" fontWeight={600}>
          {title}
        </Typography>
        {important && (
          <Chip
            label="Important"
            size="small"
            sx={{
              bgcolor: '#e60054',
              color: 'white',
              fontSize: '0.75rem',
              height: 20,
            }}
          />
        )}
      </Stack>
      <Typography variant="caption" color="text.secondary">
        {date}
      </Typography>
    </Stack>
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{
        fontSize: '0.8125rem',
        lineHeight: 1.5,
      }}
    >
      {content}
    </Typography>
  </Box>
);

const DashboardPage: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const enrollmentPeriods: EnrollmentPeriod[] = [
    {
      type: 'Elective Disciplines',
      status: 'upcoming',
      startDate: 'May 1, 2024',
      endDate: 'May 15, 2024',
    },
    {
      type: 'Complementary Disciplines',
      status: 'active',
      startDate: 'April 15, 2024',
      endDate: 'April 30, 2024',
      progress: 65,
    },
    {
      type: 'Thesis Registration',
      status: 'upcoming',
      startDate: 'June 1, 2024',
      endDate: 'June 15, 2024',
    },
  ];

  const quickActions = [
    {
      icon: <CalendarToday fontSize="small" />,
      title: 'Enrollment Schedule',
      description: 'Check important dates and deadlines',
    },
    {
      icon: <History fontSize="small" />,
      title: 'Enrollment History',
      description: 'View your past enrollments',
    },
    {
      icon: <InfoOutlined fontSize="small" />,
      title: 'Info Regarding Enrollemtn Process',
      description: 'Find out more about the enrollemnt process',
    },
  ];

  const announcements: Announcement[] = [
    {
      title: 'Enrollment Period Update',
      date: 'March 15, 2024',
      content:
        'The enrollment period for the next semester will start on May 1st, 2024.',
      important: true,
    },
    {
      title: 'New Elective Courses Available',
      date: 'March 10, 2024',
      content:
        'Check out the new elective courses added for the upcoming semester.',
      important: false,
    },
  ];

  return (
    <Box sx={{ p: { xs: 3, sm: 4, md: 5 }, maxWidth: '1920px', mx: 'auto' }}>
      <Typography
        variant="h4"
        color="primary.main"
        sx={{
          mb: { xs: 3, md: 4 },
          fontWeight: 700,
          fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
        }}
      >
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Active & Upcoming Enrollments Section */}
        <Grid item xs={12} lg={8}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, sm: 3 },
              borderRadius: 2,
              bgcolor: 'background.paper',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Stack spacing={2.5}>
              <Typography variant="subtitle1" fontWeight={600}>
                Active & Upcoming Enrollments
              </Typography>
              {enrollmentPeriods.map((period, index) => (
                <EnrollmentPeriodCard key={index} period={period} />
              ))}
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, sm: 3 },
              borderRadius: 2,
              bgcolor: 'background.paper',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Stack spacing={2.5} sx={{ flex: 1 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                Quick Actions
              </Typography>
              {quickActions.map((action, index) => (
                <QuickActionCard key={index} {...action} />
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: { xs: 3, md: 4 } }}>
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
          Announcements
        </Typography>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          {announcements.map((announcement, index) => (
            <AnnouncementCard key={index} {...announcement} />
          ))}
        </Paper>
      </Box>
    </Box>
  );
};

export default DashboardPage;
