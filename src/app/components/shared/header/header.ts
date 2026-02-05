import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { I18nService } from '../../../services/i18n.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  currentLanguage: string = 'es';

  constructor(public i18nService: I18nService) {
    this.currentLanguage = this.i18nService.getCurrentLanguage();
    this.i18nService.currentLanguage$.subscribe((lang) => {
      this.currentLanguage = lang;
    });
  }

  toggleLanguage(): void {
    this.i18nService.toggleLanguage();
  }
}
