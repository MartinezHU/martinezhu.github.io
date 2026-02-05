import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-construction-banner',
  standalone: true,
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
