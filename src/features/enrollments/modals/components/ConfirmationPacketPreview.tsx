import { Box, Paper, Stack, alpha, useTheme } from '@mui/material';
import { Discipline, DisciplinePacket } from '../../../../types/disciplines/disciplines.types';

import { ConfirmationDisciplinePreviewItem } from './ConfirmationDisciplinePreview';
import { EnrollmentSelectionState } from '../../../../types/enrollments/enrollment-selection.types';
import { FC } from 'react';
import { PacketHeaderWithInfo } from '../../components/PacketHeaderWithInfo';

interface ConfirmationPacketPreviewProps {
  packet: DisciplinePacket;
  selections: EnrollmentSelectionState['packets'][string]['selections'];
  disciplines: Record<string, Discipline>;
}

export const ConfirmationPacketPreview: FC<ConfirmationPacketPreviewProps> = ({
  packet,
  selections,
  disciplines
}) => {
  const theme = useTheme();
  
  if (selections.length === 0) return null;
  
  return (
    <Paper
      elevation={0}
      sx={{
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        borderRadius: 2,
        overflow: 'hidden',
        bgcolor: 'transparent',
      }}
    >
      <Box sx={{ p: 2.5 }}>
        {/* Packet Header with Info Tooltip */}
        <PacketHeaderWithInfo
          title={packet.name}
          maxChoices={packet.maxChoices}
          currentSelections={selections}
          disciplines={disciplines}
        />

        {/* Selection Items */}
        <Stack spacing={2}>
          {selections.map((selection, index) => {
            const discipline = disciplines[selection.disciplineId];
            return (
              <ConfirmationDisciplinePreviewItem
                key={selection.disciplineId}
                discipline={discipline}
                priority={selection.priority}
                index={index}
              />
            );
          })}
        </Stack>
      </Box>
    </Paper>
  );
};