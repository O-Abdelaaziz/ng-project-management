import {Component, inject} from '@angular/core';
import {BreadcrumbService} from '../../../core/services/breadcrumb.service';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AngularMaterialModule} from '../../material/angular-material.module';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule, AngularMaterialModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {


  private breadcrumbService = inject(BreadcrumbService);

  constructor() {
    console.log(this.breadcrumbs$)
  }

  breadcrumbs$ = this.breadcrumbService.breadcrumbs$;
}
