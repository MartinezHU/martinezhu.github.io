import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { AboutMe } from './pages/about-me/about-me';
import { AboutMeDetails } from './pages/about-me-details/about-me-details';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about-me', component: AboutMe },
  { path: 'about-me-details', component: AboutMeDetails },
];
