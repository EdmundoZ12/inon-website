import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'iNeon - Inicio',
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/about.component').then((m) => m.AboutComponent),
    title: 'iNeon - Quiénes Somos',
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./features/services/services.component').then(
        (m) => m.ServicesComponent
      ),
    title: 'iNeon - Servicios',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact.component').then(
        (m) => m.ContactComponent
      ),
    title: 'iNeon - Contacto',
  },
  {
    path: 'support',
    loadComponent: () =>
      import('./features/support/support.component').then(
        (m) => m.SupportComponent
      ),
    title: 'iNeon - Soporte Técnico',
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];
