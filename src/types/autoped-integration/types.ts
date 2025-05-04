export interface Faculty {
  name: string;
  departments: Department[];
}

export interface Department {
  name: string;
  teachers: Teacher[];
  studyProgrammes: StudyProgramme[];
}

export interface Teacher {
  email: string;
  firstName: string;
  lastName: string;
}

export enum Field {
  COMPUTER_SCIENCE = 'COMPUTER_SCIENCE',
  MATHEMATICS = 'MATHEMATICS',
  UNKNOWN = 'UNKNOWN',
}

export enum Cycle {
  BACHELOR = 'BACHELOR',
  MASTER = 'MASTER',
  PHD = 'PHD',
}

export interface StudyProgramme {
  acronym: string;
  name: string;
  field: Field;
  cycle: Cycle;
  qualification: Qualification[];
  studyPlans: StudyPlan[];
}

export interface ESCODetails {
  code: string;
  competences: string[];
  knowledge: string[];
  skills: string[];
  responsibility: string[];
}

export interface Qualification {
  title: string;
  details: ESCODetails;
}

export interface SuperSubject {
  id: string;
  name: string;
}

export enum ChoiceType {
  M = 'MANDATORY',
  E = 'ELECTIVE',
  DO = 'DISCIPLINA_OBLIGATORIE',
  DOP = 'DISCIPLINA_OPTIONALA',
  DF = 'DISCIPLINA_FACULTATIVA',
  O = 'OPTIONAL',
}

export enum Kind {
  DC = 'DISCIPLINA_COMPLEMENTARA',
  DS = 'DISCIPLINA_DE_SPECIALITATE',
  DF = 'DISCIPLINA_FUNDAMENTALA',
}

export interface Subject {
  id: number;
  superSubject: SuperSubject;
  name: string;
  studyProgramme: string;
  year: number;
  semester: number;
  credits: number;
  numberOfWeeks: number;
  lectureHoursPerWeek: number;
  seminarHoursPerWeek: number;
  labHoursPerWeek: number;
  practicalHoursPerWeek: number;
  choice: ChoiceType;
  kind: Kind;
  packageNumber: number;
}

export interface Elective {
  choices: Subject[];
}

export interface SemesterPlan {
  totalCredits: number;
  totalLectureHoursPerWeek: number;
  totalSeminarHoursPerWeek: number;
  totalLabHoursPerWeek: number;
  totalPracticeHoursPerWeek: number;
  totalHoursPerWeek: number;
  mandatory: Subject[];
  optional: Subject[];
  elective: Record<number, Elective>;
}

export interface StudyPlan {
  id: string;
  studyProgramme: string;
  validFromYear: number;
  validToYear: number;
  subjects: (SemesterPlan | null)[]; //  usual length 6, one per semester
}

export function addSubjectToStudyPlan(plan: StudyPlan, subject: Subject): void {
  const year = subject.year;
  const semester = subject.semester;
  const position = (year - 1) * 2 + (semester - 1);

  if (position < 0) {
    return;
  }

  if (!plan.subjects[position]) {
    plan.subjects[position] = {
      totalCredits: 0,
      totalLectureHoursPerWeek: 0,
      totalSeminarHoursPerWeek: 0,
      totalLabHoursPerWeek: 0,
      totalPracticeHoursPerWeek: 0,
      totalHoursPerWeek: 0,
      mandatory: [],
      optional: [],
      elective: {},
    };
  }

  const semesterPlan = plan.subjects[position]!;

  if (subject.choice === ChoiceType.DO) {
    semesterPlan.mandatory.push(subject);
  } else if (subject.choice === ChoiceType.DF) {
    semesterPlan.optional.push(subject);
  } else if (subject.choice === ChoiceType.DOP) {
    if (!semesterPlan.elective[subject.packageNumber]) {
      semesterPlan.elective[subject.packageNumber] = { choices: [] };
    }
    semesterPlan.elective[subject.packageNumber].choices.push(subject);
  }
}

export function getAllSubjectsFromStudyPlan(plan: StudyPlan): Subject[] {
  const result: Subject[] = [];

  for (const semesterPlan of plan.subjects) {
    if (!semesterPlan) continue;

    result.push(...semesterPlan.mandatory);
    result.push(...semesterPlan.optional);

    for (const electivePackage of Object.values(semesterPlan.elective)) {
      result.push(...electivePackage.choices);
    }
  }

  return result;
}

export function computeTotalCreditsAndHours(plan: StudyPlan): void {
  for (const semesterPlan of plan.subjects) {
    if (!semesterPlan) continue;

    let totalCredits = 0;
    let totalLectureHoursPerWeek = 0;
    let totalSeminarHoursPerWeek = 0;
    let totalLabHoursPerWeek = 0;
    let totalPracticalHoursPerWeek = 0;

    for (const subject of semesterPlan.mandatory) {
      totalCredits += subject.credits;
      totalLectureHoursPerWeek += subject.lectureHoursPerWeek;
      totalSeminarHoursPerWeek += subject.seminarHoursPerWeek;
      totalLabHoursPerWeek += subject.labHoursPerWeek;
      totalPracticalHoursPerWeek += subject.practicalHoursPerWeek;
    }

    for (const [, elective] of Object.entries(semesterPlan.elective)) {
      if (elective.choices.length > 0) {
        const firstChoice = elective.choices[0];
        totalCredits += firstChoice.credits;
        totalLectureHoursPerWeek += firstChoice.lectureHoursPerWeek;
        totalSeminarHoursPerWeek += firstChoice.seminarHoursPerWeek;
        totalLabHoursPerWeek += firstChoice.labHoursPerWeek;
        totalPracticalHoursPerWeek += firstChoice.practicalHoursPerWeek;
      }
    }

    semesterPlan.totalCredits = totalCredits;
    semesterPlan.totalLectureHoursPerWeek = totalLectureHoursPerWeek;
    semesterPlan.totalSeminarHoursPerWeek = totalSeminarHoursPerWeek;
    semesterPlan.totalLabHoursPerWeek = totalLabHoursPerWeek;
    semesterPlan.totalPracticeHoursPerWeek = totalPracticalHoursPerWeek;
    semesterPlan.totalHoursPerWeek =
      totalLectureHoursPerWeek +
      totalSeminarHoursPerWeek +
      totalLabHoursPerWeek +
      totalPracticalHoursPerWeek;
  }
}

export function getCanonicalForm(name: string): string {
  const tokens = name.toLowerCase().split(' ');
  const result: string[] = [];

  for (const token of tokens) {
    if (token !== 'and' && !token.match(/^[iv]+$/)) {
      result.push(token.charAt(0).toUpperCase() + token.slice(1));
    } else if (token.match(/^[iv]+$/)) {
      result.push(token.toUpperCase());
    } else {
      result.push(token);
    }
  }

  return result.join(' ');
}

export function transformNameToCanonicalForm(subject: Subject): void {
  subject.name = getCanonicalForm(subject.name);
}
