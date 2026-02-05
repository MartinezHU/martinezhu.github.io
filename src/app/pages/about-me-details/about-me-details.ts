import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ViewportScroller } from '@angular/common';

interface TechSkill {
  name: string;
  category: 'frontend' | 'backend' | 'mobile' | 'tools' | 'other';
  logo?: string;
}

interface Education {
  title: string;
  institution: string;
  year: string;
  type: 'degree' | 'certification' | 'course';
}

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

  // Datos de ejemplo - reemplazar con datos reales
  techSkills: TechSkill[] = [
    { name: 'Angular', category: 'frontend' },
    { name: 'React', category: 'frontend' },
    { name: 'Node.js', category: 'backend' },
    { name: 'TypeScript', category: 'frontend' },
    { name: 'Python', category: 'backend' },
    { name: 'Flutter', category: 'mobile' },
  ];

  education: Education[] = [
    {
      title: 'Grado en Ingeniería Informática',
      institution: 'Universidad de Ejemplo',
      year: '2020-2024',
      type: 'degree',
    },
    {
      title: 'Certificación Angular Avanzado',
      institution: 'Plataforma Online',
      year: '2024',
      type: 'certification',
    },
  ];

  getCategorySkills(category: string): TechSkill[] {
    return this.techSkills.filter((skill) => skill.category === category);
  }
}
