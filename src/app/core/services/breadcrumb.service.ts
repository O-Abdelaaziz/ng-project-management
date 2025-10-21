// // breadcrumb.service.ts
// import {Injectable} from '@angular/core';
// import {Router, NavigationEnd, ActivatedRoute, Data} from '@angular/router';
// import {BehaviorSubject, filter, map} from 'rxjs';
//
// interface Breadcrumb {
//   label: string;
//   url: string;
// }
//
// @Injectable({providedIn: 'root'})
// export class BreadcrumbService {
//   private readonly _breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);
//   readonly breadcrumbs$ = this._breadcrumbs.asObservable();
//
//   constructor(private router: Router, private activatedRoute: ActivatedRoute) {
//     this.router.events
//       .pipe(
//         filter((event) => event instanceof NavigationEnd),
//         map(() => this.buildBreadcrumbs(this.activatedRoute.root))
//       )
//       .subscribe((breadcrumbs) => {
//         this._breadcrumbs.next(breadcrumbs);
//       });
//   }
//
//   private buildBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
//     const children: ActivatedRoute[] = route.children;
//
//     if (children.length === 0) {
//       return breadcrumbs;
//     }
//
//     for (const child of children) {
//       if (child.outlet !== 'primary') {
//         continue;
//       }
//
//       const routeURL: string = child.snapshot.url.map((segment) => segment.path).join('/');
//       if (routeURL !== '') {
//         url += `/${routeURL}`;
//       }
//
//       const label = child.snapshot.data['breadcrumb'];
//       if (label) {
//         breadcrumbs.push({label, url});
//       }
//
//       return this.buildBreadcrumbs(child, url, breadcrumbs);
//     }
//
//     return breadcrumbs;
//   }
// }




// import { Injectable } from '@angular/core';
// import { Router, NavigationEnd, ActivatedRouteSnapshot, Data } from '@angular/router';
// import { BehaviorSubject, filter } from 'rxjs';
//
// interface Breadcrumb {
//   label: string;
//   url: string;
// }
//
// @Injectable({ providedIn: 'root' })
// export class BreadcrumbService {
//   private readonly _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);
//   readonly breadcrumbs$ = this._breadcrumbs$.asObservable();
//
//   constructor(private router: Router) {
//     this.router.events
//       .pipe(filter(event => event instanceof NavigationEnd))
//       .subscribe(() => {
//         const root = this.router.routerState.snapshot.root;
//         const breadcrumbs = this.createBreadcrumbs(root);
//         this._breadcrumbs$.next(breadcrumbs);
//       });
//   }
//
//   private createBreadcrumbs(
//     route: ActivatedRouteSnapshot,
//     url: string = '',
//     breadcrumbs: Breadcrumb[] = []
//   ): Breadcrumb[] {
//     const children: ActivatedRouteSnapshot[] = route.children;
//
//     for (const child of children) {
//       const routeURL: string = child.url.map(segment => segment.path).join('/');
//       if (routeURL !== '') {
//         url += `/${routeURL}`;
//       }
//
//       if (child.data['breadcrumb']) {
//         breadcrumbs.push({
//           label: child.data['breadcrumb'],
//           url: url,
//         });
//       }
//
//       return this.createBreadcrumbs(child, url, breadcrumbs);
//     }
//     return breadcrumbs;
//   }
// }


import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

/**
 * Interface for a single breadcrumb item.
 */
interface Breadcrumb {
  label: string;
  url: string;
}

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  // BehaviorSubject to hold and emit the current breadcrumb trail to subscribers
  private readonly _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);
  readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(
        // We only want to update breadcrumbs after a successful navigation completes
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        // Start building the breadcrumbs from the router's root state
        // We use the entire snapshot root to ensure we start at the beginning of the URL path
        const breadcrumbs = this.createBreadcrumbs(this.router.routerState.snapshot.root);
        this._breadcrumbs$.next(breadcrumbs);
      });
  }

  /**
   * Recursively traverses the ActivatedRouteSnapshot tree to build the breadcrumb trail.
   * @param route The current route snapshot.
   * @param url The accumulated URL path from the root.
   * @param breadcrumbs The list of breadcrumb objects built so far.
   * @returns The final array of Breadcrumb objects.
   */
  private createBreadcrumbs(
    route: ActivatedRouteSnapshot,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {

    // 1. Process the current route segment
    const routePath = route.url.map(segment => segment.path).join('/');

    // Only append to URL if the segment path is not empty
    if (routePath) {
      url += `/${routePath}`;
    }

    // Check if the current route segment has a 'breadcrumb' label defined in its data
    if (route.data['breadcrumb']) {
      // Prevent adding duplicate entries for the home route if the logic processes it twice
      const existing = breadcrumbs.find(b => b.url === url);
      if (!existing) {
        breadcrumbs.push({
          label: route.data['breadcrumb'],
          url: url,
        });
      }
    }

    // 2. Process children recursively
    const children: ActivatedRouteSnapshot[] = route.children;

    if (children.length > 0) {
      // Find the primary child route to continue traversal.
      // This handles child routes defined in the routing configuration.
      const primaryChild = children.find(c => c.outlet === 'primary') || children[0];

      // Continue the traversal with the accumulated URL and breadcrumb list
      return this.createBreadcrumbs(primaryChild, url, breadcrumbs);
    }

    // Return the final list once we hit a leaf route
    return breadcrumbs;
  }
}
