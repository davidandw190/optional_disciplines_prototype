// mockDisciplines.ts

import {
  AssessmentType,
  DisciplineType,
  LearningOutcomeCategory,
  TeachingActivityType,
  TeachingLanguage,
} from '../../types/disciplines/disciplines.enums';

import { Discipline } from '../../types/disciplines/disciplines.types';

const mockTeachers = [
  {
    id: '1',
    firstName: 'Elena',
    lastName: 'Lasconi',
    academicTitle: { title: 'Professor', abbreviation: 'Prof.' },
    email: 'elena.lasconi@e-uvt.ro',
    department: 'Computer Science',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    firstName: 'Adrian',
    lastName: 'Spataru',
    academicTitle: { title: 'Lector Doctor', abbreviation: 'Lect. Dr.' },
    email: 'adi.spataru@e-uvt.ro',
    department: 'Computer Science',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const mockDisciplines: Discipline[] = [
  {
    id: '1',
    code: 'IE420',
    name: 'Distributed Systems',
    description: 'Learn modern web development techniques and frameworks',
    type: DisciplineType.OPTIONAL,
    semester: 1,
    yearOfStudy: 3,
    credits: 2,
    assessmentType: AssessmentType.EXAM,
    language: TeachingLanguage.EN,
    createdAt: new Date(),
    updatedAt: new Date(),
    maxEnrollmentSpots: 100,
    currentEnrollmentCount: 75,
    waitlistLimit: 10,

    teachingActivities: [
      {
        id: '1',
        type: TeachingActivityType.COURSE,
        hoursPerWeek: 2,
        totalHours: 28,
        teacher: mockTeachers[1],
        teachingMethods: ['Lecture', 'Demonstrations'],
        conditions: {
          location: 'Room A03',
          requirements: ['Laptop required'],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        type: TeachingActivityType.LABORATORY,
        hoursPerWeek: 2,
        totalHours: 28,
        teacher: mockTeachers[1],
        teachingMethods: ['Practical work', 'Project development'],
        conditions: {
          location: 'Lab L01',
          requirements: ['Development environment setup'],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],

    weeklyHours: {
      course: 2,
      laboratory: 2,
      total: 4,
    },

    timeAllocation: {
      individualStudyHours: 28,
      documentationHours: 14,
      preparationHours: 14,
      tutoringHours: 7,
      examinationHours: 4,
      otherActivitiesHours: 5,
      totalSemesterHours: 100,
    },

    courseContent: [
      {
        id: '1',
        title: 'Introduction to Distirbuted Systems',
        description: 'Overview of current web technologies and frameworks',
        teachingMethods: ['Lecture', 'Discussion'],
        hours: 4,
        weekNumber: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        title: 'Frontend Development with React',
        description: 'Building user interfaces with React',
        teachingMethods: ['Lecture', 'Live coding'],
        hours: 8,
        weekNumber: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],

    laboratoryContent: [
      {
        id: '3',
        title: 'Setting up the Development Environment',
        description: 'Installing and configuring necessary tools',
        teachingMethods: ['Practical work'],
        hours: 4,
        weekNumber: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],

    bibliography: {
      required: [
        {
          title: 'Modern Web Development',
          authors: 'John Doe',
          year: 2023,
          type: 'BOOK',
          isbn: '978-0-123456-78-9',
        },
      ],
      recommended: [
        {
          title: 'React Design Patterns',
          authors: 'Jane Smith',
          year: 2023,
          type: 'BOOK',
        },
      ],
      online: [
        {
          title: 'React Documentation',
          authors: 'React Team',
          url: 'https://react.dev',
          type: 'ONLINE',
        },
      ],
    },

    prerequisites: {
      requiredSkills: ['Basic programming knowledge', 'HTML/CSS'],
      recommendations: ['Previous web development experience'],
    },

    learningOutcomes: [
      {
        id: '1',
        category: LearningOutcomeCategory.KNOWLEDGE,
        description: 'Understanding modern web development principles',
        outcomes: [
          'Understand key concepts of web development',
          'Know best practices in frontend development',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        category: LearningOutcomeCategory.SKILLS,
        description: 'Practical web development skills',
        outcomes: [
          'Build responsive web applications',
          'Implement modern frontend architectures',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],

    evaluationSystem: {
      components: [
        {
          id: '1',
          type: TeachingActivityType.COURSE,
          evaluationCriteria: [
            'Understanding of theoretical concepts',
            'Application of principles',
          ],
          evaluationMethods: ['Written exam'],
          weightInFinalGrade: 50,
          minimumGrade: 5,
          description: 'Final written examination',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          type: TeachingActivityType.LABORATORY,
          evaluationCriteria: [
            'Project implementation quality',
            'Code organization',
          ],
          evaluationMethods: ['Project evaluation', 'Code review'],
          weightInFinalGrade: 50,
          minimumGrade: 5,
          description: 'Project development and presentation',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      minimumRequirements: [
        'Minimum grade of 5 for each evaluation component',
        'Attendance at 80% of laboratory sessions',
      ],
      additionalNotes: 'Students must submit all required projects',
      makeupExamConditions: [
        'Available for students who failed the regular examination',
        'Covers entire course content',
      ],
    },
  },
  {
    id: '2',
    code: 'IE281',
    name: 'Advanced Web Development',
    description:
      'Learn current state of the art web development techniques and frameworks',
    type: DisciplineType.OPTIONAL,
    semester: 1,
    yearOfStudy: 3,
    credits: 2,
    assessmentType: AssessmentType.EXAM,
    language: TeachingLanguage.EN,
    createdAt: new Date(),
    updatedAt: new Date(),
    maxEnrollmentSpots: 120,
    currentEnrollmentCount: 110,
    waitlistLimit: 10,

    teachingActivities: [
      {
        id: '1',
        type: TeachingActivityType.COURSE,
        hoursPerWeek: 2,
        totalHours: 28,
        teacher: mockTeachers[0],
        teachingMethods: ['Lecture', 'Demonstrations'],
        conditions: {
          location: 'F106',
          requirements: ['Laptop required'],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        type: TeachingActivityType.LABORATORY,
        hoursPerWeek: 2,
        totalHours: 28,
        teacher: mockTeachers[0],
        teachingMethods: ['Practical work', 'Project development'],
        conditions: {
          location: '003',
          requirements: ['Development environment setup'],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],

    weeklyHours: {
      course: 2,
      laboratory: 2,
      total: 4,
    },

    timeAllocation: {
      individualStudyHours: 28,
      documentationHours: 14,
      preparationHours: 14,
      tutoringHours: 7,
      examinationHours: 4,
      otherActivitiesHours: 5,
      totalSemesterHours: 100,
    },

    courseContent: [
      {
        id: '1',
        title: 'Introduction to Modern Web Development',
        description: 'Overview of current web technologies and frameworks',
        teachingMethods: ['Lecture', 'Discussion'],
        hours: 4,
        weekNumber: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        title: 'Frontend Development with React',
        description: 'Building user interfaces with React',
        teachingMethods: ['Lecture', 'Live coding'],
        hours: 8,
        weekNumber: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],

    laboratoryContent: [
      {
        id: '3',
        title: 'Setting up the Development Environment',
        description: 'Installing and configuring necessary tools',
        teachingMethods: ['Practical work'],
        hours: 4,
        weekNumber: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],

    bibliography: {
      required: [
        {
          title: 'Modern Web Development',
          authors: 'John Doe',
          year: 2023,
          type: 'BOOK',
          isbn: '978-0-123456-78-9',
        },
      ],
      recommended: [
        {
          title: 'React Design Patterns',
          authors: 'Jane Doe',
          year: 2021,
          type: 'BOOK',
        },
      ],
      online: [
        {
          title: 'React Documentation',
          authors: 'React Team',
          url: 'https://react.dev',
          type: 'ONLINE',
        },
      ],
    },

    prerequisites: {
      requiredSkills: ['Basic programming knowledge', 'HTML/CSS'],
      recommendations: ['Previous web development experience'],
    },

    learningOutcomes: [
      {
        id: '1',
        category: LearningOutcomeCategory.KNOWLEDGE,
        description: 'Understanding modern web development principles',
        outcomes: [
          'Understand key concepts of web development',
          'Know best practices in frontend development',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        category: LearningOutcomeCategory.SKILLS,
        description: 'Practical web development skills',
        outcomes: [
          'Build responsive web applications',
          'Implement modern frontend architectures',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],

    evaluationSystem: {
      components: [
        {
          id: '1',
          type: TeachingActivityType.COURSE,
          evaluationCriteria: [
            'Understanding of theoretical concepts',
            'Application of principles',
          ],
          evaluationMethods: ['Written exam'],
          weightInFinalGrade: 50,
          minimumGrade: 5,
          description: 'Final written examination',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          type: TeachingActivityType.LABORATORY,
          evaluationCriteria: [
            'Project implementation quality',
            'Code organization',
          ],
          evaluationMethods: ['Project evaluation', 'Code review'],
          weightInFinalGrade: 50,
          minimumGrade: 5,
          description: 'Project development and presentation',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      minimumRequirements: [
        'Minimum grade of 5 for each evaluation component',
        'Attendance at 80% of laboratory sessions',
      ],
      additionalNotes: 'Students must submit all required projects',
      makeupExamConditions: [
        'Available for students who failed the regular examination',
        'Covers entire course content',
      ],
    },
  },

  {
    id: '2',
    code: 'IE421',
    name: 'Distributed Systems',
    description: 'Learn modern web development techniques and frameworks',
    type: DisciplineType.OPTIONAL,
    semester: 1,
    yearOfStudy: 3,
    credits: 2,
    assessmentType: AssessmentType.EXAM,
    language: TeachingLanguage.EN,
    createdAt: new Date(),
    updatedAt: new Date(),
    maxEnrollmentSpots: 100,
    currentEnrollmentCount: 75,
    waitlistLimit: 10,

    teachingActivities: [
      {
        id: '1',
        type: TeachingActivityType.COURSE,
        hoursPerWeek: 2,
        totalHours: 28,
        teacher: mockTeachers[1],
        teachingMethods: ['Lecture', 'Demonstrations'],
        conditions: {
          location: 'Room A03',
          requirements: ['Laptop required'],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        type: TeachingActivityType.LABORATORY,
        hoursPerWeek: 2,
        totalHours: 28,
        teacher: mockTeachers[1],
        teachingMethods: ['Practical work', 'Project development'],
        conditions: {
          location: 'Lab L01',
          requirements: ['Development environment setup'],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],

    weeklyHours: {
      course: 2,
      laboratory: 2,
      total: 4,
    },

    timeAllocation: {
      individualStudyHours: 28,
      documentationHours: 14,
      preparationHours: 14,
      tutoringHours: 7,
      examinationHours: 4,
      otherActivitiesHours: 5,
      totalSemesterHours: 100,
    },

    courseContent: [
      {
        id: '1',
        title: 'Introduction to Distirbuted Systems',
        description: 'Overview of current web technologies and frameworks',
        teachingMethods: ['Lecture', 'Discussion'],
        hours: 4,
        weekNumber: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        title: 'Frontend Development with React',
        description: 'Building user interfaces with React',
        teachingMethods: ['Lecture', 'Live coding'],
        hours: 8,
        weekNumber: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],

    laboratoryContent: [
      {
        id: '3',
        title: 'Setting up the Development Environment',
        description: 'Installing and configuring necessary tools',
        teachingMethods: ['Practical work'],
        hours: 4,
        weekNumber: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],

    bibliography: {
      required: [
        {
          title: 'Modern Web Development',
          authors: 'John Doe',
          year: 2023,
          type: 'BOOK',
          isbn: '978-0-123456-78-9',
        },
      ],
      recommended: [
        {
          title: 'React Design Patterns',
          authors: 'Jane Smith',
          year: 2023,
          type: 'BOOK',
        },
      ],
      online: [
        {
          title: 'React Documentation',
          authors: 'React Team',
          url: 'https://react.dev',
          type: 'ONLINE',
        },
      ],
    },

    prerequisites: {
      requiredSkills: ['Basic programming knowledge', 'HTML/CSS'],
      recommendations: ['Previous web development experience'],
    },

    learningOutcomes: [
      {
        id: '1',
        category: LearningOutcomeCategory.KNOWLEDGE,
        description: 'Understanding modern web development principles',
        outcomes: [
          'Understand key concepts of web development',
          'Know best practices in frontend development',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        category: LearningOutcomeCategory.SKILLS,
        description: 'Practical web development skills',
        outcomes: [
          'Build responsive web applications',
          'Implement modern frontend architectures',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],

    evaluationSystem: {
      components: [
        {
          id: '1',
          type: TeachingActivityType.COURSE,
          evaluationCriteria: [
            'Understanding of theoretical concepts',
            'Application of principles',
          ],
          evaluationMethods: ['Written exam'],
          weightInFinalGrade: 50,
          minimumGrade: 5,
          description: 'Final written examination',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          type: TeachingActivityType.LABORATORY,
          evaluationCriteria: [
            'Project implementation quality',
            'Code organization',
          ],
          evaluationMethods: ['Project evaluation', 'Code review'],
          weightInFinalGrade: 50,
          minimumGrade: 5,
          description: 'Project development and presentation',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      minimumRequirements: [
        'Minimum grade of 5 for each evaluation component',
        'Attendance at 80% of laboratory sessions',
      ],
      additionalNotes: 'Students must submit all required projects',
      makeupExamConditions: [
        'Available for students who failed the regular examination',
        'Covers entire course content',
      ],
    },
  },

  {
    id: '5',
    code: 'IE420',
    name: 'Distributed Systems',
    description: 'Learn modern web development techniques and frameworks',
    type: DisciplineType.OPTIONAL,
    semester: 1,
    yearOfStudy: 3,
    credits: 2,
    assessmentType: AssessmentType.EXAM,
    language: TeachingLanguage.EN,
    createdAt: new Date(),
    updatedAt: new Date(),
    maxEnrollmentSpots: 100,
    currentEnrollmentCount: 75,
    waitlistLimit: 10,

    teachingActivities: [
      {
        id: '1',
        type: TeachingActivityType.COURSE,
        hoursPerWeek: 2,
        totalHours: 28,
        teacher: mockTeachers[1],
        teachingMethods: ['Lecture', 'Demonstrations'],
        conditions: {
          location: 'Room A03',
          requirements: ['Laptop required'],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        type: TeachingActivityType.LABORATORY,
        hoursPerWeek: 2,
        totalHours: 28,
        teacher: mockTeachers[1],
        teachingMethods: ['Practical work', 'Project development'],
        conditions: {
          location: 'Lab L01',
          requirements: ['Development environment setup'],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],

    weeklyHours: {
      course: 2,
      laboratory: 2,
      total: 4,
    },

    timeAllocation: {
      individualStudyHours: 28,
      documentationHours: 14,
      preparationHours: 14,
      tutoringHours: 7,
      examinationHours: 4,
      otherActivitiesHours: 5,
      totalSemesterHours: 100,
    },

    courseContent: [
      {
        id: '1',
        title: 'Introduction to Distirbuted Systems',
        description: 'Overview of current web technologies and frameworks',
        teachingMethods: ['Lecture', 'Discussion'],
        hours: 4,
        weekNumber: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        title: 'Frontend Development with React',
        description: 'Building user interfaces with React',
        teachingMethods: ['Lecture', 'Live coding'],
        hours: 8,
        weekNumber: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],

    laboratoryContent: [
      {
        id: '3',
        title: 'Setting up the Development Environment',
        description: 'Installing and configuring necessary tools',
        teachingMethods: ['Practical work'],
        hours: 4,
        weekNumber: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],

    bibliography: {
      required: [
        {
          title: 'Modern Web Development',
          authors: 'John Doe',
          year: 2023,
          type: 'BOOK',
          isbn: '978-0-123456-78-9',
        },
      ],
      recommended: [
        {
          title: 'React Design Patterns',
          authors: 'Jane Smith',
          year: 2023,
          type: 'BOOK',
        },
      ],
      online: [
        {
          title: 'React Documentation',
          authors: 'React Team',
          url: 'https://react.dev',
          type: 'ONLINE',
        },
      ],
    },

    prerequisites: {
      requiredSkills: ['Basic programming knowledge', 'HTML/CSS'],
      recommendations: ['Previous web development experience'],
    },

    learningOutcomes: [
      {
        id: '1',
        category: LearningOutcomeCategory.KNOWLEDGE,
        description: 'Understanding modern web development principles',
        outcomes: [
          'Understand key concepts of web development',
          'Know best practices in frontend development',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        category: LearningOutcomeCategory.SKILLS,
        description: 'Practical web development skills',
        outcomes: [
          'Build responsive web applications',
          'Implement modern frontend architectures',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],

    evaluationSystem: {
      components: [
        {
          id: '1',
          type: TeachingActivityType.COURSE,
          evaluationCriteria: [
            'Understanding of theoretical concepts',
            'Application of principles',
          ],
          evaluationMethods: ['Written exam'],
          weightInFinalGrade: 50,
          minimumGrade: 5,
          description: 'Final written examination',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          type: TeachingActivityType.LABORATORY,
          evaluationCriteria: [
            'Project implementation quality',
            'Code organization',
          ],
          evaluationMethods: ['Project evaluation', 'Code review'],
          weightInFinalGrade: 50,
          minimumGrade: 5,
          description: 'Project development and presentation',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      minimumRequirements: [
        'Minimum grade of 5 for each evaluation component',
        'Attendance at 80% of laboratory sessions',
      ],
      additionalNotes: 'Students must submit all required projects',
      makeupExamConditions: [
        'Available for students who failed the regular examination',
        'Covers entire course content',
      ],
    },
  },
];
