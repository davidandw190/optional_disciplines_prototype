import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  List,
  Paper,
  Stack,
  Tooltip,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Check, PlaylistAddCheck, Warning } from '@mui/icons-material';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { FC, useCallback, useMemo, useState } from 'react';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers';

import { Discipline } from '../../../types/disciplines/disciplines.types';
import { DisciplinePacket } from '../../../types/disciplines/disciplines.types';
import { EnrollmentPeriod } from '../../../types/disciplines/disciplines.types';
import { EnrollmentSelectionState } from '../../../types/enrollments/enrollment-selection.types';
import { PacketHeaderWithInfo } from './PacketHeaderWithInfo';
import { SortableSelectionItem } from './SortableSelectionItem';

interface EnrollmentSelectionPanelProps {
  selections: EnrollmentSelectionState;
  packets: DisciplinePacket[];
  disciplines: Record<string, Discipline>;
  onRemoveSelection: (disciplineId: string, packetId: string) => void;
  onReorderSelections: (
    packetId: string,
    startIndex: number,
    endIndex: number,
    draggedDisciplineId: string
  ) => void;
  onStartEnrollment: () => void;
  enrollmentPeriod: EnrollmentPeriod;
  onDragStateChange?: (isDragging: boolean) => void;
}

export const EnrollmentSelectionPanel: FC<EnrollmentSelectionPanelProps> = ({
  selections,
  packets,
  disciplines,
  onRemoveSelection,
  onReorderSelections,
  onStartEnrollment,
  enrollmentPeriod,
  onDragStateChange,
}) => {
  const theme = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: isMobile ? 8 : 3,
        delay: isMobile ? 100 : 0,
        tolerance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 8,
        pressureThreshold: 0,
      },
    })
  );

  const isComplete = useMemo(
    () =>
      packets.every(
        (packet) =>
          selections.packets[packet.id]?.selections.length === packet.maxChoices
      ),
    [packets, selections.packets]
  );

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      if (onDragStateChange) {
        onDragStateChange(true);
      }
    },
    [onDragStateChange]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      if (onDragStateChange) {
        onDragStateChange(false);
      }

      const { active, over } = event;
      if (!active || !over || active.id === over.id) return;

      const overId = over.id.toString();
      const draggedDisciplineId = active.data.current?.disciplineId; // Get the dragged discipline ID
      const activePacketId = active.data.current?.packetId;

      if (!activePacketId || !draggedDisciplineId) return;

      const packet = selections.packets[activePacketId];
      if (!packet) return;

      const startIndex = packet.selections.findIndex(
        (s) => s.disciplineId === draggedDisciplineId
      );
      const endIndex = parseInt(overId.split('-').pop() || '0');

      if (startIndex !== -1 && startIndex !== endIndex) {
        onReorderSelections(
          activePacketId,
          startIndex,
          endIndex,
          draggedDisciplineId
        );
      }
    },
    [selections, onReorderSelections, onDragStateChange]
  );

  const handleStartEnrollment = useCallback(async () => {
    if (!isComplete) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      onStartEnrollment();
    } catch (err) {
      setError('Failed to process enrollment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [isComplete, onStartEnrollment]);

  const paperStyles = useMemo(
    () => ({
      p: { xs: 2.5, sm: 3 },
      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      background: alpha(theme.palette.background.paper, 0.95),
      backdropFilter: 'blur(12px)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 2,
    }),
    [theme]
  );

  const renderPacketItem = useCallback(
    (packet: DisciplinePacket, index: number, totalPackets: number) => {
      const packetSelections = selections.packets[packet.id]?.selections || [];
      const isLastPacket = index === totalPackets - 1;

      const sortableItems = useMemo(
        () =>
          packetSelections.map((selection, index) => ({
            id: `${packet.id}-${selection.disciplineId}-${index}`,
          })),
        [packetSelections, packet.id]
      );

      return (
        <Box key={packet.id} sx={{ mb: isLastPacket ? 0 : 3.5 }}>
          <PacketHeaderWithInfo
            title={packet.name}
            maxChoices={packet.maxChoices}
            currentSelections={packetSelections}
            disciplines={disciplines}
          />

          <SortableContext
            items={sortableItems}
            strategy={verticalListSortingStrategy}
          >
            <List
              disablePadding
              sx={{
                minHeight: packetSelections.length === 0 ? 60 : 'auto',
                border:
                  packetSelections.length === 0
                    ? `1px dashed ${alpha(theme.palette.divider, 0.3)}`
                    : 'none',
                borderRadius: 1.5,
                display: packetSelections.length === 0 ? 'flex' : 'block',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor:
                  packetSelections.length === 0
                    ? alpha(theme.palette.background.default, 0.5)
                    : 'transparent',
              }}
            >
              {packetSelections.length > 0 ? (
                packetSelections.map((selection, index) => (
                  <SortableSelectionItem
                    key={`${packet.id}-${selection.disciplineId}-${index}`}
                    id={`${packet.id}-${selection.disciplineId}-${index}`}
                    selection={selection}
                    discipline={disciplines[selection.disciplineId]}
                    packetId={packet.id}
                    onRemove={onRemoveSelection}
                    theme={theme}
                  />
                ))
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  Add disciplines to this packet
                </Typography>
              )}
            </List>
          </SortableContext>

          {/* Only add divider if this is not the last packet */}
          {!isLastPacket && (
            <Divider
              sx={{
                my: 2.5,
                borderColor: alpha(theme.palette.divider, 0.08),
              }}
            />
          )}
        </Box>
      );
    },
    [selections, disciplines, onRemoveSelection, theme]
  );

  const scrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: 8,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: alpha(theme.palette.primary.main, 0.2),
      borderRadius: 4,
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.3),
      },
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: alpha(theme.palette.grey[200], 0.5),
      borderRadius: 4,
    },
  };

  return (
    <Paper elevation={0} sx={paperStyles}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
      >
        <Stack spacing={3} sx={{ height: '100%' }}>
          <Box
            sx={{
              pt: 1,
              pb: 2,
              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  borderRadius: '50%',
                  p: 0.8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <PlaylistAddCheck
                  sx={{
                    fontSize: '1.25rem',
                    color: theme.palette.primary.main,
                  }}
                />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  fontSize: '1.25rem',
                }}
              >
                Your Selections
              </Typography>
            </Stack>

            {/* Status indicator */}
            <Box>
              <Tooltip
                title={
                  isComplete
                    ? 'All selections complete'
                    : 'Complete all packet selections'
                }
                arrow
              >
                <Chip
                  icon={
                    isComplete ? (
                      <Check fontSize="small" />
                    ) : (
                      <Warning fontSize="small" />
                    )
                  }
                  label={isComplete ? 'Ready to Submit' : 'Incomplete'}
                  color={isComplete ? 'success' : 'default'}
                  size="small"
                  sx={{
                    height: 28,
                    '& .MuiChip-label': {
                      px: 1,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color:
                        isComplete && theme.palette.mode === 'dark'
                          ? theme.palette.common.black
                          : undefined,
                    },
                  }}
                />
              </Tooltip>
            </Box>
          </Box>

          {/* Scrollable content area */}
          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
              ...scrollbarStyles,
              pb: 2,
            }}
          >
            {packets.length > 0 ? (
              packets.map((packet, index) =>
                renderPacketItem(packet, index, packets.length)
              )
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  flexDirection: 'column',
                  gap: 2,
                  p: 3,
                }}
              >
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  align="center"
                >
                  No discipline packets available
                </Typography>
              </Box>
            )}
          </Box>

          {/* Footer actions */}
          <Box sx={{ mt: 1 }}>
            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 2,
                  bgcolor: alpha(theme.palette.error.main, 0.05),
                  color: theme.palette.error.main,
                }}
              >
                {error}
              </Alert>
            )}

            <Button
              variant="contained"
              fullWidth
              disabled={!isComplete || isSubmitting}
              onClick={handleStartEnrollment}
              sx={{
                height: 48,
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: 1.5,
                fontSize: '0.9375rem',
                boxShadow: 'none',
                position: 'relative',
                '&:hover': {
                  boxShadow: `0 4px 12px ${alpha(
                    theme.palette.primary.main,
                    0.2
                  )}`,
                },
              }}
            >
              {isSubmitting ? (
                <>
                  <CircularProgress
                    size={24}
                    thickness={4}
                    sx={{
                      position: 'absolute',
                      color: alpha(theme.palette.primary.contrastText, 0.8),
                    }}
                  />
                  <span style={{ opacity: 0 }}>Continue to Enrollment</span>
                </>
              ) : (
                'Continue to Enrollment'
              )}
            </Button>
          </Box>
        </Stack>
      </DndContext>
    </Paper>
  );
};
