import { Box, Drawer, Theme, useMediaQuery, useTheme } from '@mui/material';
import {
  Discipline,
  DisciplinePacket,
} from '../../../types/disciplines/disciplines.types';
import { FC, useState } from 'react';

import { DetailsTabs } from './discipline-details/DetailsTab';
import { DisciplineComparisonModal } from './discipline-details/DisciplineComparisonModal';
import { EnrollmentSelectionState } from '../../../types/enrollments/enrollment-selection.types';
import { alpha } from '@mui/material/styles';

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
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );
  const isTablet = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );

  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [comparisonDiscipline, setComparisonDiscipline] =
    useState<Discipline | null>(null);

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
    <>
      <Drawer
        anchor={isMobile ? 'bottom' : 'right'}
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: isMobile ? '100%' : isTablet ? '600px' : '800px',
            height: isMobile ? '90vh' : '100%',
            maxHeight: isMobile ? '90vh' : '100%',
            borderTopLeftRadius: isMobile ? theme.shape.borderRadius * 2 : 0,
            borderTopRightRadius: isMobile ? theme.shape.borderRadius * 2 : 0,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: (theme) => alpha(theme.palette.background.paper, 0.98),
            backdropFilter: 'blur(12px)',
            boxShadow: theme.shadows[8],
            '&::-webkit-scrollbar': {
              width: 8,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.2),
              borderRadius: 4,
              '&:hover': {
                backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.3),
              },
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: (theme) => alpha(theme.palette.grey[200], 0.5),
              borderRadius: 4,
            },
          },
        }}
      >
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
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
            onOpenComparison={() => setIsComparisonOpen(true)}
          />
        </Box>
      </Drawer>

      {/* Comparison Modal */}
      <DisciplineComparisonModal
        open={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        currentDiscipline={discipline}
        comparisonDiscipline={comparisonDiscipline}
        onSelectComparisonDiscipline={setComparisonDiscipline}
        packet={packet}
      />
    </>
  );
};