import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../../services/i18n.service';
import { signal } from '@angular/core';

@Component({
  selector: 'app-construction-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './construction-banner.html',
  styleUrl: './construction-banner.scss'
})
export class ConstructionBanner implements OnInit {
  isVisible = signal(true);
  currentLanguage = signal('es');

  constructor(private i18nService: I18nService) {}

  ngOnInit(): void {
    this.currentLanguage.set(this.i18nService.getCurrentLanguage());
  }

  closeBanner(): void {
    this.isVisible.set(false);
  }
}
