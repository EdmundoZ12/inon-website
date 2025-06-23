export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  position?: string;
  service: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  subject: string;
  message: string;
  acceptTerms: boolean;
  allowMarketing: boolean;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  ticketId?: string;
  timestamp?: Date;
}

export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  businessHours: string;
  emergencyHours: string;
}

export interface ServiceOption {
  value: string;
  label: string;
  description?: string;
}

export interface ProjectType {
  value: string;
  label: string;
  icon?: string;
}

export interface BudgetRange {
  value: string;
  label: string;
  min?: number;
  max?: number;
}
