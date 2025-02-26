import {
  AccordionDetails,
  AccordionSummary,
  Typography,
  useTheme,
} from '@mui/material';
import { FC, SyntheticEvent } from 'react';

import { ExpandMore } from '@mui/icons-material';
import { FAQItem } from '../../../types/faq/faq.types';
import { StyledAccordion } from '../styles/faq-styles';

interface FAQAccordionProps {
  faq: FAQItem;
  expanded: boolean;
  index: number;
  onChange: (
    panel: string
  ) => (event: SyntheticEvent, isExpanded: boolean) => void;
}

export const FAQAccordion: FC<FAQAccordionProps> = ({
  faq,
  expanded,
  index,
  onChange,
}) => {
  const theme = useTheme();
  const panelId = `panel${index}`;

  return (
    <StyledAccordion
      expanded={expanded}
      onChange={onChange(panelId)}
      TransitionProps={{ unmountOnExit: false }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls={`${panelId}-content`}
        id={`${panelId}-header`}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 500,
            color: expanded
              ? theme.palette.primary.main
              : theme.palette.text.primary,
          }}
        >
          {faq.question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {typeof faq.answer === 'string' ? (
          <Typography variant="body1" color="text.secondary">
            {faq.answer}
          </Typography>
        ) : (
          faq.answer
        )}
      </AccordionDetails>
    </StyledAccordion>
  );
};
