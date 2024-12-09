import { Drawer, useMediaQuery, useTheme } from '@mui/material';
import { FC, useState } from 'react';

import { DetailsTabs } from './discipline-details/DetailsTab';
import { Discipline } from '../../../types/disciplines/disciplines.types';

interface DisciplineDetailsDrawerProps {
  discipline: Discipline;
  open: boolean;
  onClose: () => void;
  onEnroll?: () => void;
  isEnrollmentPeriodActive?: boolean;
  alreadyEnrolled?: boolean;
}

export const DisciplineDetailsDrawer: FC<DisciplineDetailsDrawerProps> = ({
  discipline,
  open,
  onClose,
  onEnroll,
  isEnrollmentPeriodActive = false,
  alreadyEnrolled = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Drawer
      anchor={isMobile ? 'bottom' : 'right'}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: isMobile ? '100%' : '800px',
          maxHeight: isMobile ? '90vh' : '100vh',
          borderTopLeftRadius: isMobile ? theme.shape.borderRadius : 0,
          borderTopRightRadius: isMobile ? theme.shape.borderRadius : 0,
        },
      }}
    >
      <DetailsTabs
        discipline={discipline}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onClose={onClose}
        onEnroll={onEnroll}
        isEnrollmentPeriodActive={isEnrollmentPeriodActive}
        alreadyEnrolled={alreadyEnrolled}
      />
    </Drawer>
  );
};
