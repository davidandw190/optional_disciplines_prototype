import {
  Chip,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  alpha,
} from '@mui/material';
import { Delete, DragIndicator } from '@mui/icons-material';
import { memo, useCallback } from 'react';

import { CSS } from '@dnd-kit/utilities';
import { Discipline } from '../../../types/disciplines/disciplines.types';
import { DisciplineSelectionItem } from '../../../types/enrollments/enrollment-selection.types';
import { useSortable } from '@dnd-kit/sortable';

interface SortableSelectionItemProps {
  id: string;
  selection: DisciplineSelectionItem;
  discipline: Discipline;
  packetId: string;
  onRemove: (disciplineId: string, packetId: string) => void;
  theme: any;
}

export const SortableSelectionItem = memo(
  ({
    id,
    selection,
    discipline,
    packetId,
    onRemove,
    theme,
  }: SortableSelectionItemProps) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id,
      data: {
        priority: selection.priority,
        disciplineId: selection.disciplineId,
        packetId: packetId,
      },
      transition: {
        duration: 150,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    const handleRemove = useCallback(() => {
      onRemove(selection.disciplineId, packetId);
    }, [onRemove, selection.disciplineId, packetId]);

    const primaryStyles = {
      variant: 'body2' as const,
      fontWeight: 500,
      color: theme.palette.text.primary,
    };

    const chipStyles = {
      mt: 0.5,
      height: 24,
      '& .MuiChip-label': {
        px: 1,
        fontSize: '0.75rem',
        fontWeight: 500,
      },
    };

    const listItemStyles = {
      px: 2,
      py: 1.5,
      bgcolor: isDragging
        ? alpha(theme.palette.primary.main, 0.08)
        : alpha(theme.palette.background.paper, 0.7),
      borderRadius: 1.5,
      mb: 1,
      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
      transition:
        'transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease',
      willChange: 'transform, background-color, box-shadow',
      '&:hover': {
        bgcolor: alpha(theme.palette.background.paper, 0.9),
        transform: 'translateY(-1px)',
        boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.08)}`,
      },
      cursor: isDragging ? 'grabbing' : 'grab',
      position: 'relative',
      zIndex: isDragging ? 1 : 'auto',
      touchAction: 'none',
    };

    const dragHandleStyles = {
      minWidth: 36,
      cursor: 'grab',
      '&:active': {
        cursor: 'grabbing',
      },
      touchAction: 'none',
    };

    const deleteButtonStyles = {
      color: theme.palette.error.main,
      opacity: 0.7,
      transition: 'opacity 0.2s ease, background-color 0.2s ease',
      '&:hover': {
        opacity: 1,
        bgcolor: alpha(theme.palette.error.main, 0.1),
      },
    };

    return (
      <ListItem
        ref={setNodeRef}
        style={style}
        sx={listItemStyles}
        {...attributes}
      >
        <ListItemIcon sx={dragHandleStyles} {...listeners}>
          <DragIndicator sx={{ color: theme.palette.text.secondary }} />
        </ListItemIcon>

        <ListItemText
          primary={discipline?.name}
          secondary={
            <Chip
              label={`Priority ${selection.priority}`}
              size="small"
              color="primary"
              sx={chipStyles}
            />
          }
          primaryTypographyProps={primaryStyles}
        />

        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            size="small"
            onClick={handleRemove}
            sx={deleteButtonStyles}
          >
            <Delete fontSize="small" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
);

SortableSelectionItem.displayName = 'SortableSelectionItem';
