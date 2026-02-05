/**
 * Modelo para representar certificaciones profesionales
 */
export interface Certification {
  id?: string;
  title: string;
  titleEn?: string; // Título en inglés para billingüe
  issuer: string; // Organización que emite la certificación
  issuedDate: Date;
  expiryDate?: Date; // Fecha de vencimiento (opcional)
  credentialId?: string; // ID de la credencial
  credentialUrl?: string; // URL para verificar la credencial
  logo?: string;
  description?: string;
  descriptionEn?: string; // Descripción en inglés
  category?: CertificationCategory;
}

/**
 * Categorías de certificaciones
 */
export type CertificationCategory = 
  | 'cloud'        // AWS, Azure, GCP, etc.
  | 'programming'  // Lenguajes y programación
  | 'framework'    // Frameworks (Angular, React, etc.)
  | 'devops'       // DevOps y CI/CD
  | 'security'     // Seguridad y ciberseguridad
  | 'agile'        // Metodologías ágiles
  | 'other';       // Otras

/**
 * Modelo para agrupar certificaciones por categoría
 */
export interface CertificationGroup {
  category: CertificationCategory;
  displayName: string;
  certifications: Certification[];
}
