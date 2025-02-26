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

export interface CategoryItem {
  value: FAQCategory;
  label: string;
  icon: React.ElementType;
  description: string;
}
