import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Hero } from '../../components/shared/hero/hero';
import { TranslateModule } from '@ngx-translate/core';
import { I18nService } from '../../services/i18n.service';
import { Project } from '../../models';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, Hero, TranslateModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  currentLanguage: string = 'es';

  // Array de proyectos destacados
  projects: Project[] = [
    {
      id: '1',
      title: 'Gestor de Tareas',
      titleEn: 'Task Manager',
      description: 'Aplicación web para gestionar tareas y proyectos personales',
      descriptionEn: 'Web application to manage personal tasks and projects',
      technologies: ['Angular', 'TypeScript', 'Bulma CSS', 'RxJS'],
      featured: true,
      repoUrl: 'https://github.com/MartinezHU/task-manager',
      demoUrl: 'https://task-manager-demo.vercel.app',
      status: 'completed',
      category: 'web',
    },
    {
      id: '2',
      title: 'API REST con Python',
      titleEn: 'REST API with Python',
      description: 'API RESTful desarrollada con Django y Django REST Framework',
      descriptionEn: 'RESTful API developed with Django and Django REST Framework',
      technologies: ['Python', 'Django', 'Django REST Framework', 'PostgreSQL', 'JWT'],
      featured: true,
      repoUrl: 'https://github.com/MartinezHU/rest-api-python',
      status: 'completed',
      category: 'web',
    },
    {
      id: '3',
      title: 'App Móvil Flutter',
      titleEn: 'Flutter Mobile App',
      description: 'Aplicación móvil multiplataforma con Flutter',
      descriptionEn: 'Cross-platform mobile application with Flutter',
      technologies: ['Flutter', 'Dart', 'Firebase', 'SQLite'],
      featured: true,
      repoUrl: 'https://github.com/MartinezHU/flutter-app',
      status: 'completed',
      category: 'mobile',
    },
  ];

  constructor(public i18nService: I18nService) {
    this.currentLanguage = this.i18nService.getCurrentLanguage();
  }

  ngOnInit() {
    // Suscribirse a cambios de idioma
    this.i18nService.currentLanguage$.subscribe((lang) => {
      this.currentLanguage = lang;
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
}
