import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
  alpha,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FC, SyntheticEvent, useState } from 'react';

import { ExpandMore } from '@mui/icons-material';
import { categories } from '../constants/faqCategories';
import { faqData } from '../constants/faqData';

enum FAQCategory {
  GENERAL = 'general',
  ELECTIVE = 'elective',
  COMPLEMENTARY = 'complementary',
  THESIS = 'thesis',
}

interface FAQItem {
  question: string;
  answer: string | JSX.Element;
  category: FAQCategory;
}

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '8px !important',
  marginBottom: theme.spacing(1),
  boxShadow: 'none',

  '&:before': {
    display: 'none',
  },

  '& .MuiAccordionSummary-root': {
    padding: theme.spacing(1.5, 2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(1.5, 3),
    },
  },

  '& .MuiAccordionDetails-root': {
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2, 3, 3),
    },
  },
}));



export const FAQPage: FC = () => {
  const theme = useTheme();
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
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: theme.palette.background.paper,
          }}
        >
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              {/* <School
                sx={{
                  fontSize: 40,
                  color: theme.palette.primary.main,
                }}
              /> */}
              <Stack spacing={0.5}>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  Enrollment FAQ
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ fontWeight: 500 }}
                >
                  Find answers to common questions about the enrollment process
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Paper>

        {/* Main Content Section */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: theme.palette.background.paper,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              bgcolor: alpha(theme.palette.primary.main, 0.03),
            }}
          >
            <Tabs
              value={activeCategory}
              onChange={handleCategoryChange}
              variant="scrollable"
              // we show scroll buttons only on mobile
              scrollButtons={
                useMediaQuery(theme.breakpoints.down('sm')) ? true : false
              }
              allowScrollButtonsMobile
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
                  // hide buttons completely on larger screens
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
                },
                '& .MuiTabs-indicator': {
                  height: 2.5,
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
                />
              ))}
            </Tabs>
          </Box>

          {/* FAQ Content Area */}
          <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
            <Stack spacing={2}>
              {/* Category Description */}
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mb: { xs: 1.5, sm: 2 },
                  px: { xs: 0.5, sm: 0 },
                }}
              >
                {
                  categories.find((c) => c.value === activeCategory)
                    ?.description
                }
              </Typography>

              {/* FAQ Accordions */}
              {faqData
                .filter((item) => item.category === activeCategory)
                .map((faq, index) => (
                  <StyledAccordion
                    key={index}
                    expanded={expanded === `panel${index}`}
                    onChange={handleAccordionChange(`panel${index}`)}
                  >
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 500,
                          color:
                            expanded === `panel${index}`
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
                ))}
            </Stack>
          </Box>
        </Paper>
      </Stack>
    </Container>
  );
};
