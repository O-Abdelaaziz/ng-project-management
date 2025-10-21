import {Component, inject} from '@angular/core';
import {PageHeaderComponent} from '../../shared/layout/page-header/page-header.component';
import {Router, RouterModule, RouterOutlet} from '@angular/router';
import {AngularMaterialModule} from '../../shared/material/angular-material.module';

@Component({
  selector: 'app-contributors',
  standalone: true,
  imports: [
    AngularMaterialModule,
    PageHeaderComponent,
    RouterModule,
    RouterOutlet
  ],
  templateUrl: './contributors.component.html',
  styleUrl: './contributors.component.scss'
})
export class ContributorsComponent {
  public links = [
    {
      name: "Active",
      url: "active"
    },
    {
      name: "Archived",
      url: "archived"
    }
  ];

  private _router = inject(Router);
  public activeLink = this._router.url.replace("/contributors/", "");
}
