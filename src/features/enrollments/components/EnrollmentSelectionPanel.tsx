import { AccessTime, Delete, Warning } from '@mui/icons-material';
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
  alpha,
  useTheme,
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
  const theme = useTheme();
  const remainingDays = getRemainingDays(enrollmentPeriod);

  const isComplete = packets.every(
    (packet) =>
      selections.packets[packet.id]?.selections.length === packet.maxChoices
  );

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        border: `1px solid ${theme.palette.divider}`,
        background: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: 'blur(8px)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack spacing={3} sx={{ height: '100%' }}>
        {/* header Section */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" fontWeight={600}>
            Your Selections
          </Typography>
          {/* <Chip
            icon={<AccessTime fontSize="small" />}
            label={`${remainingDays} days remaining`}
            color={remainingDays <= 3 ? 'warning' : 'default'}
            size="small"
            sx={{ fontWeight: 500 }}
          /> */}
        </Stack>

        {/* selections list */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {packets.map((packet) => (
            <Box key={packet.id} sx={{ mb: 3 }}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                color="primary"
                gutterBottom
              >
                {packet.name}
              </Typography>

              <List disablePadding>
                {selections.packets[packet.id]?.selections.map((selection) => (
                  <ListItem
                    key={selection.disciplineId}
                    sx={{
                      px: 2,
                      py: 1,
                      bgcolor: alpha(theme.palette.background.paper, 0.6),
                      borderRadius: 1,
                      mb: 1,
                    }}
                  >
                    <ListItemText
                      primary={disciplines[selection.disciplineId]?.name}
                      secondary={`Priority ${selection.priority}`}
                      primaryTypographyProps={{
                        variant: 'body2',
                        fontWeight: 500,
                      }}
                      secondaryTypographyProps={{
                        variant: 'caption',
                        color: 'primary',
                      }}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={() =>
                          onRemoveSelection(selection.disciplineId, packet.id)
                        }
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>

              {selections.packets[packet.id]?.selections.length <
                packet.maxChoices && (
                <Alert
                  severity="info"
                  icon={<Warning fontSize="small" />}
                  sx={{ mt: 1 }}
                >
                  Select{' '}
                  {packet.maxChoices -
                    (selections.packets[packet.id]?.selections.length ||
                      0)}{' '}
                  more discipline(s)
                </Alert>
              )}

              <Divider sx={{ my: 2 }} />
            </Box>
          ))}
        </Box>

        {/* action footer */}
        <Box>
          <Button
            variant="contained"
            fullWidth
            disabled={!isComplete}
            onClick={onStartEnrollment}
            sx={{
              height: 48,
              fontWeight: 500,
              textTransform: 'none',
            }}
          >
            Continue to Enrollment
          </Button>

          {!isComplete && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              Complete all selections before proceeding
            </Alert>
          )}
        </Box>
      </Stack>
    </Paper>
  );
};
