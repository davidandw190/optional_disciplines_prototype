import { Assignment, Book, HelpOutline, MenuBook, Person, School } from '@mui/icons-material';

import { EnrollmentPeriod } from '../../../types/disciplines/disciplines.types';
import { EnrollmentPeriodType } from '../../../types/disciplines/disciplines.enums';
import { NavigationItem } from '../../../types/sidebar/sidebar.types';
import { getEnrollmentPeriodStatus } from '../../mocks/enrollment-periods.mock';

export const getEnrollmentPeriodPath = (period: EnrollmentPeriod): string => {
  const periodId = period.id.toString();
  return `/enrollment-periods/${periodId}/${period.type
    .toLowerCase()
    .replace('_', '-')}`;
};

export const getEnrollmentPeriodTitle = (
  type: EnrollmentPeriodType
): string => {
  const titles = {
    [EnrollmentPeriodType.ELECTIVE_DISCIPLINES]: 'Elective Disciplines',
    [EnrollmentPeriodType.COMPLEMENTARY_DISCIPLINES]:
      'Complementary Disciplines',
    [EnrollmentPeriodType.THESIS_REGISTRATION]: 'Thesis Registration',
  };
  return titles[type];
};

export const getEnrollmentPeriodIcon = (
  type: EnrollmentPeriodType
): JSX.Element => {
  const icons = {
    [EnrollmentPeriodType.ELECTIVE_DISCIPLINES]: <Book />,
    [EnrollmentPeriodType.COMPLEMENTARY_DISCIPLINES]: <MenuBook />,
    [EnrollmentPeriodType.THESIS_REGISTRATION]: <Assignment />,
  };
  return icons[type];
};

export const getNavigationItems = (enrollmentPeriods?: EnrollmentPeriod[]): NavigationItem[] => {
  const baseItems: NavigationItem[] = [
    {
      title: 'Dashboard',
      icon: <School />,
      path: '/dashboard',
    },
  ];

  if (enrollmentPeriods?.length) {
    const activePeriodsMap = new Map<string, EnrollmentPeriod>();
    
    enrollmentPeriods.forEach(period => {
      const status = getEnrollmentPeriodStatus(period);
      const existingPeriod = activePeriodsMap.get(period.type);
      const existingStatus = existingPeriod 
        ? getEnrollmentPeriodStatus(existingPeriod) 
        : null;

      if (!existingPeriod || status === 'active' || 
          (status === 'upcoming' && existingStatus === 'ended')) {
        activePeriodsMap.set(period.type, period);
      }
    });

    Object.values(EnrollmentPeriodType).forEach(type => {
      const period = activePeriodsMap.get(type);
      const status = period ? getEnrollmentPeriodStatus(period) : undefined;
      
      baseItems.push({
        title: getEnrollmentPeriodTitle(type),
        icon: getEnrollmentPeriodIcon(type),
        path: period ? getEnrollmentPeriodPath(period) : '#',
        badge: status === 'active' ? 'Active' : undefined,
        badgeColor: 'success',
        disabled: !period || status !== 'active'
      });
    });
  }

  return [
    ...baseItems,
    {
      title: 'My Enrollments',
      icon: <Assignment />,
      path: '/enrollments',
    },
    {
      title: 'Profile',
      icon: <Person />,
      path: '/profile',
    },
    {
      title: 'FAQ',
      icon: <HelpOutline />,
      path: '/faq',
    }
  ];
};
