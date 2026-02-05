import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/shared/header/header";
import { Footer } from "./components/shared/footer/footer";
import { I18nService } from './services/i18n.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = 'web-personal';

  constructor(
    private i18nService: I18nService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Inicializar i18n
    this.i18nService.getCurrentLanguage();

    // Scroll al top cuando navega a una nueva ruta
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
  }
}
