import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { I18nService } from '../../services/i18n.service';
import { GitHubService } from '../../services/github.service';
import { Project } from '../../models';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnInit {
  currentLanguage: string = 'es';
  projects: Project[] = [];
  loading: boolean = true;

  constructor(
    private viewportScroller: ViewportScroller,
    public i18nService: I18nService,
    private translateService: TranslateService,
    private githubService: GitHubService
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

    // Cargar repositorios desde GitHub
    this.loadProjects();
  }

  /**
   * Cargar proyectos desde GitHub
   */
  loadProjects(): void {
    this.loading = true;
    this.githubService.getRepos().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar proyectos:', error);
        this.loading = false;
        // Cargar proyectos de ejemplo en caso de error
        this.loadFallbackProjects();
      }
    });
  }

  /**
   * Cargar proyectos de ejemplo (fallback)
   */
  loadFallbackProjects(): void {
    this.projects = [
      {
        id: '1',
        title: 'Gestor de Tareas',
        titleEn: 'Task Manager',
        description: 'Aplicación web para gestionar tareas y proyectos personales',
        descriptionEn: 'Web application to manage personal tasks and projects',
        longDescription: 'Una completa aplicación de gestión de tareas con soporte para crear proyectos, asignar tareas, establecer prioridades y fechas de vencimiento.',
        longDescriptionEn: 'A comprehensive task management application with support for creating projects, assigning tasks, setting priorities and due dates.',
        technologies: ['Angular', 'TypeScript', 'Bulma CSS', 'RxJS'],
        featured: true,
        repoUrl: 'https://github.com/MartinezHU',
        startDate: new Date(2024, 0, 1),
        endDate: new Date(2024, 3, 1),
        status: 'completed',
        category: 'web',
      },
    ];
  }

  /**
   * Obtener título del proyecto según idioma actual
   */
  getProjectTitle(project: Project): string {
    return this.currentLanguage === 'es' ? project.title : (project.titleEn || project.title);
  }

  /**
   * Obtener descripción del proyecto según idioma actual
   */
  getProjectDescription(project: Project): string {
    return this.currentLanguage === 'es' ? project.description : (project.descriptionEn || project.description);
  }

  /**
   * Obtener proyectos destacados
   */
  getFeaturedProjects(): Project[] {
    return this.projects.filter((p) => p.featured);
  }
}
