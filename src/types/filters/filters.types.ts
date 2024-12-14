import { AssessmentType, DisciplineType, TeachingLanguage } from "../disciplines/disciplines.enums";

export interface FilterState {
  search: string;
  credits: number[];
  languages: TeachingLanguage[];
  types: DisciplineType[];
  assessmentTypes: AssessmentType[];
  availabilityStatus: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface SortOption {
  value: string;
  label: string;
}

export const sortOptions: SortOption[] = [
  { value: 'name', label: 'Course Name' },
  { value: 'credits', label: 'Credits' },
  { value: 'spots', label: 'Available Spots' },
  { value: 'enrollmentCount', label: 'Enrollment Count' },
  { value: 'language', label: 'Teaching Language' },
];

export const initialFilterState: FilterState = {
  search: '',
  credits: [],
  languages: [],
  types: [],
  assessmentTypes: [], 
  availabilityStatus: 'all',
  sortBy: 'name',
  sortOrder: 'asc',
};