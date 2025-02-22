import {
  BookRounded,
  HelpRounded,
  MenuBookRounded,
  SchoolRounded,
} from '@mui/icons-material';
import { FAQCategory, FAQCategoryInfo } from '../../../types/faq/faq.types';

export const categories: FAQCategoryInfo[] = [
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
