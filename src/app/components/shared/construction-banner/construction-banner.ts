<<<<<<< HEAD
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
=======
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../../services/i18n.service';
import { signal } from '@angular/core';
>>>>>>> 220becc608d90fd28e7a2d337236762eeb0a7f92

@Component({
  selector: 'app-construction-banner',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, TranslateModule],
  templateUrl: './construction-banner.html',
  styleUrl: './construction-banner.scss'
})
export class ConstructionBanner {
  isVisible = true;

  closeBanner(): void {
    this.isVisible = false;
  }
}
=======
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
>>>>>>> 220becc608d90fd28e7a2d337236762eeb0a7f92
