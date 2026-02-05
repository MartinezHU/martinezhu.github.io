import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero } from '../../components/shared/hero/hero';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Hero, TranslateModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
