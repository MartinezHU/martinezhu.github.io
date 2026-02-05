import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { Hero } from '../../components/shared/hero/hero';
import { TranslateModule } from '@ngx-translate/core';
import { I18nService } from '../../services/i18n.service';
import { GitHubService } from '../../services/github.service';
import { NavigationService } from '../../services/navigation.service';
import { Project } from '../../models';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, Hero, TranslateModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  currentLanguage: string = 'es';
  projects: Project[] = [];

  constructor(
    public i18nService: I18nService,
    private githubService: GitHubService,
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller
  ) {
    this.currentLanguage = this.i18nService.getCurrentLanguage();
  }

  ngOnInit() {
    // Manejar navegación con fragments (ej: /#projects)
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        // Usar setTimeout para asegurar que el DOM esté renderizado
        setTimeout(() => {
          this.viewportScroller.scrollToAnchor(fragment);
        }, 100);
        // Guardar en el servicio la sección actual
        this.navigationService.setLastSection(fragment);
      }
    });

    // Suscribirse a cambios de idioma
    this.i18nService.currentLanguage$.subscribe((lang) => {
      this.currentLanguage = lang;
    });

    // Cargar proyectos destacados desde GitHub
    this.githubService.getRepos().subscribe({
      next: (allProjects) => {
        // Mostrar solo los primeros 3 proyectos destacados
        this.projects = allProjects.filter(p => p.featured).slice(0, 3);
      },
      error: (error) => {
        console.error('Error al cargar proyectos:', error);
        this.projects = [];
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
   * Obtener descripción del proyecto según idioma actual
   */
  getProjectDescription(project: Project): string {
    return this.currentLanguage === 'es' ? project.description : (project.descriptionEn || project.description);
  }

  /**
   * Guarda la sección actual antes de navegar
   */
  saveSection(section: string): void {
    this.navigationService.setLastSection(section);
  }
}
