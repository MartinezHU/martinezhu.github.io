import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { I18nService } from '../../services/i18n.service';
import { Project } from '../../models';

@Component({
  selector: 'app-project-details',
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './project-details.html',
  styleUrl: './project-details.scss',
})
export class ProjectDetails implements OnInit {
  currentLanguage: string = 'es';
  project: Project | undefined;

  // Array de proyectos (mismo que en projects.ts)
  projects: Project[] = [
    {
      id: '1',
      title: 'Gestor de Tareas',
      titleEn: 'Task Manager',
      description: 'Aplicación web para gestionar tareas y proyectos personales',
      descriptionEn: 'Web application to manage personal tasks and projects',
      longDescription: 'Una completa aplicación de gestión de tareas con soporte para crear proyectos, asignar tareas, establecer prioridades y fechas de vencimiento. Incluye filtrado, búsqueda y estadísticas de productividad.',
      longDescriptionEn: 'A comprehensive task management application with support for creating projects, assigning tasks, setting priorities and due dates. Includes filtering, search, and productivity statistics.',
      technologies: ['Angular', 'TypeScript', 'Bulma CSS', 'RxJS'],
      featured: true,
      repoUrl: 'https://github.com/MartinezHU/task-manager',
      demoUrl: 'https://task-manager-demo.vercel.app',
      startDate: new Date(2024, 0, 1),
      endDate: new Date(2024, 3, 1),
      status: 'completed',
      category: 'web',
    },
    {
      id: '2',
      title: 'API REST con Python',
      titleEn: 'REST API with Python',
      description: 'API RESTful desarrollada con Django y Django REST Framework',
      descriptionEn: 'RESTful API developed with Django and Django REST Framework',
      longDescription: 'API completa con autenticación JWT, validación de datos, paginación y documentación automática con Swagger. Soporta CORS y está optimizada para producción.',
      longDescriptionEn: 'Complete API with JWT authentication, data validation, pagination, and automatic documentation with Swagger. Supports CORS and is optimized for production.',
      technologies: ['Python', 'Django', 'Django REST Framework', 'PostgreSQL', 'JWT'],
      featured: true,
      repoUrl: 'https://github.com/MartinezHU/rest-api-python',
      startDate: new Date(2023, 6, 1),
      endDate: new Date(2023, 11, 1),
      status: 'completed',
      category: 'web',
    },
    {
      id: '3',
      title: 'App Móvil Flutter',
      titleEn: 'Flutter Mobile App',
      description: 'Aplicación móvil multiplataforma con Flutter',
      descriptionEn: 'Cross-platform mobile application with Flutter',
      longDescription: 'Aplicación móvil para Android e iOS con interfaz moderna, integración con APIs externas y base de datos local con SQLite. Incluye autenticación y notificaciones push.',
      longDescriptionEn: 'Mobile application for Android and iOS with modern interface, integration with external APIs, and local database with SQLite. Includes authentication and push notifications.',
      technologies: ['Flutter', 'Dart', 'Firebase', 'SQLite'],
      featured: true,
      repoUrl: 'https://github.com/MartinezHU/flutter-app',
      startDate: new Date(2023, 3, 1),
      endDate: new Date(2023, 8, 1),
      status: 'completed',
      category: 'mobile',
    },
    {
      id: '4',
      title: 'Librería Angular',
      titleEn: 'Angular Library',
      description: 'Librería de componentes reutilizables para Angular',
      descriptionEn: 'Library of reusable components for Angular',
      longDescription: 'Colección de componentes Angular de alta calidad, completamente documentados y con ejemplos. Incluye componentes de formularios, tablas, modales y más.',
      longDescriptionEn: 'Collection of high-quality Angular components, fully documented with examples. Includes form components, tables, modals, and more.',
      technologies: ['Angular', 'TypeScript', 'Storybook', 'npm'],
      featured: false,
      repoUrl: 'https://github.com/MartinezHU/angular-components-lib',
      startDate: new Date(2023, 0, 1),
      status: 'in-progress',
      category: 'library',
    },
    {
      id: '5',
      title: 'Web Personal',
      titleEn: 'Personal Website',
      description: 'Portafolio personal con información profesional',
      descriptionEn: 'Personal portfolio with professional information',
      longDescription: 'Mi portafolio personal desarrollado con Angular, mostrando proyectos, habilidades, educación y certificaciones. Completamente traducido a español e inglés.',
      longDescriptionEn: 'My personal portfolio developed with Angular, showcasing projects, skills, education, and certifications. Fully translated into Spanish and English.',
      technologies: ['Angular', 'TypeScript', 'SCSS', 'i18n'],
      featured: true,
      repoUrl: 'https://github.com/MartinezHU/web-personal',
      demoUrl: 'https://hectordev.com',
      status: 'in-progress',
      category: 'web',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewportScroller: ViewportScroller,
    public i18nService: I18nService,
    private translateService: TranslateService
  ) {
    this.currentLanguage = this.i18nService.getCurrentLanguage();
  }

  ngOnInit() {
    // Scroll a la parte superior de la página
    this.viewportScroller.scrollToPosition([0, 0]);

    // Suscribirse a cambios de idioma
    this.i18nService.currentLanguage$.subscribe((lang) => {
      this.currentLanguage = lang;
    });

    // Obtener ID del proyecto de los parámetros de ruta
    this.route.params.subscribe((params) => {
      const projectId = params['id'];
      this.project = this.projects.find((p) => p.id === projectId);

      if (!this.project) {
        // Redirigir a proyectos si no existe
        this.router.navigate(['/projects']);
      }
    });
  }

  /**
   * Obtener título del proyecto según idioma actual
   */
  getProjectTitle(project: Project): string {
    return this.currentLanguage === 'es' ? project.title : (project.titleEn || project.title);
  }

  /**
   * Obtener descripción larga del proyecto según idioma actual
   */
  getProjectLongDescription(project: Project): string {
    return this.currentLanguage === 'es' ? (project.longDescription || project.description) : (project.longDescriptionEn || project.descriptionEn || project.description);
  }

  /**
   * Obtener proyectos relacionados (misma categoría)
   */
  getRelatedProjects(): Project[] {
    if (!this.project) return [];
    return this.projects.filter((p) => p.category === this.project!.category && p.id !== this.project!.id).slice(0, 3);
  }

  /**
   * Navegar a otro proyecto
   */
  navigateToProject(projectId: string | undefined) {
    if (projectId) {
      this.router.navigate(['/projects', projectId]);
    }
  }
}
