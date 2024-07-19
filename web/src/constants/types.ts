export interface DevOption {
  name: string;
  designation: string;
}

export interface Lead {
  ID: string;
  Job_Title: string;
  Lead: string;
  BD: string;
  Dev: string | null;
  Status: string;
  InterviewStage: string[];
  description: string;
  resume: string | null;
}

export interface AddLeadProps {
  onAddLead: (newLead: Omit<Lead, 'ID'>) => void;
  onCancel: () => void;
}

export interface LeadsTableDataProps {
  rows: Lead[];
}
export interface Developer {
  Name: string;
  Phone: string;
  Email: string;
  Designation: string;
  TechnicalSkills: string;
}

export interface AddDeveloperProps {
  onAddDeveloper: (newDeveloper: Developer) => void;
  onCancel: () => void;
}

export interface DeveloperTableProps {
  rows: Developer[];
}

export interface BusinessDeveloper {
  Name: string;
  Phone: string;
  Email: string;
  Designation: string;
  AdditionalInfo: string;
}

export interface AddBusinessDeveloperProps {
  onAddBusinessDeveloper: (businessDeveloper: BusinessDeveloper) => void;
  onCancel: () => void;
}

export interface BusinessDeveloperTableProps {
  rows: BusinessDeveloper[];
}

export interface RowProps {
  row: BusinessDeveloper;
}
