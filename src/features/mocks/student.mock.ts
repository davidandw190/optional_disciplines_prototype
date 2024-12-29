import { Student, StudentStatus } from "../../types/student/student.types";

export const mockStudent: Student = {
  id: 'student-1',
  firstName: 'Andrei-David',
  lastName: 'Nan',
  universityId: 'IE2024',
  email: 'andrei.nan03@e-uvt.ro',
  group: '1',
  subgroup: 1,
  specialization: 'Computer Science',
  yearOfStudy: 3,
  semester: 1,
  status: StudentStatus.ENROLLED,
  personalInfo: {
    cnp: '5990123445566',
    birthDate: new Date('2003-08-19'),
    phoneNumber: '+40 712 345 678',
    address: 'Str. Vasile Pârvan 4, Timișoara',
    citizenship: 'Romanian'
  },
  createdAt: new Date('2022-10-01'),
  updatedAt: new Date('2024-12-01')
};