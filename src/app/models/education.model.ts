/**
 * Modelo para representar formación académica
 */
export interface Education {
  id?: string;
  title: string;
  titleEn?: string; // Título en inglés para billingüe
  institution: string;
  startYear: number;
  endYear: number;
  educationType: EducationType;
  description?: string;
  descriptionEn?: string; // Descripción en inglés
  grade?: string; // Nota final o GPA
  logo?: string;
  url?: string; // Link a la institución o certificado
}

/**
 * Tipos de educación disponibles
 */
export type EducationType = 
  | 'degree'         // Grado/Licenciatura
  | 'master'         // Master/Posgrado
  | 'bootcamp'       // Bootcamp
  | 'course'         // Curso
  | 'diploma'        // Diploma
  | 'certification';  // Certificación

/**
 * Modelo para agrupar educación por tipo
 */
export interface EducationGroup {
  type: EducationType;
  displayName: string;
  items: Education[];
}
