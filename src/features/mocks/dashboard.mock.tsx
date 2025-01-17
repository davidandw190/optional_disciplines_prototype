import {
  Announcement,
  QuickAction,
} from '../../types/disciplines/disciplines.types';
import { CalendarToday, History, InfoOutlined } from '@mui/icons-material';

export const mockQuickActions: QuickAction[] = [
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
    title: 'Info Regarding Enrollment Process',
    description: 'Find out more about the enrollment process',
  },
];

export const mockAnnouncements: Announcement[] = [
  {
    title: 'Spring Enrollment Period Update',
    date: 'April 12, 2024',
    content:
      'The enrollment period for the next semester will start on May 1st, 2024.',
    important: true,
  },
  {
    title: 'Elective Courses Available',
    date: 'March 10, 2024',
    content:
      'You can now check out the new elective courses for the upcoming semester.',
    important: false,
  },
  {
    title: 'Elective Courses Available',
    date: 'March 10, 2024',
    content:
      'You can now check out the new elective courses for the upcoming semester.',
    important: false,
  },
  {
    title: 'Elective Courses Available',
    date: 'March 10, 2024',
    content:
      'You can now check out the new elective courses for the upcoming semester.',
    important: false,
  },
];
