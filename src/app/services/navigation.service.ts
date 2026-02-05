import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private lastSectionSubject = new BehaviorSubject<string>('top');
  public lastSection$ = this.lastSectionSubject.asObservable();

  constructor() {
    // Cargar la última sección guardada en sessionStorage
    const savedSection = sessionStorage.getItem('lastHomeSection');
    if (savedSection) {
      this.lastSectionSubject.next(savedSection);
    }
  }

  /**
   * Guarda la sección del home desde la que se navegó
   * @param section El ID de la sección (ej: 'about-me', 'projects', 'contact')
   */
  setLastSection(section: string): void {
    this.lastSectionSubject.next(section);
    sessionStorage.setItem('lastHomeSection', section);
  }

  /**
   * Obtiene la última sección guardada
   * @returns El ID de la última sección visitada
   */
  getLastSection(): string {
    return this.lastSectionSubject.value;
  }

  /**
   * Limpia la última sección guardada (vuelve al inicio)
   */
  clearLastSection(): void {
    this.lastSectionSubject.next('top');
    sessionStorage.removeItem('lastHomeSection');
  }
}
