/**
 * Modelo para representar un proyecto o repositorio
 */
export interface Project {
  id?: string;
  title: string;
  titleEn?: string; // Título en inglés para bilingüe
  description: string;
  descriptionEn?: string; // Descripción en inglés
  longDescription?: string; // Descripción larga para la página de detalles
  longDescriptionEn?: string;
  technologies: string[]; // Tecnologías usadas: ['Angular', 'TypeScript', 'Node.js']
  image?: string; // URL de imagen del proyecto
  featured?: boolean; // Si se muestra en home
  repoUrl?: string; // URL del repositorio en GitHub
  demoUrl?: string; // URL de demostración en vivo
  startDate?: Date;
  endDate?: Date;
  status?: 'completed' | 'in-progress' | 'planned'; // Estado del proyecto
  category?: ProjectCategory;
}

/**
 * Categorías de proyectos
 */
export type ProjectCategory =
  | 'web'      // Aplicaciones web
  | 'mobile'   // Aplicaciones móviles
  | 'desktop'  // Aplicaciones de escritorio
  | 'library'  // Librerías/paquetes
  | 'tool'     // Herramientas
  | 'other';   // Otros
