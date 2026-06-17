import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { I18nService } from '../../../services/i18n.service';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly destroyRef = inject(DestroyRef);

  currentLanguage: string = 'es';
  isMenuOpen = false;

  constructor(
    public i18nService: I18nService,
    private navigationService: NavigationService
  ) {
    this.currentLanguage = this.i18nService.getCurrentLanguage();
    this.i18nService.currentLanguage$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((lang) => {
        this.currentLanguage = lang;
      });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  goToHomeSection(section: string): void {
    this.navigationService.setLastSection(section);
    this.closeMenu();
  }

  toggleLanguage(): void {
    this.i18nService.toggleLanguage();
  }
}
