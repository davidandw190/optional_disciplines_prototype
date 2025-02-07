import {
  Alert,
  Box,
  Button,
  Divider,
  List,
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
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { FC, useCallback, useMemo } from 'react';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { EnrollmentSelectionState } from '../../../types/enrollments/enrollment-selection.types';
import { PacketHeaderWithInfo } from './PacketHeaderWithInfo';
import { SortableSelectionItem } from './SortableSelectionItem';
import { Warning } from '@mui/icons-material';

interface EnrollmentSelectionPanelProps {
  selections: EnrollmentSelectionState;
  packets: DisciplinePacket[];
  disciplines: Record<string, Discipline>;
  onRemoveSelection: (disciplineId: string, packetId: string) => void;
  onReorderSelections: (
    packetId: string,
    startIndex: number,
    endIndex: number
  ) => void;
  onStartEnrollment: () => void;
  enrollmentPeriod: EnrollmentPeriod;
}

export const EnrollmentSelectionPanel: FC<EnrollmentSelectionPanelProps> = ({
  selections,
  packets,
  disciplines,
  onRemoveSelection,
  onReorderSelections,
  onStartEnrollment,
}) => {
  const theme = useTheme();
  // const remainingDays = getRemainingDays(enrollmentPeriod);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
        pressure: 0,
        tolerance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 50,
        tolerance: 4,
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

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over || active.id === over.id) return;

      const overId = over.id.toString();

      const activePacketId = active.data.current?.packetId;
      if (!activePacketId) return;

      const packet = selections.packets[activePacketId];
      if (!packet) return;

      const startIndex = packet.selections.findIndex(
        (s) => s.disciplineId === active.data.current?.disciplineId
      );
      const endIndex = parseInt(overId.split('-').pop() || '0');

      if (startIndex !== -1 && startIndex !== endIndex) {
        onReorderSelections(activePacketId, startIndex, endIndex);
      }
    },
    [selections, onReorderSelections]
  );

  // const dropAnimation = useMemo(
  //   () => ({
  //     sideEffects: defaultDropAnimationSideEffects({
  //       styles: {
  //         active: {
  //           opacity: '0.5',
  //         },
  //       },
  //     }),
  //   }),
  //   []
  // );

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
    (packet: DisciplinePacket) => {
      const packetSelections = selections.packets[packet.id]?.selections || [];

      const sortableItems = useMemo(
        () =>
          packetSelections.map((selection, index) => ({
            id: `${packet.id}-${selection.disciplineId}-${index}`,
          })),
        [packetSelections, packet.id]
      );

      return (
        <Box key={packet.id} sx={{ mb: 3.5 }}>
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
            <List disablePadding>
              {packetSelections.map((selection, index) => (
                <SortableSelectionItem
                  key={`${packet.id}-${selection.disciplineId}-${index}`}
                  id={`${packet.id}-${selection.disciplineId}-${index}`}
                  selection={selection}
                  discipline={disciplines[selection.disciplineId]}
                  packetId={packet.id}
                  onRemove={onRemoveSelection}
                  theme={theme}
                />
              ))}
            </List>
          </SortableContext>

          {/* Alert for incomplete selections */}
          {packetSelections.length < packet.maxChoices && (
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
              Select {packet.maxChoices - packetSelections.length} more
              discipline(s)
            </Alert>
          )}

          <Divider
            sx={{
              my: 2.5,
              borderColor: alpha(theme.palette.divider, 0.08),
            }}
          />
        </Box>
      );
    },
    [selections, disciplines, onRemoveSelection, theme]
  );

  return (
    <Paper elevation={0} sx={paperStyles}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <Stack spacing={3} sx={{ height: '100%' }}>
          {/* Header */}
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

          {/* Scrollable content area */}
          <Box sx={{ flex: 1, overflow: 'auto' }}>
            {packets.map(renderPacketItem)}
          </Box>

          {/* Footer actions */}
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
      </DndContext>
    </Paper>
  );
};
