import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { I18nService } from '../../services/i18n.service';
import { ProjectsDataService } from '../../services/projects-data.service';
import { NavigationService } from '../../services/navigation.service';
import { Project } from '../../models';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnInit, AfterViewInit {
  currentLanguage: string = 'es';
  projects: Project[] = [];
  loading: boolean = true;
  lastSection: string = 'top';

  constructor(
    private viewportScroller: ViewportScroller,
    public i18nService: I18nService,
    private projectsDataService: ProjectsDataService,
    private navigationService: NavigationService
  ) {
    this.currentLanguage = this.i18nService.getCurrentLanguage();
    this.lastSection = this.navigationService.getLastSection();
  }

  ngOnInit() {
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
    this.projectsDataService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar proyectos:', error);
        this.loading = false;
        this.projects = [];
      }
    });
  }

  /**
   * Se ejecuta después de que el DOM esté completamente renderizado
   */
  ngAfterViewInit() {
    // El router ya hace scroll al top automáticamente
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
