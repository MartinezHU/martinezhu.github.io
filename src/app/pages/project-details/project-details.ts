import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { I18nService } from '../../services/i18n.service';
import { ProjectsDataService } from '../../services/projects-data.service';
import { NavigationService } from '../../services/navigation.service';
import { Project } from '../../models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-project-details',
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './project-details.html',
  styleUrl: './project-details.scss',
})
export class ProjectDetails implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  currentLanguage: string = 'es';
  project: Project | undefined;
  projects: Project[] = [];
  lastSection: string = 'top';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public i18nService: I18nService,
    private projectsDataService: ProjectsDataService,
    private navigationService: NavigationService
  ) {
    this.currentLanguage = this.i18nService.getCurrentLanguage();
    // Siempre vuelve a proyectos desde los detalles
    this.lastSection = 'projects';
    this.navigationService.setLastSection('projects');
  }

  ngOnInit() {
    // Suscribirse a cambios de idioma
    this.i18nService.currentLanguage$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((lang) => {
        this.currentLanguage = lang;
      });

    // Cargar proyectos y luego buscar el proyecto específico
    this.projectsDataService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.loadProject();
      },
      error: (error) => {
        console.error('Error al cargar proyectos:', error);
        this.router.navigate(['/projects']);
      }
    });
  }

  /**
   * Cargar el proyecto específico basado en el ID de la ruta
   */
  loadProject(): void {
    this.route.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
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
