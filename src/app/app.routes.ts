import {Routes} from '@angular/router';
import {APP_NAME} from './core/constants/app.constant';
import {AuthGuard, canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

export const routes: Routes = [
  {
    path: 'login',
    title: `Login - ${APP_NAME}`,
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: redirectLoggedInToHome,
      breadcrumb: 'Login',
      title: `Login - ${APP_NAME}`,
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
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
      breadcrumb: 'Home',
      title: `Home - ${APP_NAME}`,
      description: 'A project management application home page',
      keywords: ['home', 'home page', 'ng-project-management', 'project management', 'angular'],
      canonicalPath: '/',
      schema: 'webpage'
    },
    children: [
      {
        path: 'projects',
        title: `Projects - ${APP_NAME}`,
        loadComponent: () => import('./pages/projects/projects.component').then((m) => m.ProjectsComponent),
        data: {
          breadcrumb: 'Projects',
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
        data: {
          breadcrumb: 'Contributors',
          title: `Contributors - ${APP_NAME}`,
          description: 'A project management application contributors page',
          keywords: ['contributors', 'contributors page', 'ng-project-management', 'project management', 'angular'],
          canonicalPath: '/contributors',
          schema: 'webpage'
        },
        children: [
          {
            path: 'active',
            title: `Active - ${APP_NAME}`,
            loadComponent: () => import('./shared/components/active/active.component').then((m) => m.ActiveComponent),
            data: {
              breadcrumb: 'Active',
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
              breadcrumb: 'Archived',
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
        ]
      },
      {
        path: '',
        redirectTo: 'projects',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'project/:id',
    title: `Project - ${APP_NAME}`,
    loadComponent: () => import('./pages/project/project.component').then((m) => m.ProjectComponent),
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
      breadcrumb: 'Project',
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


// const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
// const redirectLoggedInToHome = () => redirectLoggedInTo(['']);
//
// export const routes: Routes = [
//   {
//     path: 'login',
//     title: `Login - ${APP_NAME}`,
//     loadComponent: () => import('./pages/login/login.component').then(l=>l.LoginComponent),
//     ...canActivate(redirectLoggedInToHome),
//   },
//   {
//     path: '',
//     loadComponent: () => import('./pages/home/home.component').then(h=>h.HomeComponent),
//     ...canActivate(redirectUnauthorizedToLogin),
//     children: [
//       {
//         path: 'projects',
//         title: `Projets - ${APP_NAME}`,
//         loadComponent: () => import('./pages/project/project.component').then(p=>p.ProjectComponent),
//       },
//       {
//         path: 'contributors',
//         title: `Contributeurs - ${APP_NAME}`,
//         loadComponent: () =>
//           import('./pages/contributors/contributors.component').then(c=>c.ContributorsComponent),
//         children: [
//           {
//             path: 'active',
//             title: `Contributeurs actifs - ${APP_NAME}`,
//             loadComponent: () =>
//               import('./shared/components/active/active.component').then(a=>a.ActiveComponent),
//           },
//           {
//             path: 'achived',
//             title: `Contributeurs archivés - ${APP_NAME}`,
//             loadComponent: () =>
//               import('./shared/components/archived/archived.component').then(a=>a.ArchivedComponent),
//           },
//           {
//             path: '',
//             redirectTo: 'active',
//             pathMatch: 'full',
//           },
//         ],
//       },
//       {
//         path: '',
//         redirectTo: 'projects',
//         pathMatch: 'full',
//       },
//     ],
//   },
//   {
//     path: 'project/:id',
//     title: `Chargement du projet... - ${APP_NAME}`,
//     loadComponent: () => import('./pages/project/project.component').then(p=>p.ProjectComponent),
//     ...canActivate(redirectUnauthorizedToLogin),
//   },
//   {
//     path: '',
//     redirectTo: 'projects',
//     pathMatch: 'full',
//   },
//   {
//     path: '**',
//     redirectTo: '',
//   },
// ];
