import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { AboutMe } from './pages/about-me/about-me';
import { AboutMeDetails } from './pages/about-me-details/about-me-details';
import { Projects } from './pages/projects/projects';
import { ProjectDetails } from './pages/project-details/project-details';

export const routes: Routes = [
  { path: '', component: Home, data: { animation: 'HomePage' } },
  { path: 'about-me', component: AboutMe, data: { animation: 'AboutMePage' } },
  { path: 'about-me-details', component: AboutMeDetails, data: { animation: 'AboutMeDetailsPage' } },
  { path: 'projects', component: Projects, data: { animation: 'ProjectsPage' } },
  { path: 'projects/:id', component: ProjectDetails, data: { animation: 'ProjectDetailsPage' } },
];
