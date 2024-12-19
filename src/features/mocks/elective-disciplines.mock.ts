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
    maxEnrollmentSpots: 120,
    currentEnrollmentCount: 65,
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
    id: '3',
    code: 'IE422',
    name: 'Cloud Computing and DevOps',
    description:
      'Master modern cloud infrastructure, containerization, and DevOps practices. Learn to design, deploy and manage scalable cloud applications using industry-standard tools and methodologies.',
    type: DisciplineType.OPTIONAL,
    semester: 1,
    yearOfStudy: 3,
    credits: 3,
    assessmentType: AssessmentType.COLLOQUIUM,
    language: TeachingLanguage.EN,
    createdAt: new Date(),
    updatedAt: new Date(),
    maxEnrollmentSpots: 80,
    currentEnrollmentCount: 45,
    waitlistLimit: 10,

    teachingActivities: [
      {
        id: '1',
        type: TeachingActivityType.COURSE,
        hoursPerWeek: 2,
        totalHours: 28,
        teacher: {
          id: '3',
          firstName: 'Dan',
          lastName: 'Popescu',
          academicTitle: {
            title: 'Associate Professor',
            abbreviation: 'Assoc. Prof.',
          },
          email: 'dan.popescu@e-uvt.ro',
          department: 'Computer Science',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        teachingMethods: [
          'Interactive lectures',
          'Case studies',
          'Live demonstrations',
        ],
        conditions: {
          location: 'Room L308',
          requirements: [
            'Laptop with minimum 8GB RAM',
            'AWS free tier account',
          ],
          platforms: [
            {
              name: 'AWS Academy',
              url: 'https://aws.amazon.com/education/awsacademy/',
              required: true,
            },
            {
              name: 'GitHub',
              required: true,
            },
          ],
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
        teachingMethods: [
          'Hands-on exercises',
          'Project work',
          'Infrastructure deployment',
        ],
        conditions: {
          location: 'Cloud Computing Lab',
          requirements: [
            'Docker Desktop installed',
            'Kubernetes CLI tools',
            'Git installed',
          ],
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
      individualStudyHours: 35,
      documentationHours: 20,
      preparationHours: 25,
      tutoringHours: 10,
      examinationHours: 4,
      otherActivitiesHours: 6,
      totalSemesterHours: 100,
    },

    courseContent: [
      {
        id: '1',
        title: 'Cloud Computing Fundamentals',
        description:
          'Introduction to cloud computing concepts, service models, and major providers',
        teachingMethods: ['Lecture', 'Discussion', 'Case Studies'],
        hours: 4,
        weekNumber: 1,
        references: [
          {
            title: 'Cloud Computing: Concepts, Technology & Architecture',
            authors: 'Thomas Erl, Ricardo Puttini, Zaigham Mahmood',
            year: 2013,
            type: 'BOOK',
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        title: 'Containerization with Docker',
        description:
          'Docker fundamentals, container lifecycle, and best practices',
        teachingMethods: [
          'Lecture',
          'Live demonstrations',
          'Hands-on practice',
        ],
        hours: 6,
        weekNumber: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        title: 'Container Orchestration with Kubernetes',
        description: 'Kubernetes architecture, pods, services, and deployments',
        teachingMethods: ['Lecture', 'Live demonstrations'],
        hours: 8,
        weekNumber: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],

    laboratoryContent: [
      {
        id: '1',
        title: 'Setting up Cloud Development Environment',
        description:
          'Configure AWS CLI, create EC2 instances, and set up basic networking',
        teachingMethods: ['Guided practice', 'Individual work'],
        hours: 4,
        weekNumber: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        title: 'Docker Containers Workshop',
        description:
          'Build custom images, manage containers, and implement multi-container applications',
        teachingMethods: ['Hands-on workshop', 'Pair programming'],
        hours: 6,
        weekNumber: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],

    bibliography: {
      required: [
        {
          title: 'Docker Deep Dive',
          authors: 'Nigel Poulton',
          year: 2023,
          type: 'BOOK',
          isbn: '978-1-521-82239-9',
        },
        {
          title: 'Kubernetes in Action',
          authors: 'Marko Luksa',
          year: 2022,
          type: 'BOOK',
          isbn: '978-1-617-29660-2',
        },
      ],
      recommended: [
        {
          title: 'Cloud Native DevOps with Kubernetes',
          authors: 'John Arundel, Justin Domingus',
          year: 2022,
          type: 'BOOK',
        },
      ],
      online: [
        {
          title: 'AWS Documentation',
          authors: 'Amazon Web Services',
          url: 'https://docs.aws.amazon.com',
          type: 'ONLINE',
        },
        {
          title: 'Kubernetes Documentation',
          authors: 'Kubernetes Team',
          url: 'https://kubernetes.io/docs/',
          type: 'ONLINE',
        },
      ],
    },

    prerequisites: {
      requiredDisciplines: [
        {
          code: 'IE320',
          name: 'Operating Systems',
        },
        {
          code: 'IE340',
          name: 'Computer Networks',
        },
      ],
      requiredSkills: [
        'Linux command line basics',
        'Basic networking concepts',
        'Understanding of virtualization',
      ],
      recommendations: [
        'Prior experience with any cloud provider',
        'Basic understanding of system administration',
      ],
    },

    learningOutcomes: [
      {
        id: '1',
        category: LearningOutcomeCategory.KNOWLEDGE,
        description:
          'Understanding cloud computing and containerization principles',
        outcomes: [
          'Understand cloud service models (IaaS, PaaS, SaaS)',
          'Comprehend container orchestration concepts',
          'Know DevOps principles and practices',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        category: LearningOutcomeCategory.SKILLS,
        description: 'Practical cloud and container management skills',
        outcomes: [
          'Deploy and manage applications on AWS',
          'Create and orchestrate Docker containers',
          'Implement CI/CD pipelines',
          'Manage Kubernetes clusters',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],

    evaluationSystem: {
      components: [
        {
          id: '1',
          type: TeachingActivityType.LABORATORY,
          evaluationCriteria: [
            'Infrastructure as Code implementation',
            'Container deployment quality',
            'Security best practices implementation',
          ],
          evaluationMethods: [
            'Project presentation',
            'Code review',
            'Documentation quality',
          ],
          weightInFinalGrade: 60,
          minimumGrade: 5,
          description:
            'Practical project implementing a cloud-native application',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          type: TeachingActivityType.COURSE,
          evaluationCriteria: [
            'Understanding of cloud concepts',
            'Knowledge of containerization principles',
            'DevOps practices comprehension',
          ],
          evaluationMethods: ['Written exam', 'Oral presentation'],
          weightInFinalGrade: 40,
          minimumGrade: 5,
          description: 'Final theoretical examination',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      minimumRequirements: [
        'Minimum grade of 5 for each evaluation component',
        'At least 80% attendance at laboratory sessions',
        'Completion of all practical assignments',
        'Functional final project deployment',
      ],
      additionalNotes:
        'Students must maintain their cloud resources within free tier limits',
      makeupExamConditions: [
        'Project deadline extensions available with proper justification',
        'Makeup exam covers both theoretical and practical components',
      ],
    },
  },

  {
    id: '4',
    code: 'IE423',
    name: 'Applied Machine Learning',
    description:
      'A comprehensive introduction to machine learning with practical applications. Students will learn fundamental ML concepts, popular algorithms, and gain hands-on experience with modern frameworks while working on real-world problems.',
    type: DisciplineType.OPTIONAL,
    semester: 1,
    yearOfStudy: 3,
    credits: 4, // Higher credits due to complexity and workload
    assessmentType: AssessmentType.EXAM,
    language: TeachingLanguage.EN,
    createdAt: new Date(), // Add this
    updatedAt: new Date(),
    maxEnrollmentSpots: 60, // Limited due to computational resources
    currentEnrollmentCount: 45,
    waitlistLimit: 8,

    teachingActivities: [
      {
        id: '1',
        type: TeachingActivityType.COURSE,
        hoursPerWeek: 2,
        totalHours: 28,
        teacher: {
          id: '4',
          firstName: 'Maria',
          lastName: 'Ionescu',
          academicTitle: {
            title: 'Associate Professor',
            abbreviation: 'Assoc. Prof.',
          },
          email: 'maria.ionescu@e-uvt.ro',
          department: 'Computer Science',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        teachingMethods: [
          'Interactive lectures',
          'Algorithm demonstrations',
          'Case studies of real ML applications',
          'Mathematical foundations discussion',
        ],
        conditions: {
          location: 'Room A202',
          requirements: [
            'Laptop with minimum 16GB RAM',
            'NVIDIA GPU recommended',
          ],
          platforms: [
            {
              name: 'Google Colab Pro',
              url: 'https://colab.research.google.com',
              required: true,
              details: 'For GPU-accelerated notebooks',
            },
            {
              name: 'Kaggle',
              required: true,
              details: 'For datasets and competitions',
            },
          ],
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
        teachingMethods: [
          'Hands-on implementation',
          'Model training workshops',
          'Dataset preparation exercises',
          'Performance optimization practice',
        ],
        conditions: {
          location: 'AI Lab',
          requirements: [
            'Python 3.9+ installed',
            'PyTorch and TensorFlow frameworks',
            'Jupyter Notebook environment',
          ],
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
      individualStudyHours: 40,
      documentationHours: 25,
      preparationHours: 30,
      tutoringHours: 10,
      examinationHours: 5,
      otherActivitiesHours: 10,
      totalSemesterHours: 120,
    },

    courseContent: [
      {
        id: '1',
        title: 'Foundations of Machine Learning',
        description:
          'Introduction to ML types, fundamental concepts, and the ML development lifecycle',
        teachingMethods: ['Lecture', 'Interactive Discussion'],
        hours: 4,
        weekNumber: 1,
        references: [
          {
            title: 'Deep Learning',
            authors: 'Ian Goodfellow, Yoshua Bengio, Aaron Courville',
            year: 2022,
            type: 'BOOK',
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        title: 'Supervised Learning Algorithms',
        description:
          'Deep dive into classification, regression, and neural networks',
        teachingMethods: ['Lecture', 'Algorithm Demonstrations'],
        hours: 8,
        weekNumber: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        title: 'Deep Learning Architectures',
        description: 'CNN, RNN, Transformers, and their applications',
        teachingMethods: ['Lecture', 'Case Studies'],
        hours: 8,
        weekNumber: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],

    laboratoryContent: [
      {
        id: '1',
        title: 'ML Development Environment Setup',
        description:
          'Setting up Python ML environment, introduction to key libraries',
        teachingMethods: ['Guided practice', 'Individual work'],
        hours: 4,
        weekNumber: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        title: 'Building Neural Networks with PyTorch',
        description: 'Implementing and training neural networks from scratch',
        teachingMethods: ['Workshop', 'Pair programming'],
        hours: 6,
        weekNumber: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],

    bibliography: {
      required: [
        {
          title:
            'Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow',
          authors: 'Aurélien Géron',
          year: 2023,
          type: 'BOOK',
          isbn: '978-1-098-12597-4',
        },
        {
          title: 'Deep Learning with PyTorch',
          authors: 'Eli Stevens, Luca Antiga, Thomas Viehmann',
          year: 2023,
          type: 'BOOK',
          isbn: '978-1-617-29651-0',
        },
      ],
      recommended: [
        {
          title: 'Mathematics for Machine Learning',
          authors: 'Marc Peter Deisenroth, A. Aldo Faisal, Cheng Soon Ong',
          year: 2022,
          type: 'BOOK',
        },
      ],
      online: [
        {
          title: 'PyTorch Documentation',
          authors: 'PyTorch Team',
          url: 'https://pytorch.org/docs/stable/index.html',
          type: 'ONLINE',
        },
        {
          title: 'Papers with Code',
          authors: 'Papers with Code Team',
          url: 'https://paperswithcode.com/',
          type: 'ONLINE',
        },
      ],
    },

    prerequisites: {
      requiredDisciplines: [
        {
          code: 'IE310',
          name: 'Linear Algebra',
        },
        {
          code: 'IE315',
          name: 'Probability and Statistics',
        },
      ],
      requiredSkills: [
        'Strong Python programming',
        'Basic calculus and linear algebra',
        'Understanding of probability concepts',
      ],
      recommendations: [
        'Prior exposure to data analysis',
        'Familiarity with scientific Python libraries',
      ],
    },

    learningOutcomes: [
      {
        id: '1',
        category: LearningOutcomeCategory.KNOWLEDGE,
        description: 'Theoretical understanding of ML concepts',
        outcomes: [
          'Understand core ML algorithms and their applications',
          'Comprehend neural network architectures',
          'Master ML model evaluation techniques',
          'Understand ethical implications of ML',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        category: LearningOutcomeCategory.SKILLS,
        description: 'Practical ML development capabilities',
        outcomes: [
          'Implement and train ML models using PyTorch',
          'Process and prepare datasets for ML',
          'Deploy ML models to production',
          'Optimize model performance',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],

    evaluationSystem: {
      components: [
        {
          id: '1',
          type: TeachingActivityType.LABORATORY,
          evaluationCriteria: [
            'Model implementation quality',
            'Experimental methodology',
            'Performance optimization',
            'Code quality and documentation',
          ],
          evaluationMethods: [
            'Project implementation',
            'Model evaluation metrics',
            'Technical report',
          ],
          weightInFinalGrade: 60,
          minimumGrade: 5,
          description: 'Practical ML project implementation',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          type: TeachingActivityType.COURSE,
          evaluationCriteria: [
            'Understanding of ML theory',
            'Algorithm analysis capability',
            'Problem-solving skills',
          ],
          evaluationMethods: ['Written exam', 'Algorithmic problems'],
          weightInFinalGrade: 40,
          minimumGrade: 5,
          description: 'Theoretical examination',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      minimumRequirements: [
        'Minimum grade of 5 for each component',
        'Attendance at 80% of labs',
        'Completion of all practical assignments',
        'Successful model deployment for final project',
      ],
      additionalNotes:
        'Projects must include proper documentation and reproducibility guidelines',
      makeupExamConditions: [
        'Makeup exam includes both theoretical and practical components',
        'Project extensions require written justification',
      ],
    },
  },
  {
    id: '5',
    code: 'IE424',
    name: 'Internet of Things: Embedded Systems and Applications',
    description:
      'A comprehensive exploration of IoT systems, from sensor-level programming to cloud integration. Students will learn to design, implement, and deploy complete IoT solutions using industry-standard hardware and protocols.',
    type: DisciplineType.OPTIONAL,
    semester: 1,
    yearOfStudy: 3,
    credits: 4,
    assessmentType: AssessmentType.EXAM,
    language: TeachingLanguage.EN,
    createdAt: new Date(),
    updatedAt: new Date(),
    maxEnrollmentSpots: 40, // Limited by available hardware kits
    currentEnrollmentCount: 28,
    waitlistLimit: 5,

    teachingActivities: [
      {
        id: '1',
        type: TeachingActivityType.COURSE,
        hoursPerWeek: 2,
        totalHours: 28,
        teacher: {
          id: '5',
          firstName: 'Alexandru',
          lastName: 'Radovici',
          academicTitle: {
            title: 'Associate Professor',
            abbreviation: 'Assoc. Prof.',
          },
          email: 'alex.radovici@e-uvt.ro',
          department: 'Computer Science',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        teachingMethods: [
          'Interactive lectures',
          'Hardware demonstrations',
          'Architecture discussions',
          'Real-world case studies',
        ],
        conditions: {
          location: 'IoT Laboratory',
          requirements: [
            'Personal laptop with USB ports',
            'Arduino IDE installed',
            'ESP32 development environment',
          ],
          platforms: [
            {
              name: 'AWS IoT Core',
              required: true,
              details: 'For cloud connectivity',
            },
            {
              name: 'PlatformIO',
              required: true,
              details: 'For embedded development',
            },
          ],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        type: TeachingActivityType.LABORATORY,
        hoursPerWeek: 2,
        totalHours: 28,
        teacher: {
          id: '6',
          firstName: 'Mihai',
          lastName: 'Dumitrescu',
          academicTitle: { title: 'Teaching Assistant', abbreviation: 'T.A.' },
          email: 'mihai.dumitrescu@e-uvt.ro',
          department: 'Computer Science',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        teachingMethods: [
          'Hands-on hardware programming',
          'Sensor integration workshops',
          'Protocol implementation exercises',
          'Project development',
        ],
        conditions: {
          location: 'IoT Laboratory',
          requirements: [
            'IoT Development Kit (provided)',
            'Basic electronic components',
            'Multimeter (available in lab)',
          ],
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
      individualStudyHours: 35,
      documentationHours: 20,
      preparationHours: 25,
      tutoringHours: 10,
      examinationHours: 5,
      otherActivitiesHours: 5,
      totalSemesterHours: 100,
    },

    courseContent: [
      {
        id: '1',
        title: 'IoT Architecture and Protocols',
        description:
          'Overview of IoT layers, communication protocols, and system architecture',
        teachingMethods: ['Lecture', 'Case Studies'],
        hours: 6,
        weekNumber: 1,
        references: [
          {
            title: 'Internet of Things: A Hands-on Approach',
            authors: 'Arshdeep Bahga, Vijay Madisetti',
            year: 2023,
            type: 'BOOK',
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        title: 'Embedded Systems Programming',
        description:
          'Programming microcontrollers, real-time operating systems, and sensor interfaces',
        teachingMethods: ['Lecture', 'Live Coding', 'Hardware Demos'],
        hours: 8,
        weekNumber: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        title: 'IoT Security and Privacy',
        description:
          'Security challenges, encryption, access control, and privacy considerations',
        teachingMethods: ['Lecture', 'Security Analysis'],
        hours: 6,
        weekNumber: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],

    laboratoryContent: [
      {
        id: '1',
        title: 'Getting Started with ESP32',
        description: 'Basic GPIO, sensor reading, and WiFi connectivity',
        teachingMethods: ['Hands-on Practice', 'Guided Development'],
        hours: 4,
        weekNumber: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        title: 'Sensor Networks and MQTT',
        description:
          'Building sensor networks and implementing MQTT communication',
        teachingMethods: ['Project Work', 'Protocol Implementation'],
        hours: 6,
        weekNumber: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],

    bibliography: {
      required: [
        {
          title: 'IoT Projects with ESP32',
          authors: 'Peter Waher',
          year: 2023,
          type: 'BOOK',
          isbn: '978-1-484-27731-2',
        },
        {
          title: 'Building IoT Systems with MQTT',
          authors: 'Steve Cope',
          year: 2023,
          type: 'BOOK',
          isbn: '978-1-789-61839-2',
        },
      ],
      recommended: [
        {
          title: 'Designing IoT Solutions with Azure',
          authors: 'Microsoft Azure Team',
          year: 2023,
          type: 'BOOK',
        },
      ],
      online: [
        {
          title: 'ESP32 Technical Reference Manual',
          authors: 'Espressif Systems',
          url: 'https://www.espressif.com/sites/default/files/documentation/esp32_technical_reference_manual_en.pdf',
          type: 'ONLINE',
        },
        {
          title: 'MQTT Specification',
          authors: 'OASIS Open',
          url: 'https://mqtt.org/mqtt-specification/',
          type: 'ONLINE',
        },
      ],
    },

    prerequisites: {
      requiredDisciplines: [
        {
          code: 'IE320',
          name: 'Operating Systems',
        },
        {
          code: 'IE340',
          name: 'Computer Networks',
        },
      ],
      requiredSkills: [
        'C/C++ programming',
        'Basic understanding of electronics',
        'Networking fundamentals',
      ],
      recommendations: [
        'Prior experience with microcontrollers',
        'Knowledge of communication protocols',
      ],
    },

    learningOutcomes: [
      {
        id: '1',
        category: LearningOutcomeCategory.KNOWLEDGE,
        description: 'Understanding IoT fundamentals and architecture',
        outcomes: [
          'Comprehend IoT system architecture and components',
          'Understand communication protocols and standards',
          'Master sensor and actuator integration concepts',
          'Grasp IoT security principles',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        category: LearningOutcomeCategory.SKILLS,
        description: 'Practical IoT development capabilities',
        outcomes: [
          'Program embedded systems for IoT applications',
          'Implement secure IoT communication protocols',
          'Design and deploy sensor networks',
          'Integrate IoT devices with cloud platforms',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],

    evaluationSystem: {
      components: [
        {
          id: '1',
          type: TeachingActivityType.LABORATORY,
          evaluationCriteria: [
            'Hardware integration quality',
            'Code efficiency and organization',
            'Protocol implementation correctness',
            'System reliability and robustness',
          ],
          evaluationMethods: [
            'Project demonstration',
            'Code review',
            'Documentation quality',
            'System performance metrics',
          ],
          weightInFinalGrade: 60,
          minimumGrade: 5,
          description: 'Complete IoT system implementation project',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          type: TeachingActivityType.COURSE,
          evaluationCriteria: [
            'Understanding of IoT concepts',
            'Protocol analysis abilities',
            'Security awareness',
            'System design capabilities',
          ],
          evaluationMethods: ['Written exam', 'System design exercise'],
          weightInFinalGrade: 40,
          minimumGrade: 5,
          description: 'Final theoretical and design examination',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      minimumRequirements: [
        'Minimum grade of 5 for each component',
        'Attendance at 80% of laboratory sessions',
        'Functional final project implementation',
        'Complete project documentation submission',
      ],
      additionalNotes:
        'Students must handle laboratory equipment with care and follow safety guidelines',
      makeupExamConditions: [
        'Makeup exam includes both theoretical and practical components',
        'Project improvements must be demonstrated in person',
      ],
    },
  },
  {
    id: '6',
    code: 'IE425',
    name: 'Advanced React and Modern Frontend Architecture',
    description:
      'Master modern React development practices, state management patterns, and frontend architecture principles. Students will learn to build scalable, performant applications while following industry best practices for component design, testing, and deployment.',
    type: DisciplineType.OPTIONAL,
    semester: 1,
    yearOfStudy: 3,
    credits: 3,
    assessmentType: AssessmentType.EXAM,
    language: TeachingLanguage.EN,
    createdAt: new Date(),
    updatedAt: new Date(),
    maxEnrollmentSpots: 70,
    currentEnrollmentCount: 52,
    waitlistLimit: 10,

    teachingActivities: [
      {
        id: '1',
        type: TeachingActivityType.COURSE,
        hoursPerWeek: 2,
        totalHours: 28,
        teacher: {
          id: '7',
          firstName: 'Andrei',
          lastName: 'Gheorghe',
          academicTitle: { title: 'Lecturer', abbreviation: 'Lect.' },
          email: 'andrei.gheorghe@e-uvt.ro',
          department: 'Computer Science',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        teachingMethods: [
          'Interactive lectures',
          'Live coding sessions',
          'Architecture discussions',
          'Pattern analysis',
          'Performance optimization workshops',
        ],
        conditions: {
          location: 'Web Development Lab',
          requirements: [
            'Laptop with minimum 8GB RAM',
            'Node.js LTS installed',
            'VS Code with React extensions',
          ],
          platforms: [
            {
              name: 'GitHub',
              required: true,
              details: 'For version control and project submission',
            },
            {
              name: 'CodeSandbox',
              required: true,
              details: 'For interactive exercises',
            },
          ],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        type: TeachingActivityType.LABORATORY,
        hoursPerWeek: 2,
        totalHours: 28,
        teacher: {
          id: '8',
          firstName: 'Diana',
          lastName: 'Popescu',
          academicTitle: { title: 'Teaching Assistant', abbreviation: 'T.A.' },
          email: 'diana.popescu@e-uvt.ro',
          department: 'Computer Science',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        teachingMethods: [
          'Hands-on development',
          'Code reviews',
          'Pair programming sessions',
          'Testing workshops',
        ],
        conditions: {
          location: 'Web Development Lab',
          requirements: [
            'Git installed and configured',
            'Modern web browser',
            'Postman or similar API testing tool',
          ],
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
      individualStudyHours: 30,
      documentationHours: 20,
      preparationHours: 25,
      tutoringHours: 8,
      examinationHours: 4,
      otherActivitiesHours: 5,
      totalSemesterHours: 92,
    },

    courseContent: [
      {
        id: '1',
        title: 'Modern React Fundamentals and Hooks Architecture',
        description:
          'Deep dive into React hooks, component patterns, and the React rendering lifecycle',
        teachingMethods: ['Lecture', 'Live Coding', 'Pattern Analysis'],
        hours: 6,
        weekNumber: 1,
        references: [
          {
            title: 'React Design Patterns and Best Practices',
            authors: 'Carlos Santana Roldán',
            year: 2023,
            type: 'BOOK',
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        title: 'State Management and Data Flow',
        description:
          'Advanced state management patterns, Redux Toolkit, and React Query',
        teachingMethods: ['Lecture', 'Architecture Discussion', 'Case Studies'],
        hours: 8,
        weekNumber: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        title: 'Performance Optimization and Testing',
        description:
          'React performance patterns, memoization, code splitting, and testing strategies',
        teachingMethods: [
          'Lecture',
          'Performance Analysis',
          'Testing Workshop',
        ],
        hours: 6,
        weekNumber: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],

    laboratoryContent: [
      {
        id: '1',
        title: 'Building a Production-Grade React Application',
        description:
          'Project setup, code organization, and development workflow',
        teachingMethods: [
          'Guided Development',
          'Best Practices Implementation',
        ],
        hours: 6,
        weekNumber: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        title: 'Component Design and Testing',
        description:
          'Creating reusable components and writing comprehensive tests',
        teachingMethods: ['Component Development', 'Test Implementation'],
        hours: 6,
        weekNumber: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],

    bibliography: {
      required: [
        {
          title: 'Learning Patterns: Patterns.dev',
          authors: 'Lydia Hallie, Addy Osmani',
          year: 2023,
          type: 'BOOK',
          isbn: '978-1-234-56789-0',
        },
        {
          title: 'Testing React Applications',
          authors: 'Kent C. Dodds',
          year: 2023,
          type: 'BOOK',
          isbn: '978-1-617-29705-0',
        },
      ],
      recommended: [
        {
          title: 'React Performance Optimization',
          authors: 'Ivan Akulov',
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
        {
          title: 'Redux Toolkit Documentation',
          authors: 'Redux Team',
          url: 'https://redux-toolkit.js.org',
          type: 'ONLINE',
        },
      ],
    },

    prerequisites: {
      requiredDisciplines: [
        {
          code: 'IE330',
          name: 'Web Development Fundamentals',
        },
        {
          code: 'IE335',
          name: 'JavaScript Programming',
        },
      ],
      requiredSkills: [
        'Strong JavaScript fundamentals',
        'HTML and CSS proficiency',
        'Understanding of web protocols',
        'Basic TypeScript knowledge',
      ],
      recommendations: [
        'Prior experience with any frontend framework',
        'Familiarity with Git version control',
      ],
    },

    learningOutcomes: [
      {
        id: '1',
        category: LearningOutcomeCategory.KNOWLEDGE,
        description: 'Understanding React architecture and patterns',
        outcomes: [
          'Master React hooks and their use cases',
          'Understand component lifecycle and rendering optimization',
          'Comprehend state management patterns',
          'Grasp modern frontend testing approaches',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        category: LearningOutcomeCategory.SKILLS,
        description: 'Professional React development capabilities',
        outcomes: [
          'Build production-ready React applications',
          'Implement efficient state management solutions',
          'Write maintainable and reusable components',
          'Create comprehensive test suites',
          'Optimize React application performance',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],

    evaluationSystem: {
      components: [
        {
          id: '1',
          type: TeachingActivityType.LABORATORY,
          evaluationCriteria: [
            'Code quality and organization',
            'Component design principles',
            'Testing coverage and quality',
            'Performance optimization implementation',
            'Project architecture',
          ],
          evaluationMethods: [
            'Project implementation',
            'Code reviews',
            'Performance benchmarks',
            'Documentation quality',
          ],
          weightInFinalGrade: 60,
          minimumGrade: 5,
          description: 'Development of a complete React application',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          type: TeachingActivityType.COURSE,
          evaluationCriteria: [
            'Understanding of React concepts',
            'Knowledge of optimization techniques',
            'Testing methodology comprehension',
            'Architecture design capabilities',
          ],
          evaluationMethods: ['Written exam', 'Architecture design task'],
          weightInFinalGrade: 40,
          minimumGrade: 5,
          description: 'Theoretical and practical examination',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      minimumRequirements: [
        'Minimum grade of 5 for each evaluation component',
        'Attendance at 75% of laboratory sessions',
        'Completion of all assigned coding exercises',
        'Functional final project with documentation',
      ],
      additionalNotes:
        'Projects must include proper TypeScript usage and comprehensive testing',
      makeupExamConditions: [
        'Project improvements must be submitted with explanation document',
        'Theoretical exam can be retaken with new practical tasks',
      ],
    },
  },

  {
    id: '7',
    code: 'IE426',
    name: 'Cybersecurity and Network Defense',
    description:
      'A comprehensive study of modern cybersecurity principles, network defense strategies, and ethical hacking methodologies. Students will learn to identify vulnerabilities, implement security measures, and develop robust defense strategies while understanding the ethical implications of cybersecurity practices.',
    type: DisciplineType.OPTIONAL,
    semester: 1,
    yearOfStudy: 3,
    credits: 4,
    assessmentType: AssessmentType.EXAM,
    language: TeachingLanguage.EN,
    createdAt: new Date(),
    updatedAt: new Date(),
    maxEnrollmentSpots: 50, 
    currentEnrollmentCount: 50,
    waitlistLimit: 8,

    teachingActivities: [
      {
        id: '1',
        type: TeachingActivityType.COURSE,
        hoursPerWeek: 2,
        totalHours: 28,
        teacher: {
          id: '9',
          firstName: 'Gabriel',
          lastName: 'Stoian',
          academicTitle: {
            title: 'Associate Professor',
            abbreviation: 'Assoc. Prof.',
          },
          email: 'gabriel.stoian@e-uvt.ro',
          department: 'Computer Science',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        teachingMethods: [
          'Interactive lectures',
          'Real-world case studies',
          'Security incident analysis',
          'Threat modeling workshops',
          'Ethical discussions',
        ],
        conditions: {
          location: 'Security Laboratory',
          requirements: [
            'Laptop with minimum 16GB RAM',
            'VirtualBox or VMware installed',
            'Kali Linux VM configured',
          ],
          platforms: [
            {
              name: 'TryHackMe',
              required: true,
              details: 'For hands-on security exercises',
            },
            {
              name: 'OWASP Security Platform',
              required: true,
              details: 'For web security training',
            },
          ],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        type: TeachingActivityType.LABORATORY,
        hoursPerWeek: 2,
        totalHours: 28,
        teacher: {
          id: '10',
          firstName: 'Radu',
          lastName: 'Munteanu',
          academicTitle: {
            title: 'Security Specialist',
            abbreviation: 'Sec. Spec.',
          },
          email: 'radu.munteanu@e-uvt.ro',
          department: 'Computer Science',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        teachingMethods: [
          'Penetration testing exercises',
          'Network analysis workshops',
          'Security tool implementation',
          'Defense strategy development',
        ],
        conditions: {
          location: 'Security Laboratory',
          requirements: [
            'Security testing environment (provided)',
            'Network analysis tools',
            'Personal protective equipment',
          ],
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
      individualStudyHours: 35,
      documentationHours: 25,
      preparationHours: 30,
      tutoringHours: 10,
      examinationHours: 5,
      otherActivitiesHours: 5,
      totalSemesterHours: 110,
    },

    courseContent: [
      {
        id: '1',
        title: 'Fundamentals of Cybersecurity',
        description:
          'Core security principles, threat landscapes, and defense-in-depth strategies',
        teachingMethods: ['Lecture', 'Case Studies', 'Group Discussion'],
        hours: 6,
        weekNumber: 1,
        references: [
          {
            title: 'Network Security Essentials',
            authors: 'William Stallings',
            year: 2023,
            type: 'BOOK',
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        title: 'Network Security and Monitoring',
        description:
          'Network protocols, vulnerability assessment, and intrusion detection',
        teachingMethods: ['Lecture', 'Live Demonstrations', 'Tool Analysis'],
        hours: 8,
        weekNumber: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        title: 'Ethical Hacking Methodologies',
        description:
          'Penetration testing frameworks, vulnerability exploitation, and reporting',
        teachingMethods: ['Lecture', 'Security Lab', 'Ethical Discussions'],
        hours: 8,
        weekNumber: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],

    laboratoryContent: [
      {
        id: '1',
        title: 'Security Tools and Environments',
        description:
          'Setting up security testing environments and essential tools',
        teachingMethods: ['Guided Practice', 'Tool Configuration'],
        hours: 4,
        weekNumber: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        title: 'Network Attack and Defense',
        description:
          'Implementing attacks and defenses in controlled environments',
        teachingMethods: ['Hands-on Exercise', 'Defense Strategy Development'],
        hours: 6,
        weekNumber: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],

    bibliography: {
      required: [
        {
          title: 'Practical Malware Analysis',
          authors: 'Michael Sikorski, Andrew Honig',
          year: 2023,
          type: 'BOOK',
          isbn: '978-1-593-27290-6',
        },
        {
          title: 'The Web Application Hackers Handbook',
          authors: 'Dafydd Stuttard, Marcus Pinto',
          year: 2023,
          type: 'BOOK',
          isbn: '978-1-118-02647-2',
        },
      ],
      recommended: [
        {
          title: 'Blue Team Field Manual',
          authors: 'Alan J. White, Ben Clark',
          year: 2023,
          type: 'BOOK',
        },
      ],
      online: [
        {
          title: 'OWASP Top Ten',
          authors: 'OWASP Foundation',
          url: 'https://owasp.org/www-project-top-ten/',
          type: 'ONLINE',
        },
        {
          title: 'NIST Cybersecurity Framework',
          authors: 'NIST',
          url: 'https://www.nist.gov/cyberframework',
          type: 'ONLINE',
        },
      ],
    },

    prerequisites: {
      requiredDisciplines: [
        {
          code: 'IE340',
          name: 'Computer Networks',
        },
        {
          code: 'IE345',
          name: 'Operating Systems Security',
        },
      ],
      requiredSkills: [
        'Strong networking fundamentals',
        'Linux system administration',
        'Programming proficiency',
        'Understanding of protocols',
      ],
      recommendations: [
        'Experience with system administration',
        'Knowledge of scripting languages',
        'Familiarity with virtualization',
      ],
    },

    learningOutcomes: [
      {
        id: '1',
        category: LearningOutcomeCategory.KNOWLEDGE,
        description: 'Understanding security principles and threats',
        outcomes: [
          'Comprehend modern security challenges and solutions',
          'Understand attack vectors and defense mechanisms',
          'Master security assessment methodologies',
          'Grasp ethical implications of security testing',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        category: LearningOutcomeCategory.SKILLS,
        description: 'Practical security implementation capabilities',
        outcomes: [
          'Conduct thorough security assessments',
          'Implement robust defense strategies',
          'Use professional security tools effectively',
          'Develop secure network architectures',
          'Create comprehensive security reports',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],

    evaluationSystem: {
      components: [
        {
          id: '1',
          type: TeachingActivityType.LABORATORY,
          evaluationCriteria: [
            'Security assessment methodology',
            'Tool proficiency and proper usage',
            'Defense strategy effectiveness',
            'Documentation and reporting quality',
            'Ethical considerations',
          ],
          evaluationMethods: [
            'Practical security assessment',
            'Defense implementation',
            'Technical documentation',
            'Ethics compliance',
          ],
          weightInFinalGrade: 60,
          minimumGrade: 5,
          description:
            'Complete security assessment project with defense implementation',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          type: TeachingActivityType.COURSE,
          evaluationCriteria: [
            'Understanding of security concepts',
            'Threat analysis capabilities',
            'Defense strategy design',
            'Ethical decision-making',
          ],
          evaluationMethods: ['Written exam', 'Case study analysis'],
          weightInFinalGrade: 40,
          minimumGrade: 5,
          description: 'Theoretical examination and practical analysis',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      minimumRequirements: [
        'Minimum grade of 5 for each component',
        'Attendance at 85% of laboratory sessions',
        'Completion of all security exercises',
        'Adherence to ethical guidelines',
        'Comprehensive security project documentation',
      ],
      additionalNotes:
        'All security testing must be conducted in approved environments only',
      makeupExamConditions: [
        'Makeup exam includes both theoretical and practical components',
        'Additional security exercise completion may be required',
      ],
    },
  },
];
