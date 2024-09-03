import { Component } from '@angular/core';
import { Education } from 'src/app/shared/models/education.model';
import { Experience } from 'src/app/shared/models/experience.model';
import { Skill } from 'src/app/shared/models/skill.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  public skills: Skill[] = [];
  public experiences: Experience[] = [];
  public education: Education[] = [];

  certifications = [
    {
      title: 'ASP.NET Core Clean Architecture y Domain Driven Design (DDD)',
      platform: 'Udemy',
      date: new Date(2024, 4),
    },
    {
      title: 'Curso Django',
      platform: 'OpenWebinars',
      date: new Date(2023, 2),
    },
    {
      title: 'Curso Python 3',
      platform: 'OpenWebinars',
      date: new Date(2022, 9),
    },
    {
      title: 'Curso de Seguridad en Redes con Snort',
      platform: 'OpenWebinars',
      date: new Date(2021, 2),
    },
    {
      title: 'Curso Iptables',
      platform: 'OpenWebinars',
      date: new Date(2021, 1),
    },
  ];

  constructor() {
    this.skills = [
      new Skill('Angular', 'Intermedio', '80', [
        'Angular Material',
        'PrimeNG',
        'NgRx/Effects',
      ]),
      new Skill('Django / DRF', 'Intermedio - Avanzado', '80', [
        'Swagger',
        'Middlewares',
        'Autenticación JWT',
      ]),
      new Skill('.NET', 'Intermedio', '60', [
        '.NET Framework 4.8',
        '.Net Core 8.0',
        'NHibernate',
      ]),
      new Skill('Docker / Docker Compose', 'Intermedio', '70', [
        'Gestión de contenedores',
        'Configuración de entornos',
      ]),
      new Skill('Flutter', 'Básico - Intermedio', '40', [
        'Riverpod para gestión de estado',
        'Autenticación (en proceso)',
      ]),
      new Skill('Bases de Datos', 'Intermedio', '60', [
        'Relacionales: Oracle, MySQL, PostgreSQL',
        'No relacionales: MongoDB',
      ]),
    ];

    this.experiences = [
      new Experience(
        'Desarrollador Junior Full Stack',
        'MONTREL',
        'Dos Hermanas, España',
        [
          'Desarrollo de aplicaciones web utilizando Angular 8+ y tecnologías front-end como HTML, CSS y JavaScript.',
          'Colaboración en la gestión y manipulación de bases de datos con SQL Server, asegurando la correcta integración con el back-end.',
          'Participación en un equipo de desarrollo, contribuyendo a la entrega de soluciones en plazo.',
        ]
      ),
      new Experience(
        'Desarrollador Web (Prácticas)',
        'AYESA',
        'Sevilla, España',
        [
          'Implementación de soluciones web utilizando Java 7 y JavaScript en un entorno colaborativo.',
          'Generación de reportes con JasperReports, mejorando la presentación y análisis de datos para proyectos internos.',
          'Participación en la gestión de bases de datos con PL/SQL, optimizando consultas y el manejo de datos.',
        ]
      ),
      new Experience(
        'Técnico Informático (Prácticas)',
        'INTURJOVEN',
        'Sevilla, España',
        [
          'Resolución de incidencias técnicas, asegurando que el equipo pudiera trabajar sin interrupciones.',
          'Gestión de inventarios de hardware, ayudando a mantener un control actualizado de los activos tecnológicos.',
          'Montaje y configuración de sistemas informáticos, brindando soporte directo a usuarios en la instalación de software y hardware.',
        ]
      ),
    ];

    this.education = [
      new Education(
        'Grado Superior en Desarrollo de Aplicaciones Web (DAW)',
        'I.E.S. Polígono Sur',
        'Sevilla, España',
        new Date(2023, 5),
        'Incluye formación en tecnologías web modernas como Angular y Django.'
      ),
      new Education(
        'Grado Medio en Sistemas Microinformáticos y Redes (SMR)',
        'I.E.S. Polígono Sur',
        'Sevilla, España',
        new Date(2021, 5),
        'Incluye formación ofimática, multimedia y administración de sistemas.'
      ),
    ];
  }

  formatDate(date: Date): string {
    const meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    const mes = meses[date.getMonth()];
    const año = date.getFullYear();
    return `${mes} ${año}`;
  }
}
