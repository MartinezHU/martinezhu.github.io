/**
 * Modelo para representar una tecnología o herramienta en el stack
 */
export interface TechStack {
  id?: string;
  name: string;
  category: TechCategory;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  logo?: string;
  yearsOfExperience?: number;
  description?: string;
}

/**
 * Categorías disponibles para las tecnologías
 */
export type TechCategory = 
  | 'frontend'
  | 'backend'
  | 'mobile'
  | 'data-ai'
  | 'big-data'
  | 'database'
  | 'devops'
  | 'tools'
  | 'other';

/**
 * Agrupación de tecnologías por categoría
 */
export interface TechStackGroup {
  category: TechCategory;
  displayName: string;
  technologies: TechStack[];
}
