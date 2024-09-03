import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'web-personal';
  getYear!: number;

  constructor() {
    const date = new Date();
    this.getYear = date.getFullYear();
  }
}
