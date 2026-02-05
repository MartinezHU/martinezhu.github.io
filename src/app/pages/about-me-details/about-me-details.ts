import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { TechStack, TechCategory, Education, EducationType, Certification, CertificationCategory } from '../../models';

@Component({
  selector: 'app-about-me-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './about-me-details.html',
  styleUrl: './about-me-details.scss',
})
export class AboutMeDetails implements OnInit {
  constructor(private viewportScroller: ViewportScroller) {}

  ngOnInit() {
    // Scroll a la parte superior de la página
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  // Stack de tecnologías - reemplazar con datos reales
  techStack: TechStack[] = [
    { name: 'Angular', category: 'frontend', level: 'advanced', description: 'Aplicaciones web SPA' },
    { name: 'Vue.js', category: 'frontend', level: 'intermediate', description: 'Interfaces web modernas' },
    { name: 'TypeScript', category: 'frontend', level: 'advanced', description: 'Tipado estático en frontend' },
    { name: 'Flutter', category: 'mobile', level: 'intermediate', description: 'Apps móviles multiplataforma' },
    { name: 'Python', category: 'backend', level: 'advanced', description: 'Django y Django REST Framework (DRF)' },
    { name: '.NET (C#)', category: 'backend', level: 'intermediate', description: 'APIs REST' },
    { name: 'REST APIs', category: 'backend', level: 'advanced', description: 'DRF y buenas prácticas' },
    { name: 'JWT', category: 'backend', level: 'intermediate', description: 'Autenticación y autorización' },
    { name: 'OAuth2', category: 'backend', level: 'intermediate', description: 'Flujos de autenticación' },
    { name: 'BaaS Integration', category: 'backend', level: 'intermediate', description: 'Integración con servicios BaaS' },
    { name: 'MySQL', category: 'database', level: 'intermediate' },
    { name: 'PostgreSQL', category: 'database', level: 'intermediate' },
    { name: 'SQL Server', category: 'database', level: 'intermediate' },
    { name: 'MongoDB', category: 'database', level: 'intermediate' },
    { name: 'Firebase', category: 'database', level: 'intermediate' },
    { name: 'Docker', category: 'devops', level: 'intermediate' },
    { name: 'Windows Server', category: 'devops', level: 'intermediate' },
    { name: 'Ubuntu Server', category: 'devops', level: 'intermediate' },
    { name: 'Entornos de desarrollo', category: 'devops', level: 'intermediate' },
    { name: 'Seguridad básica', category: 'other', level: 'intermediate', description: 'Buenas prácticas de Google' },
    { name: 'SOLID', category: 'tools', level: 'advanced', description: 'Principios de diseño' },
    { name: 'DRY / KISS / YAGNI', category: 'tools', level: 'advanced', description: 'Código limpio y mantenible' },
    { name: 'State Management', category: 'tools', level: 'intermediate', description: 'Gestión de estado global' },
  ];

  // Formación académica - reemplazar con datos reales
  education: Education[] = [
    {
      title: 'Inteligencia Artificial y Big Data',
      institution: 'IES Polígono Sur',
      startYear: 2025,
      endYear: 2026,
      educationType: 'degree',
      description: 'En curso',
    },
    {
      title: 'Desarrollo de Aplicaciones Web',
      institution: 'IES Polígono Sur',
      startYear: 2021,
      endYear: 2023,
      educationType: 'degree',
    },
    {
      title: 'Sistemas Microinformáticos y Redes',
      institution: 'IES Polígono Sur',
      startYear: 2019,
      endYear: 2021,
      educationType: 'degree',
    },
  ];

  // Certificaciones - reemplazar con datos reales
  certifications: Certification[] = [
    {
      title: 'Java EE / Spring Boot',
      issuer: 'IPartek Formación',
      issuedDate: new Date(2025, 9, 1),
      category: 'framework',
    },
    {
      title: 'Certificado Profesional de Ciberseguridad',
      issuer: 'Coursera / Google',
      issuedDate: new Date(2025, 6, 1),
      category: 'security',
    },
    {
      title: 'Realidad Virtual y Aumentada',
      issuer: 'Integra Conocimiento & Innovación',
      issuedDate: new Date(2025, 3, 1),
      category: 'other',
    },
    {
      title: 'Programación en IA y Big Data',
      issuer: 'Integra Conocimiento & Innovación',
      issuedDate: new Date(2025, 0, 1),
      category: 'programming',
    },
  ];

  /**
   * Agrupa tecnologías por categoría
   */
  getTechByCategory(category: TechCategory): TechStack[] {
    return this.techStack.filter((tech) => tech.category === category);
  }

  /**
   * Obtiene todas las categorías de tecnologías presentes
   */
  getTechCategories(): TechCategory[] {
    const categories = new Set(this.techStack.map((tech) => tech.category));
    return Array.from(categories) as TechCategory[];
  }

  /**
   * Certificaciones ordenadas por fecha (descendente)
   */
  getSortedCertifications(): Certification[] {
    return [...this.certifications].sort(
      (a, b) => b.issuedDate.getTime() - a.issuedDate.getTime()
    );
  }
}
