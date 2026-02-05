import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero } from '../../components/shared/hero/hero';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Hero],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
