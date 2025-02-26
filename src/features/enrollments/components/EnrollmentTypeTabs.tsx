import { FC, SyntheticEvent } from 'react';
import { Tab, Tabs, useTheme } from '@mui/material';

import { EnrollmentPeriodType } from '../../../types/disciplines/disciplines.enums';
import { TabsContainer } from '../styles/enrollment-styles';

const enrollmentTypes = [
  {
    type: EnrollmentPeriodType.ELECTIVE_DISCIPLINES,
    label: 'Elective Disciplines',
  },
  {
    type: EnrollmentPeriodType.COMPLEMENTARY_DISCIPLINES,
    label: 'Complementary Disciplines',
  },
  {
    type: EnrollmentPeriodType.THESIS_REGISTRATION,
    label: 'Thesis Registration',
  },
];

interface EnrollmentTypeTabsProps {
  activeTab: EnrollmentPeriodType;
  onChange: (event: SyntheticEvent, value: EnrollmentPeriodType) => void;
}

export const EnrollmentTypeTabs: FC<EnrollmentTypeTabsProps> = ({ activeTab, onChange }) => {
  const theme = useTheme();

  return (
    <TabsContainer>
      <Tabs
        value={activeTab}
        onChange={onChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Enrollment type tabs"
        sx={{
          px: { xs: 2, sm: 3 },
          '& .MuiTabs-indicator': {
            height: 3,
            transition: theme.transitions.create(['left', 'width'], {
              duration: 300,
            }),
          },
        }}
      >
        {enrollmentTypes.map(({ type, label }) => (
          <Tab
            key={type}
            value={type}
            label={label}
            aria-label={`View ${label}`}
            sx={{
              minHeight: 56,
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.9375rem',
              transition: theme.transitions.create('color', {
                duration: 200,
              }),
            }}
          />
        ))}
      </Tabs>
    </TabsContainer>
  );
};