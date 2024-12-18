import { AccessTime, Delete } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import {
  Discipline,
  DisciplinePacket,
  EnrollmentPeriod,
} from '../../../types/disciplines/disciplines.types';

import { EnrollmentSelectionState } from '../../../types/enrollments/enrollment-selection.types';
import { FC } from 'react';
import { getRemainingDays } from '../../mocks/enrollment-periods.mock';

interface EnrollmentSelectionPanelProps {
  selections: EnrollmentSelectionState;
  packets: DisciplinePacket[];
  disciplines: Record<string, Discipline>;
  onRemoveSelection: (disciplineId: string, packetId: string) => void;
  onStartEnrollment: () => void;
  enrollmentPeriod: EnrollmentPeriod;
}

export const EnrollmentSelectionPanel: FC<EnrollmentSelectionPanelProps> = ({
  selections,
  packets,
  disciplines,
  onRemoveSelection,
  onStartEnrollment,
  enrollmentPeriod,
}) => {
  const remainingDays = getRemainingDays(enrollmentPeriod);

  const isComplete = packets.every(
    (packet) =>
      selections.packets[packet.id]?.selections.length === packet.maxChoices
  );

  return (
    <Paper sx={{ p: 3 }}>
      <Stack spacing={3}>
        {/* Header */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Your Selections
          </Typography>
          <Chip
            icon={<AccessTime fontSize="small" />}
            label={`${remainingDays} days remaining`}
            color={remainingDays <= 3 ? 'warning' : 'default'}
            size="small"
          />
        </Box>

        {/* Packet Selections */}
        {packets.map((packet) => (
          <Box key={packet.id}>
            <Typography variant="subtitle1" gutterBottom>
              {packet.name}
            </Typography>

            <List>
              {selections.packets[packet.id]?.selections.map((selection) => (
                <ListItem key={selection.disciplineId}>
                  <ListItemText
                    primary={disciplines[selection.disciplineId]?.name}
                    secondary={`Priority ${selection.priority}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() =>
                        onRemoveSelection(selection.disciplineId, packet.id)
                      }
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>

            {selections.packets[packet.id]?.selections.length <
              packet.maxChoices && (
              <Alert severity="info" sx={{ mt: 1 }}>
                Select{' '}
                {packet.maxChoices -
                  (selections.packets[packet.id]?.selections.length || 0)}
                more discipline(s) for {packet.name}
              </Alert>
            )}

            <Divider sx={{ my: 2 }} />
          </Box>
        ))}

        {/* Action Buttons */}
        <Box>
          <Button
            variant="contained"
            fullWidth
            disabled={!isComplete}
            onClick={onStartEnrollment}
          >
            Continue to Enrollment
          </Button>

          {!isComplete && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              Please complete your selections for all packets before proceeding
            </Alert>
          )}
        </Box>
      </Stack>
    </Paper>
  );
};
