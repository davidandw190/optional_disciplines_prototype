// Enum for enrollment statuses
export enum EnrollmentStatusType {
  ENROLLED = 'ENROLLED',
  WAITLISTED = 'WAITLISTED',
  FAILED = 'FAILED',
}

// Request types
export interface EnrollmentValidationRequest {
  studentId: string;
  disciplineId: string;
  packetId: string;
}

export interface EnrollmentRequest extends EnrollmentValidationRequest {
  validationId: string;
}

// Validation types
export interface EnrollmentValidationErrors {
  prerequisites?: string[];
  credits?: string[];
  scheduling?: string[];
  capacity?: string;
  general?: string;
}

export interface EnrollmentValidation {
  isValid: boolean;
  errors: EnrollmentValidationErrors;
}

export interface EnrollmentValidationResponse {
  isValid: boolean;
  errors: EnrollmentValidationErrors;
  waitlistPosition?: number;
  estimatedProcessingTime: number;
}

export interface EnrollmentSimulationResponse {
  success: boolean;
  waitlistPosition?: number;
  validationResult: EnrollmentValidation;
  estimatedProcessingTime: number;
}

// Response types
export interface EnrollmentStatus {
  status: EnrollmentStatusType;
  enrollmentId?: string;
  waitlistPosition?: number;
  timestamp: string;
  nextSteps: string[];
}

export interface EnrollmentConfirmation {
  enrollmentId: string;
  status: EnrollmentStatusType;
  timestamp: string;
  waitlistPosition?: number;
  nextSteps: string[];
}

// State types
export type ProcessStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface EnrollmentState {
  validationStatus: ProcessStatus;
  enrollmentStatus: ProcessStatus;
  validation: EnrollmentValidationResponse | null;
  enrollment: EnrollmentStatus | null;
  error: string | null;
}
