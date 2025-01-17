import { ReactNode } from 'react';

export interface NavigationItem {
  title: string;
  icon: ReactNode;
  path: string;
  badge?: string;
  badgeColor?: 'success' | 'warning' | 'error' | 'info' | 'default';
  disabled?: boolean;
}

export interface Student {
  firstName: string;
  lastName: string;
  email: string;
}
