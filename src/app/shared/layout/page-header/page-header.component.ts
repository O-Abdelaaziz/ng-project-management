import {Component, inject} from '@angular/core';
import {map} from 'rxjs';
import {BreadcrumbService} from '../../../core/services/breadcrumb.service';
import {BreadcrumbComponent} from '../breadcrumb/breadcrumb.component';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    AsyncPipe
  ],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent {

  private breadcrumbService = inject(BreadcrumbService);

  pageTitle$ = this.breadcrumbService.breadcrumbs$.pipe(
    map(breadcrumbs => {
      const lastCrumb = breadcrumbs[breadcrumbs.length - 1];
      return lastCrumb ? lastCrumb.label : 'Loading...';
    })
  );
}
