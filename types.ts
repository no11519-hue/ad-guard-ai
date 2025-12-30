// Define core types for advertising compliance analysis
export interface Risk {
  word: string;
  reason: string;
}

export interface PremiumContent {
  instagram: string;
  youtube: string;
  naverBlog: string;
  landingPage: string[];
}

export interface AnalysisResult {
  label: string;
  risks: Risk[];
  safetyAlternative: string;
  premium?: PremiumContent;
}
