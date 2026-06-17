import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { I18nService } from '../../services/i18n.service';
import { NavigationService } from '../../services/navigation.service';
import { TechStack, TechCategory, Education, EducationType, Certification, CertificationCategory } from '../../models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-about-me-details',
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './about-me-details.html',
  styleUrl: './about-me-details.scss',
})
export class AboutMeDetails implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  currentLanguage: string = 'es';
  translatedLevelMap: { [key: string]: string } = {};
  lastSection: string = 'top';
  loading: boolean = true;

  constructor(
    public i18nService: I18nService,
    private translateService: TranslateService,
    private navigationService: NavigationService
  ) {
    this.currentLanguage = this.i18nService.getCurrentLanguage();
    this.lastSection = this.navigationService.getLastSection();
  }

  ngOnInit() {
    // Suscribirse a cambios de idioma
    this.i18nService.currentLanguage$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((lang) => {
        this.currentLanguage = lang;
        this.loadTranslatedLevels();
      });

    // Cargar niveles traducidos
    this.loadTranslatedLevels();
  }

  /**
   * Cargar los niveles traducidos desde el JSON de i18n
   */
  loadTranslatedLevels(): void {
    this.translateService.get(`stack.levels`)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((translations) => {
        this.translatedLevelMap = translations;
        // Marcar como cargado una vez que las traducciones estén disponibles
        this.loading = false;
      });
  }

  /**
   * Obtener el nivel traducido
   */
  getTranslatedLevel(level: string | undefined): string {
    return level ? this.translatedLevelMap[level] || level : '';
  }

  /**
   * Obtener título de educación según idioma actual
   */
  getEducationTitle(edu: Education): string {
    return this.currentLanguage === 'es' ? edu.title : (edu.titleEn || edu.title);
  }

  /**
   * Obtener descripción de educación según idioma actual
   */
  getEducationDescription(edu: Education): string | undefined {
    return this.currentLanguage === 'es' ? edu.description : edu.descriptionEn;
  }

  /**
   * Obtener título de certificación según idioma actual
   */
  getCertificationTitle(cert: Certification): string {
    return this.currentLanguage === 'es' ? cert.title : (cert.titleEn || cert.title);
  }

  // Stack de tecnologías
  techStack: TechStack[] = [
    { name: 'Angular', category: 'frontend', level: 'advanced', description: 'Aplicaciones web SPA' },
    { name: 'Vue.js', category: 'frontend', level: 'intermediate', description: 'Interfaces web modernas' },
    { name: 'TypeScript', category: 'frontend', level: 'advanced', description: 'Tipado estático en frontend' },
    { name: 'Flutter', category: 'mobile', level: 'intermediate', description: 'Apps móviles multiplataforma' },
    { name: 'Dart', category: 'mobile', level: 'intermediate', description: 'Lenguaje principal en proyectos Flutter' },
    { name: 'Android Studio', category: 'mobile', level: 'intermediate', description: 'Desarrollo, emulación y depuración Android' },
    { name: 'Android Emulator', category: 'mobile', level: 'intermediate', description: 'Pruebas en dispositivos virtuales' },
    { name: 'Python', category: 'backend', level: 'advanced', description: 'Django y Django REST Framework (DRF)' },
    { name: '.NET (C#)', category: 'backend', level: 'intermediate', description: 'APIs REST' },
    { name: 'REST APIs', category: 'backend', level: 'advanced', description: 'DRF y buenas prácticas' },
    { name: 'JWT', category: 'backend', level: 'intermediate', description: 'Autenticación y autorización' },
    { name: 'OAuth2', category: 'backend', level: 'intermediate', description: 'Flujos de autenticación' },
    { name: 'BaaS Integration', category: 'backend', level: 'intermediate', description: 'Integración con servicios BaaS' },
    { name: 'Pandas', category: 'data-ai', level: 'intermediate', description: 'Análisis y preparación de datos' },
    { name: 'NumPy', category: 'data-ai', level: 'intermediate', description: 'Cálculo numérico en Python' },
    { name: 'scikit-learn', category: 'data-ai', level: 'intermediate', description: 'Modelos clásicos de Machine Learning' },
    { name: 'PyTorch', category: 'data-ai', level: 'beginner', description: 'Primeros proyectos con redes neuronales' },
    { name: 'JupyterLab', category: 'data-ai', level: 'intermediate', description: 'Exploración, notebooks y prototipado' },
    { name: 'Matplotlib / Seaborn', category: 'data-ai', level: 'intermediate', description: 'Visualización de datos' },
    { name: 'Apache Spark', category: 'big-data', level: 'beginner', description: 'Primer contacto con procesamiento distribuido' },
    { name: 'Kafka', category: 'big-data', level: 'beginner', description: 'Conceptos y pruebas con streaming de eventos' },
    { name: 'Airflow / NiFi', category: 'big-data', level: 'beginner', description: 'Orquestación e ingesta de datos' },
    { name: 'S3 / MinIO', category: 'big-data', level: 'intermediate', description: 'Almacenamiento de objetos y data lakes sencillos' },
    { name: 'AWS Data Services', category: 'big-data', level: 'beginner', description: 'Uso inicial de RDS, Athena y Glue' },
    { name: 'Python + boto3', category: 'big-data', level: 'intermediate', description: 'Automatización de tareas cloud e infraestructura AWS' },
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

  // Formación académica
  education: Education[] = [
    {
      title: 'Inteligencia Artificial y Big Data',
      titleEn: 'Artificial Intelligence and Big Data',
      institution: 'IES Polígono Sur',
      startYear: 2025,
      endYear: 2026,
      educationType: 'degree',
      description: 'Completado recientemente',
      descriptionEn: 'Recently completed',
    },
    {
      title: 'Desarrollo de Aplicaciones Web',
      titleEn: 'Web Application Development',
      institution: 'IES Polígono Sur',
      startYear: 2021,
      endYear: 2023,
      educationType: 'degree',
    },
    {
      title: 'Sistemas Microinformáticos y Redes',
      titleEn: 'IT Systems and Networks',
      institution: 'IES Polígono Sur',
      startYear: 2019,
      endYear: 2021,
      educationType: 'degree',
    },
  ];

  // Certificaciones
  certifications: Certification[] = [
    {
      title: 'Java EE / Spring Boot',
      titleEn: 'Java EE / Spring Boot',
      issuer: 'IPartek Formación',
      issuedDate: new Date(2025, 9, 1),
      category: 'framework',
    },
    {
      title: 'Certificado Profesional de Ciberseguridad',
      titleEn: 'Professional Cybersecurity Certificate',
      issuer: 'Coursera / Google',
      issuedDate: new Date(2025, 6, 1),
      category: 'security',
    },
    {
      title: 'Realidad Virtual y Aumentada',
      titleEn: 'Virtual and Augmented Reality',
      issuer: 'Integra Conocimiento & Innovación',
      issuedDate: new Date(2025, 3, 1),
      category: 'other',
    },
    {
      title: 'Programación en IA y Big Data',
      titleEn: 'AI and Big Data Programming',
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
