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
import {
  BookRounded,
  ExpandMore,
  HelpRounded,
  Info,
  MenuBookRounded,
  SchoolRounded,
} from '@mui/icons-material';
import { FC, SyntheticEvent, useState } from 'react';

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

// A reusable container component for FAQ responses that handles responsive layout
const FAQResponseContainer: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: { xs: '100%', md: '900px', lg: '1000px' },
        mx: 'auto',
        px: { xs: 0, sm: 2 },
      }}
    >
      {children}
    </Box>
  );
};

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

const categories = [
  {
    value: FAQCategory.GENERAL,
    label: 'General',
    icon: HelpRounded,
    description: 'Basic information about the enrollment system and process',
  },
  {
    value: FAQCategory.ELECTIVE,
    label: 'Elective Disciplines',
    icon: BookRounded,
    description: 'Information about choosing and enrolling in elective courses',
  },
  {
    value: FAQCategory.COMPLEMENTARY,
    label: 'Complementary Disciplines',
    icon: MenuBookRounded,
    description: 'Details about interdisciplinary course selection',
  },
  {
    value: FAQCategory.THESIS,
    label: 'Thesis Registration',
    icon: SchoolRounded,
    description: 'Guidance on thesis topic and supervisor selection',
  },
];

const faqData: FAQItem[] = [
  {
    category: FAQCategory.GENERAL,
    question: 'What is the enrollment system and how does it work?',
    answer: (
      <FAQResponseContainer>
        <Stack spacing={3}>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            The enrollment system is your gateway to personalizing your academic
            journey at our university. It provides a structured way to select
            courses that align with your interests and academic requirements,
            while ensuring fair access to limited-capacity classes.
          </Typography>

          <Box>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
              The system encompasses three main components:
            </Typography>

            <Stack spacing={2}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 2.5 },
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
                  borderRadius: 2,
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.1),
                }}
              >
                <Stack spacing={1}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: 'primary.main', fontWeight: 600 }}
                  >
                    Elective Disciplines
                  </Typography>
                  <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                    These are specialized courses within your field of study
                    that allow you to focus on specific areas of interest.
                    You'll typically choose from a curated selection of courses
                    that complement your major and help build expertise in
                    particular domains.
                  </Typography>
                </Stack>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 2.5 },
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
                  borderRadius: 2,
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.1),
                }}
              >
                <Stack spacing={1}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: 'primary.main', fontWeight: 600 }}
                  >
                    Complementary Disciplines
                  </Typography>
                  <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                    These courses offer opportunities to explore subjects
                    outside your primary field, providing valuable
                    interdisciplinary knowledge and broadening your academic
                    perspective. They're carefully selected to enhance your
                    overall educational experience.
                  </Typography>
                </Stack>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 2.5 },
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
                  borderRadius: 2,
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.1),
                }}
              >
                <Stack spacing={1}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: 'primary.main', fontWeight: 600 }}
                  >
                    Thesis Registration
                  </Typography>
                  <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                    In your final year, this component allows you to select your
                    thesis topic and supervisor, marking an important transition
                    toward your academic culmination.
                  </Typography>
                </Stack>
              </Paper>
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 600 }}>
              How the Process Works
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              During each enrollment period, you'll receive notifications when
              selections become available for your year and specialization. The
              system operates on a priority-based approach, where you can rank
              your preferences for each course packet. This ensures that while
              popular courses may fill quickly, you still have the opportunity
              to secure alternatives that align with your academic goals.
            </Typography>
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 2.5 },
              bgcolor: (theme) => alpha(theme.palette.warning.main, 0.05),
              borderRadius: 2,
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.warning.main, 0.1),
            }}
          >
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Info color="warning" sx={{ mt: 0.5, flexShrink: 0 }} />
              <Typography
                variant="body2"
                sx={{ fontStyle: 'italic', lineHeight: 1.7 }}
              >
                Remember to regularly check your academic email and the
                enrollment platform for important announcements about upcoming
                enrollment periods and deadlines.
              </Typography>
            </Stack>
          </Paper>
        </Stack>
      </FAQResponseContainer>
    ),
  },

  {
    category: FAQCategory.GENERAL,
    question:
      'When do enrollment periods typically occur and how long do they last?',
    answer: (
      <FAQResponseContainer>
        <Stack spacing={3}>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            Enrollment periods are scheduled strategically throughout the
            academic year to ensure students have adequate time to make informed
            decisions about their course selections. The timing and duration
            vary by enrollment type and academic level.
          </Typography>

          <Box>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
              Typical Enrollment Timeline
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, color: 'primary.main' }}
                >
                  For Fall Semester (Semester 1)
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  Enrollment typically opens in late July or early August and
                  remains active for approximately two weeks. Early enrollment
                  periods are allocated based on academic year, with higher-year
                  students generally having priority access.
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, color: 'primary.main' }}
                >
                  For Spring Semester (Semester 2)
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  The enrollment period usually begins in early December and
                  continues for about two weeks. This timing allows students to
                  plan their courses during the winter break.
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 2.5 },
              bgcolor: (theme) => alpha(theme.palette.info.main, 0.05),
              borderRadius: 2,
              // border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
            }}
          >
            <Stack spacing={1.5}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Important Notes About Timing
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                - Specific dates are announced at least one month before each
                enrollment period - Late enrollment requests require special
                approval and may have limited course availability - Some
                specialized programs may have different enrollment schedules
              </Typography>
            </Stack>
          </Paper>
        </Stack>
      </FAQResponseContainer>
    ),
  },
  {
    category: FAQCategory.GENERAL,
    question: 'What happens if I miss an enrollment deadline?',
    answer: (
      <FAQResponseContainer>
        <Stack spacing={3}>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            Missing an enrollment deadline can impact your course selection
            options, but there are established procedures for handling such
            situations. The specific consequences and available solutions depend
            on the timing and circumstances.
          </Typography>

          <Box>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
              Available Options
            </Typography>
            <Stack spacing={2}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 2.5 },
                  bgcolor: (theme) => alpha(theme.palette.warning.main, 0.05),
                  borderRadius: 2,
                  // border: `1px solid ${alpha(theme.palette.warning.main, 0.1)}`,
                }}
              >
                <Stack spacing={1}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: 'warning.main', fontWeight: 600 }}
                  >
                    Late Enrollment Request
                  </Typography>
                  <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                    You can submit a late enrollment request through your
                    academic advisor. These requests are evaluated on a
                    case-by-case basis, considering factors such as course
                    availability and the reason for missing the deadline.
                  </Typography>
                </Stack>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 2.5 },
                  bgcolor: (theme) => alpha(theme.palette.info.main, 0.05),
                  borderRadius: 2,
                  // border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
                }}
              >
                <Stack spacing={1}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: 'info.main', fontWeight: 600 }}
                  >
                    Alternative Course Selection
                  </Typography>
                  <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                    If late enrollment isn't possible, your advisor can help you
                    identify alternative courses or make adjustments to your
                    academic plan to ensure you stay on track with your program
                    requirements.
                  </Typography>
                </Stack>
              </Paper>
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 600 }}>
              Recommended Actions
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              If you miss a deadline, contact your academic advisor immediately.
              They can guide you through the available options and help minimize
              any impact on your academic progress. Remember that early
              communication is key to finding the best possible solution.
            </Typography>
          </Box>
        </Stack>
      </FAQResponseContainer>
    ),
  },
  // additional FAQ items would be added here
];

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
