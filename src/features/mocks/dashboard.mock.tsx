import {
  Announcement,
  EnrollmentPeriod,
  QuickAction,
} from '../../types/disciplines/disciplines.types';
import { CalendarToday, History, InfoOutlined } from '@mui/icons-material';

import { EnrollmentPeriodType } from '../../types/disciplines/disciplines.enums';

export const mockEnrollments: EnrollmentPeriod[] = [
  {
    type: EnrollmentPeriodType.ELECTIVE_DISCIPLINES,
    status: 'upcoming',
    startDate: 'May 1, 2024',
    endDate: 'May 15, 2024',
  },
  {
    type: EnrollmentPeriodType.COMPLEMENTARY_DISCIPLINES,
    status: 'active',
    startDate: 'April 15, 2024',
    endDate: 'April 30, 2024',
    progress: 65,
  },
  {
    type: EnrollmentPeriodType.THESIS_REGISTRATION,
    status: 'upcoming',
    startDate: 'June 1, 2024',
    endDate: 'June 15, 2024',
  },
];

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
];
