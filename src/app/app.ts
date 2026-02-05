import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/shared/header/header";
import { Footer } from "./components/shared/footer/footer";
import { I18nService } from './services/i18n.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('web-personal');

  constructor(private i18nService: I18nService) {}

  ngOnInit(): void {
    // Inicializar i18n
    this.i18nService.getCurrentLanguage();
  }
}
