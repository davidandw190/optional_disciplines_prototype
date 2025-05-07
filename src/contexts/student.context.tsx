import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Student, StudentStatus } from '../types/student/student.types';

import KeycloakService from '../services/keycloak.service';
import { mockStudent } from '../features/mocks/student.mock';
import { showToast } from '../utils/toastUtils';
import { useAuth } from './auth.context';

interface StudentContextValue {
  student: Student | null;
  isLoading: boolean;
  error: Error | null;
  refreshStudent: () => Promise<void>;
}

const StudentContext = createContext<StudentContextValue>({
  student: null,
  isLoading: true,
  error: null,
  refreshStudent: async () => {},
});

export const StudentProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const { isAuthenticated, keycloak } = useAuth();

  const fetchStudentData = async () => {
    if (import.meta.env.DEV) {
      console.log('Using mock student data in development mode');
      setStudent(mockStudent);
      setIsLoading(false);
      return;
    }

    if (!isAuthenticated || !keycloak) {
      setStudent(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      console.log('Attempting to fetch student data');

      await KeycloakService.updateToken();

      const getAttributeValue = (key: string, defaultValue: string): string => {
        const attributes = keycloak.tokenParsed?.attributes || {};
        const values = attributes[key];
        return Array.isArray(values) && values.length > 0
          ? values[0]
          : defaultValue;
      };

      const studentData: Student = {
        id: keycloak.subject || 'unknown-id',
        firstName: keycloak.tokenParsed?.given_name || 'Unknown',
        lastName: keycloak.tokenParsed?.family_name || 'User',
        universityId: getAttributeValue('universityId', 'Unknown'),
        email: keycloak.tokenParsed?.email || 'unknown@example.com',
        group: getAttributeValue('group', '1'),
        subgroup: parseInt(getAttributeValue('subgroup', '1')),
        specialization: getAttributeValue('specialization', 'Computer Science'),
        yearOfStudy: parseInt(getAttributeValue('yearOfStudy', '1')),
        semester: parseInt(getAttributeValue('semester', '1')) as 1 | 2,
        status: StudentStatus.ENROLLED,
        personalInfo: {
          cnp: getAttributeValue('cnp', ''),
          birthDate: new Date(),
          phoneNumber: getAttributeValue('phoneNumber', ''),
          address: getAttributeValue('address', ''),
          citizenship: getAttributeValue('citizenship', 'Romanian'),
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setStudent(studentData);
      setError(null);
    } catch (err) {
      console.error('Failed to get student data:', err);
      setError(err as Error);
      showToast.error('Failed to load student profile');

      if (import.meta.env.DEV) {
        console.log('Using mock data due to error');
        setStudent(mockStudent);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, [isAuthenticated, keycloak]);

  const refreshStudent = async () => {
    await fetchStudentData();
  };

  return (
    <StudentContext.Provider
      value={{
        student,
        isLoading,
        error,
        refreshStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};
