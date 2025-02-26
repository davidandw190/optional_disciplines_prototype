import { Box, Container, Stack } from '@mui/material';
import {
  CategoryDescription,
  FAQCategories,
} from '../components/FAQCategories';
import { FC, SyntheticEvent, useState } from 'react';
import { categories, faqData } from '../constants/faqData';

import { ContentPaper } from '../styles/faq-styles';
import { FAQAccordion } from '../components/FAQAccordion';
import { FAQCategory } from '../../../types/faq/faq.types';
import { FAQHeader } from '../components/FAQHeader';

export const FAQPage: FC = () => {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>(
    FAQCategory.GENERAL
  );
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleCategoryChange = (_: SyntheticEvent, newValue: FAQCategory) => {
    setActiveCategory(newValue);
    setExpanded(false);
  };

  const handleAccordionChange =
    (panel: string) => (_: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const filteredFaqs = faqData.filter(
    (item) => item.category === activeCategory
  );

  return (
    <Container
      maxWidth={false}
      sx={{
        py: { xs: 1.5, sm: 3 },
        px: { xs: 0.5, sm: 3 },
        height: '100%',
        minWidth: {
          sm: '600px',
          md: '600px',
          lg: '1450px',
        },
        mx: 'auto',
      }}
    >
      <Stack spacing={3}>
        {/* Header Section */}
        <FAQHeader />

        {/* Main Content Section */}
        <ContentPaper elevation={0}>
          <FAQCategories
            categories={categories}
            activeCategory={activeCategory}
            onChange={handleCategoryChange}
          />

          {/* FAQ Content Area */}
          <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
            <Stack spacing={2}>
              {/* Category Description */}
              <CategoryDescription
                categories={categories}
                activeCategory={activeCategory}
              />

              {/* FAQ Accordions */}
              {filteredFaqs.map((faq, index) => (
                <FAQAccordion
                  key={index}
                  faq={faq}
                  expanded={expanded === `panel${index}`}
                  index={index}
                  onChange={handleAccordionChange}
                />
              ))}
            </Stack>
          </Box>
        </ContentPaper>
      </Stack>
    </Container>
  );
};
