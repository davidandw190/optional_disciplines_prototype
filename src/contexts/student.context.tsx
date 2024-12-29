import { FC, ReactNode, createContext, useContext } from 'react';
import { Student, StudentStatus } from '../types/student/student.types';

import { mockStudent } from '../features/mocks/student.mock';

interface StudentContextValue {
  student: Student | null;
  isLoading: boolean;
  error: Error | null;
}

const StudentContext = createContext<StudentContextValue | undefined>(
  undefined
);

export const StudentProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // TODO: For now, we'll return the mock data, but we need to setup the api
  const value: StudentContextValue = {
    student: mockStudent,
    isLoading: false,
    error: null,
  };

  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};
