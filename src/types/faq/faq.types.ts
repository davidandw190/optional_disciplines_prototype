import { SvgIconComponent } from '@mui/icons-material';

export enum FAQCategory {
  GENERAL = 'general',
  ELECTIVE = 'elective',
  COMPLEMENTARY = 'complementary',
  THESIS = 'thesis',
}

export interface FAQItem {
  question: string;
  answer: string | JSX.Element;
  category: FAQCategory;
}

export interface FAQCategoryInfo {
  value: FAQCategory;
  label: string;
  icon: SvgIconComponent;
  description: string;
}