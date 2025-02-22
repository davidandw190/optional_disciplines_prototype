import {
  AssignmentIndRounded,
  BookRounded,
  HelpRounded,
  MenuBookRounded,
  Person,
  SchoolRounded,
  SpaceDashboardRounded,
} from '@mui/icons-material';

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
    [EnrollmentPeriodType.ELECTIVE_DISCIPLINES]: <BookRounded />,
    [EnrollmentPeriodType.COMPLEMENTARY_DISCIPLINES]: <MenuBookRounded />,
    [EnrollmentPeriodType.THESIS_REGISTRATION]: <SchoolRounded />,
  };
  return icons[type];
};

export const getNavigationItems = (
  enrollmentPeriods?: EnrollmentPeriod[]
): NavigationItem[] => {
  const baseItems: NavigationItem[] = [
    {
      title: 'Dashboard',
      icon: <SpaceDashboardRounded />,
      path: '/dashboard',
    },
  ];

  const activePeriodsMap = new Map<string, EnrollmentPeriod>();

  if (enrollmentPeriods?.length) {
    enrollmentPeriods.forEach((period) => {
      const status = getEnrollmentPeriodStatus(period);
      const existingPeriod = activePeriodsMap.get(period.type);
      const existingStatus = existingPeriod
        ? getEnrollmentPeriodStatus(existingPeriod)
        : null;

      if (
        !existingPeriod ||
        status === 'active' ||
        (status === 'upcoming' && existingStatus === 'ended')
      ) {
        activePeriodsMap.set(period.type, period);
      }
    });
  }

  Object.values(EnrollmentPeriodType).forEach((type) => {
    const period = activePeriodsMap.get(type);
    const status = period ? getEnrollmentPeriodStatus(period) : undefined;

    baseItems.push({
      title: getEnrollmentPeriodTitle(type),
      icon: getEnrollmentPeriodIcon(type),
      path: period
        ? getEnrollmentPeriodPath(period)
        : `/enrollment-periods/${type.toLowerCase().replace('_', '-')}`,
      badge: period && status === 'active' ? 'Active' : undefined,
      badgeColor: 'success',
      // by default, if no period exists, the tab is enabled.
      disabled: period ? status !== 'active' : false,
    });
  });

  return [
    ...baseItems,
    {
      title: 'My Enrollments',
      icon: <AssignmentIndRounded />,
      path: '/enrollments',
    },
    {
      title: 'Profile',
      icon: <Person />,
      path: '/profile',
    },
    {
      title: 'FAQ',
      icon: <HelpRounded />,
      path: '/faq',
    },
  ];
};
