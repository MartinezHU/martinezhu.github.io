import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../models';
import projectsData from '../../assets/data/projects.json';

interface ProjectJsonLanguage {
  name: string;
  percent: number;
}

interface ProjectJsonItem {
  id: number;
  name: string;
  full_name: string;
  url: string;
  description: string | null;
  languages: ProjectJsonLanguage[];
  why_interesting: string;
  tags: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsDataService {
  constructor() {}

  getProjects(): Observable<Project[]> {
    const items = projectsData as ProjectJsonItem[];
    const projects = items.map((item, index) => this.mapJsonToProject(item, index));
    return of(projects);
  }

  private mapJsonToProject(item: ProjectJsonItem, index: number): Project {
    const technologies = this.buildTechnologies(item);
    const title = this.formatRepoName(item.name);
    const description = item.description || item.why_interesting || 'Proyecto personal.';

    return {
      id: item.id.toString(),
      title,
      titleEn: title,
      description,
      descriptionEn: description,
      longDescription: item.why_interesting || description,
      longDescriptionEn: item.why_interesting || description,
      technologies,
      featured: true,
      repoUrl: item.url,
      status: 'completed',
      category: this.inferCategory(item)
    };
  }

  private buildTechnologies(item: ProjectJsonItem): string[] {
    const techs = item.languages.map((lang) => lang.name);
    const tags = item.tags || [];
    return Array.from(new Set([...techs, ...tags]));
  }

  private inferCategory(item: ProjectJsonItem): Project['category'] {
    const tags = (item.tags || []).map((tag) => tag.toLowerCase());
    const languageSet = new Set(item.languages.map((l) => l.name.toLowerCase()));

    if (tags.includes('mobile') || tags.includes('flutter') || languageSet.has('dart')) {
      return 'mobile';
    }

    if (tags.includes('frontend') || tags.includes('backend') || tags.includes('web')) {
      return 'web';
    }

    if (tags.includes('bot') || tags.includes('tool') || tags.includes('cli')) {
      return 'tool';
    }

    return 'other';
  }

  private formatRepoName(name: string): string {
    let formatted = name
      .split(/[-_]/)
      .filter((word) => word.length > 0)
      .join(' ');

    formatted = formatted.replace(/([a-z])([A-Z])/g, '$1 $2');

    formatted = formatted
      .split(' ')
      .map((word) => {
        const acronyms = ['api', 'jwt', 'rest', 'crud', 'orm', 'ui', 'ux', 'cli', 'ide'];
        if (acronyms.includes(word.toLowerCase())) {
          return word.toUpperCase();
        }
        if (word.length <= 2) {
          return word.toUpperCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');

    return formatted;
  }
}
