import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Project } from '../models';

/**
 * Interfaz para la respuesta de la API de GitHub
 */
interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  owner: {
    login: string;
    avatar_url: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class GitHubService {
  private readonly apiUrl = 'https://api.github.com';
  private readonly username = 'MartinezHU';

  constructor(private http: HttpClient) {}

  /**
   * Obtener repositorios del usuario desde GitHub
   */
  getRepos(): Observable<Project[]> {
    const url = `${this.apiUrl}/users/${this.username}/repos?sort=updated&per_page=100`;
    
    return this.http.get<GitHubRepo[]>(url).pipe(
      map((repos) => repos
        .filter(repo => !repo.fork && !repo.archived) // Filtrar forks y archivados
        .map((repo) => this.mapGitHubRepoToProject(repo))
      )
    );
  }

  /**
   * Mapear respuesta de GitHub al modelo Project
   */
  private mapGitHubRepoToProject(repo: GitHubRepo): Project {
    return {
      id: repo.id.toString(),
      title: this.formatRepoName(repo.name),
      titleEn: this.formatRepoName(repo.name),
      description: repo.description || 'Proyecto de GitHub',
      descriptionEn: repo.description || 'GitHub Project',
      longDescription: repo.description || 'Proyecto desarrollado y disponible en GitHub.',
      longDescriptionEn: repo.description || 'Project developed and available on GitHub.',
      technologies: this.extractTechnologies(repo),
      image: repo.owner.avatar_url,
      featured: this.isFeatured(repo),
      repoUrl: repo.html_url,
      demoUrl: repo.homepage || undefined,
      startDate: new Date(repo.created_at),
      endDate: new Date(repo.updated_at),
      status: 'completed',
      category: this.inferCategory(repo),
    };
  }

  /**
   * Formatear nombre del repositorio (convertir guiones a espacios y capitalizar)
   */
  private formatRepoName(name: string): string {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Extraer tecnologías del repositorio
   */
  private extractTechnologies(repo: GitHubRepo): string[] {
    const techs: string[] = [];
    
    // Agregar lenguaje principal
    if (repo.language) {
      techs.push(repo.language);
    }
    
    // Agregar topics como tecnologías
    if (repo.topics && repo.topics.length > 0) {
      techs.push(...repo.topics.slice(0, 5)); // Máximo 5 topics
    }
    
    return techs;
  }

  /**
   * Determinar si un repositorio es destacado
   * (por ejemplo, por número de estrellas o actualización reciente)
   */
  private isFeatured(repo: GitHubRepo): boolean {
    const hasStars = repo.stargazers_count > 0;
    const hasDescription = !!repo.description;
    const recentlyUpdated = new Date(repo.updated_at) > new Date(Date.now() - 180 * 24 * 60 * 60 * 1000); // Últimos 6 meses
    
    return (hasStars && hasDescription) || recentlyUpdated;
  }

  /**
   * Inferir categoría del proyecto basado en lenguaje y topics
   */
  private inferCategory(repo: GitHubRepo): 'web' | 'mobile' | 'desktop' | 'library' | 'tool' | 'other' {
    const language = repo.language?.toLowerCase() || '';
    const topics = repo.topics.map(t => t.toLowerCase());
    
    // Mobile
    if (topics.includes('flutter') || topics.includes('android') || topics.includes('ios') || topics.includes('mobile')) {
      return 'mobile';
    }
    
    // Web
    if (language === 'typescript' || language === 'javascript' || 
        topics.includes('angular') || topics.includes('react') || topics.includes('vue') || 
        topics.includes('web') || topics.includes('frontend') || topics.includes('backend')) {
      return 'web';
    }
    
    // Library
    if (topics.includes('library') || topics.includes('package') || topics.includes('npm')) {
      return 'library';
    }
    
    // Desktop
    if (topics.includes('desktop') || topics.includes('electron')) {
      return 'desktop';
    }
    
    // Tool
    if (topics.includes('tool') || topics.includes('cli') || topics.includes('automation')) {
      return 'tool';
    }
    
    return 'other';
  }
}
