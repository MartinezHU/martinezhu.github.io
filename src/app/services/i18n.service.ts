import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private currentLanguage = new BehaviorSubject<string>('es');
  public currentLanguage$ = this.currentLanguage.asObservable();

  private readonly DEFAULT_LANGUAGE = 'es';
  private readonly SUPPORTED_LANGUAGES = ['es', 'en'];
  private readonly STORAGE_KEY = 'app-language';

  constructor(private translateService: TranslateService) {
    this.initializeLanguage();
  }

  /**
   * Inicializa el idioma desde localStorage o usa el predeterminado
   */
  private initializeLanguage(): void {
    const savedLanguage = localStorage.getItem(this.STORAGE_KEY);
    const language = savedLanguage || this.DEFAULT_LANGUAGE;

    this.setLanguage(language);
  }

  /**
   * Establece el idioma actual
   */
  setLanguage(language: string): void {
    if (!this.SUPPORTED_LANGUAGES.includes(language)) {
      language = this.DEFAULT_LANGUAGE;
    }

    this.translateService.setDefaultLang(language);
    this.translateService.use(language).subscribe({
      error: (err) => console.error('Error loading translation:', err)
    });
    this.currentLanguage.next(language);
    localStorage.setItem(this.STORAGE_KEY, language);
  }

  /**
   * Obtiene el idioma actual
   */
  getCurrentLanguage(): string {
    return this.currentLanguage.value;
  }

  /**
   * Obtiene los idiomas soportados
   */
  getSupportedLanguages(): string[] {
    return this.SUPPORTED_LANGUAGES;
  }

  /**
   * Alterna entre español e inglés
   */
  toggleLanguage(): void {
    const newLanguage = this.currentLanguage.value === 'es' ? 'en' : 'es';
    this.setLanguage(newLanguage);
  }
}
