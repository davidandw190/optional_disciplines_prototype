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
        p: { xs: 2.5, sm: 3 },
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        background: alpha(theme.palette.background.paper, 0.95),
        backdropFilter: 'blur(12px)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
      }}
    >
      <Stack spacing={3} sx={{ height: '100%' }}>
        {/* Header with improved typography and spacing */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 1 }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary,
              fontSize: '1.25rem',
            }}
          >
            Your Selections
          </Typography>
        </Stack>

        {/* Selections list with enhanced styling */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {packets.map((packet) => (
            <Box key={packet.id} sx={{ mb: 3.5 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                  mb: 2,
                  fontSize: '1rem',
                }}
              >
                {packet.name}
              </Typography>

              <List disablePadding>
                {selections.packets[packet.id]?.selections.map((selection) => (
                  <ListItem
                    key={selection.disciplineId}
                    sx={{
                      px: 2,
                      py: 1.5,
                      bgcolor: alpha(theme.palette.background.paper, 0.7),
                      borderRadius: 1.5,
                      mb: 1,
                      border: `1px solid ${alpha(
                        theme.palette.primary.main,
                        0.1
                      )}`,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: alpha(theme.palette.background.paper, 0.9),
                        transform: 'translateY(-1px)',
                        boxShadow: `0 4px 12px ${alpha(
                          theme.palette.primary.main,
                          0.08
                        )}`,
                      },
                    }}
                  >
                    <ListItemText
                      primary={disciplines[selection.disciplineId]?.name}
                      secondary={
                        <Chip
                          label={`Priority ${selection.priority}`}
                          size="small"
                          color="primary"
                          sx={{
                            mt: 0.5,
                            height: 24,
                            '& .MuiChip-label': {
                              px: 1,
                              fontSize: '0.75rem',
                              fontWeight: 500,
                            },
                          }}
                        />
                      }
                      primaryTypographyProps={{
                        variant: 'body2',
                        fontWeight: 500,
                        color: theme.palette.text.primary,
                      }}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={() =>
                          onRemoveSelection(selection.disciplineId, packet.id)
                        }
                        sx={{
                          color: theme.palette.error.main,
                          opacity: 0.7,
                          '&:hover': {
                            opacity: 1,
                            bgcolor: alpha(theme.palette.error.main, 0.1),
                          },
                        }}
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
                  sx={{
                    mt: 1.5,
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                    color: theme.palette.text.primary,
                    '& .MuiAlert-icon': {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  Select{' '}
                  {packet.maxChoices -
                    (selections.packets[packet.id]?.selections.length ||
                      0)}{' '}
                  more discipline(s)
                </Alert>
              )}

              <Divider
                sx={{
                  my: 2.5,
                  borderColor: alpha(theme.palette.divider, 0.08),
                }}
              />
            </Box>
          ))}
        </Box>

        {/* Action footer with enhanced button styling */}
        <Box>
          <Button
            variant="contained"
            fullWidth
            disabled={!isComplete}
            onClick={onStartEnrollment}
            sx={{
              height: 48,
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 1.5,
              fontSize: '0.9375rem',
              boxShadow: 'none',
              '&:hover': {
                boxShadow: `0 4px 12px ${alpha(
                  theme.palette.primary.main,
                  0.2
                )}`,
              },
            }}
          >
            Continue to Enrollment
          </Button>

          {!isComplete && (
            <Alert
              severity="warning"
              sx={{
                mt: 2,
                bgcolor: alpha(theme.palette.warning.main, 0.08),
                color: theme.palette.text.primary,
                '& .MuiAlert-icon': {
                  color: theme.palette.warning.main,
                },
              }}
            >
              Complete all selections before proceeding
            </Alert>
          )}
        </Box>
      </Stack>
    </Paper>
  );
};
