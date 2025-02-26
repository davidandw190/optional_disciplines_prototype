import {
  BookOutlined,
  MenuBookOutlined,
  SchoolOutlined
} from '@mui/icons-material';
import { Stack, Typography, useTheme } from '@mui/material';

import { EnrollmentPeriodType } from '../../../types/disciplines/disciplines.enums';
import { FC } from 'react';
import { TypeInfoPaper } from '../styles/enrollment-styles';

const enrollmentTypes = [
  {
    type: EnrollmentPeriodType.ELECTIVE_DISCIPLINES,
    label: 'Elective Disciplines',
    description:
      'Track your elective course selections that allow you to specialize in specific areas of interest within your academic program.',
  },
  {
    type: EnrollmentPeriodType.COMPLEMENTARY_DISCIPLINES,
    label: 'Complementary Disciplines',
    description:
      'Track your interdisciplinary course selections that broaden your academic perspective and provide valuable additional skills.',
  },
  {
    type: EnrollmentPeriodType.THESIS_REGISTRATION,
    label: 'Thesis Registration',
    description:
      'Track your thesis registration and supervision arrangements, and share drafts of your work with your supervisor.',
  },
];

interface EnrollmentTypeInfoProps {
  activeTab: EnrollmentPeriodType;
}

export const EnrollmentTypeInfo: FC<EnrollmentTypeInfoProps> = ({ activeTab }) => {
  const theme = useTheme();
  const activeTabInfo = enrollmentTypes.find((tab) => tab.type === activeTab);

  const getEnrollmentTypeIcon = (type: EnrollmentPeriodType) => {
    switch (type) {
      case EnrollmentPeriodType.ELECTIVE_DISCIPLINES:
        return <BookOutlined sx={{ fontSize: 28, color: theme.palette.primary.main }} />;
      case EnrollmentPeriodType.COMPLEMENTARY_DISCIPLINES:
        return <MenuBookOutlined sx={{ fontSize: 28, color: theme.palette.primary.main }} />;
      case EnrollmentPeriodType.THESIS_REGISTRATION:
        return <SchoolOutlined sx={{ fontSize: 28, color: theme.palette.primary.main }} />;
      default:
        return null;
    }
  };

  if (!activeTabInfo) return null;

  return (
    <TypeInfoPaper elevation={0}>
      <Stack direction="row" spacing={2} alignItems="center">
        {getEnrollmentTypeIcon(activeTab)}
        <Stack spacing={0.5}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: theme.palette.primary.main,
            }}
          >
            {activeTabInfo.label}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ maxWidth: 800 }}
          >
            {activeTabInfo.description}
          </Typography>
        </Stack>
      </Stack>
    </TypeInfoPaper>
  );
};