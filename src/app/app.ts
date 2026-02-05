import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ChildrenOutletContexts } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/shared/header/header";
import { Footer } from "./components/shared/footer/footer";
import { I18nService } from './services/i18n.service';
import { filter } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class App implements OnInit {
  protected readonly title = 'web-personal';

  constructor(
    private i18nService: I18nService,
    private router: Router,
    private contexts: ChildrenOutletContexts
  ) {}

  ngOnInit(): void {
    // Inicializar i18n
    this.i18nService.getCurrentLanguage();

    // Scroll al top cuando navega a una nueva ruta (pero no con anclas)
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Solo hacer scroll al top si no es navegación con ancla
        if (!event.urlAfterRedirects.includes('#')) {
          window.scrollTo(0, 0);
        }
      });
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
