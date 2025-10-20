import {Routes} from '@angular/router';
import {APP_NAME} from './core/constants/app.constant';

export const routes: Routes = [
  {
    path: 'login',
    title: `Connexion - ${APP_NAME}`,
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
    data: {
      title: `Connexion - ${APP_NAME}`,
      description: 'A project management application login page',
      keywords: ['login', 'login page', 'ng-project-management', 'project management', 'angular'],
      canonicalPath: '/login',
      schema: 'webpage'
    }
  },
  {
    path: '',
    title: `Home - ${APP_NAME}`,
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    children: [
      {
        path: 'projects',
        title: `Projects - ${APP_NAME}`,
        loadComponent: () => import('./pages/projects/projects.component').then((m) => m.ProjectsComponent),
        data: {
          title: `Projects - ${APP_NAME}`,
          description: 'A project management application projects page',
          keywords: ['projects', 'projects page', 'ng-project-management', 'project management', 'angular'],
          canonicalPath: '/projects',
          schema: 'webpage'
        }
      },
      {
        path: 'contributors',
        title: `Contributors - ${APP_NAME}`,
        loadComponent: () => import('./pages/contributors/contributors.component').then((m) => m.ContributorsComponent),
        children: [
          {
            path: 'active',
            title: `Active - ${APP_NAME}`,
            loadComponent: () => import('./shared/components/active/active.component').then((m) => m.ActiveComponent),
            data: {
              title: `Active - ${APP_NAME}`,
              description: 'A project management application active contributors page',
              keywords: ['active', 'active page', 'ng-project-management', 'project management', 'angular'],
              canonicalPath: '/contributors/active',
              schema: 'webpage'
            }
          },
          {
            path: 'archived',
            title: `Archived - ${APP_NAME}`,
            loadComponent: () => import('./shared/components/archived/archived.component').then((m) => m.ArchivedComponent),
            data: {
              title: `Archived - ${APP_NAME}`,
              description: 'A project management application archived contributors page',
              keywords: ['archived', 'archived page', 'ng-project-management', 'project management', 'angular'],
              canonicalPath: '/contributors/archived',
              schema: 'webpage'
            }
          },
          {
            path: '',
            redirectTo: 'active',
            pathMatch: 'full',
          },
        ],
        data: {
          title: `Contributors - ${APP_NAME}`,
          description: 'A project management application contributors page',
          keywords: ['contributors', 'contributors page', 'ng-project-management', 'project management', 'angular'],
          canonicalPath: '/contributors',
          schema: 'webpage'
        }
      },
      {
        path: '',
        redirectTo: 'projects',
        pathMatch: 'full',
      },
    ],
    data: {
      title: `Home - ${APP_NAME}`,
      description: 'A project management application home page',
      keywords: ['home', 'home page', 'ng-project-management', 'project management', 'angular'],
      canonicalPath: '/',
      schema: 'webpage'
    }
  },
  {
    path: 'project/:id',
    title: `Project - ${APP_NAME}`,
    loadComponent: () => import('./pages/project/project.component').then((m) => m.ProjectComponent),
    data: {
      title: `Project - ${APP_NAME}`,
      description: 'A project management application project page',
      keywords: ['project', 'project page', 'ng-project-management', 'project management', 'angular'],
      canonicalPath: '/project/:id',
      schema: 'webpage'
    }
  },
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
