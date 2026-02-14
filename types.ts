
export enum Language {
  EN = 'en',
  UR = 'ur',
  ROMAN = 'roman'
}

export interface UserProfile {
  name?: string;
  cnic?: string;
  age: number;
  district: string;
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widow';
  childrenCount: number;
  isEmployed: boolean;
}

export interface NikkahNamaHotspot {
  id: number;
  label: string;
  urduLabel: string;
  description: string;
}

export interface SwarmResult {
  advocate: {
    analysis: string;
    safetyScore: number;
    riskLevel: 'Low' | 'Medium' | 'High';
    stats: string;
    legalRoadmap: string[];
  };
  shariaExpert: {
    context: string;
    principles: string[];
    guidance: string;
  };
  healthAgent?: {
    recommendations: string[];
    priorityLevel: string;
  };
  ngoBridge: {
    recommendedNgo: {
      name: string;
      contact: string;
      reason: string;
    };
  };
}
