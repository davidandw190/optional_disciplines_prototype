// DisciplineDetailsDrawer.tsx
import { Box, Drawer, Theme, useMediaQuery, useTheme } from '@mui/material';
import {
  Discipline,
  DisciplinePacket,
} from '../../../types/disciplines/disciplines.types';
import { FC, useState } from 'react';

import { DetailsTabs } from './discipline-details/DetailsTab';
import { EnrollmentSelectionState } from '../../../types/enrollments/enrollment-selection.types';

export interface DisciplineDetailsDrawerProps {
  discipline: Discipline;
  open: boolean;
  onClose: () => void;
  onAddToSelection: (packetId: string) => void;
  isEnrollmentPeriodActive: boolean;
  isSelected: boolean;
  canBeSelected: boolean;
  packet: DisciplinePacket | undefined;
  currentSelections: EnrollmentSelectionState;
}

export const DisciplineDetailsDrawer: FC<DisciplineDetailsDrawerProps> = ({
  discipline,
  open,
  onClose,
  onAddToSelection,
  isEnrollmentPeriodActive,
  isSelected,
  canBeSelected,
  packet,
  currentSelections,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const getSelectionInfo = () => {
    if (!packet) return null;

    const packetSelections = currentSelections.packets[packet.id];
    const currentSelectionCount = packetSelections?.selections.length || 0;
    const remainingSelections = packet.maxChoices - currentSelectionCount;

    return {
      packetName: packet.name,
      remainingSelections,
      maxSelections: packet.maxChoices,
    };
  };

  const getActionButtonText = () => {
    if (!packet) return 'No Packet Available';
    if (isSelected) return 'Already Selected';

    const info = getSelectionInfo();
    if (!info) return 'Selection Unavailable';

    if (info.remainingSelections <= 0) {
      return `${info.packetName} Full (${info.maxSelections}/${info.maxSelections})`;
    }

    return `Add to ${info.packetName} (${info.remainingSelections} remaining)`;
  };

  const handleAddToSelection = () => {
    if (packet && canBeSelected && !isSelected) {
      onAddToSelection(packet.id);
    }
  };

  return (
    <Drawer
      anchor={isMobile ? 'bottom' : 'right'}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: isMobile ? '100%' : isTablet ? '600px' : '800px',
          height: isMobile ? '90vh' : '100vh',
          maxHeight: isMobile ? '90vh' : '100vh',
          borderTopLeftRadius: isMobile ? theme.shape.borderRadius * 2 : 0,
          borderTopRightRadius: isMobile ? theme.shape.borderRadius * 2 : 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          // Ensure proper spacing for mobile devices
          ...(isMobile && {
            pb: `env(safe-area-inset-bottom, ${theme.spacing(2)})`,
          }),
        }}
      >
        <DetailsTabs
          discipline={discipline}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onClose={onClose}
          isEnrollmentPeriodActive={isEnrollmentPeriodActive}
          isSelected={isSelected}
          canBeSelected={canBeSelected}
          onAddToSelection={handleAddToSelection}
          actionButtonText={getActionButtonText()}
          enrollmentInfo={{
            packet: packet,
            selections: getSelectionInfo(),
          }}
          isMobile={isMobile}
        />
      </Box>
    </Drawer>
  );
};