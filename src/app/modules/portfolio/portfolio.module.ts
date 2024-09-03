import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';

@NgModule({
  declarations: [PortfolioComponent],
  imports: [CommonModule],
  exports: [PortfolioComponent, CommonModule],
})
export class PortfolioModule {}
