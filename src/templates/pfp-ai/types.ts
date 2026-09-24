
export interface DamageCategory {
  name: string;
  severity: number;
  confidence: number;
  notes?: string;
}

export interface DamageAssessment {
  overall_quality_score: number;
  confidence: number;
  damage_categories: DamageCategory[];
  recommended_second_pass_prompt: string;
}

export interface ImageAsset {
  id: string;
  originalUrl: string; // Data URL for display
  originalBase64: string; // Raw base64 for API
  restoredUrl?: string;
  restoredBase64?: string;
  assessment?: DamageAssessment;
  status: 'uploading' | 'pending' | 'analyzing' | 'restoring' | 'ready' | 'failed';
  progress: number; // 0-100
  log: string[];
}

export enum AspectRatio {
  PORTRAIT = '3:4',
  LANDSCAPE = '4:3',
  CINEMATIC = '16:9',
}

export enum BackgroundStyle {
  BLACK = 'black',
  GRAY = 'gray',
  BEIGE = 'beige',
  GRADIENT = 'gradient',
  BROWN = 'brown',
  BOKEH = 'bokeh',
}

export type ProcessingState = 'idle' | 'processing' | 'complete' | 'error';
