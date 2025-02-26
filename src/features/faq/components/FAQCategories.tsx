import { CategoryItem, FAQCategory } from '../../../types/faq/faq.types';
import { FC, SyntheticEvent } from 'react';
import { Tab, Tabs, Typography, useMediaQuery, useTheme } from '@mui/material';

import { TabsContainer } from '../styles/faq-styles';

interface FAQCategoriesProps {
  categories: CategoryItem[];
  activeCategory: FAQCategory;
  onChange: (event: SyntheticEvent, newValue: FAQCategory) => void;
}

export const FAQCategories: FC<FAQCategoriesProps> = ({
  categories,
  activeCategory,
  onChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <TabsContainer>
      <Tabs
        value={activeCategory}
        onChange={onChange}
        variant="scrollable"
        scrollButtons={isMobile}
        allowScrollButtonsMobile
        aria-label="FAQ categories"
        sx={{
          px: { xs: 1.5, sm: 3 },
          '& .MuiTabs-scrollButtons': {
            [theme.breakpoints.down('sm')]: {
              '&.Mui-disabled': {
                opacity: 0.3,
              },
              '& svg': {
                fontSize: '1.5rem',
                color: theme.palette.primary.main,
              },
            },
            [theme.breakpoints.up('sm')]: {
              display: 'none',
            },
          },
          '& .MuiTabs-flexContainer': {
            gap: 1,
          },
          '& .MuiTab-root': {
            minHeight: 55,
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '0.9375rem',
            minWidth: { xs: 'auto', sm: 160 },
            px: { xs: 1.5, sm: 2 },
            transition: theme.transitions.create(
              ['color', 'background-color'],
              {
                duration: 200,
              }
            ),
          },
          '& .MuiTabs-indicator': {
            height: 2.5,
            transition: theme.transitions.create(['left', 'width'], {
              duration: 300,
            }),
          },
        }}
      >
        {categories.map(({ value, label, icon: Icon }) => (
          <Tab
            key={value}
            value={value}
            label={label}
            icon={<Icon />}
            iconPosition="start"
            aria-label={`${label} FAQ section`}
          />
        ))}
      </Tabs>
    </TabsContainer>
  );
};

interface CategoryDescriptionProps {
  categories: CategoryItem[];
  activeCategory: FAQCategory;
}

export const CategoryDescription: FC<CategoryDescriptionProps> = ({
  categories,
  activeCategory,
}) => {
  const description = categories.find(
    (c) => c.value === activeCategory
  )?.description;

  return (
    <Typography
      variant="body1"
      color="text.secondary"
      sx={{
        mb: { xs: 1.5, sm: 2 },
        px: { xs: 0.5, sm: 0 },
      }}
    >
      {description}
    </Typography>
  );
};
