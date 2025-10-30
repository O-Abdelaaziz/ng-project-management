import {Component, inject} from '@angular/core';
import {PageHeaderComponent} from '../../shared/layout/page-header/page-header.component';
import {ProjectListComponent} from './porject-list/project-list.component';
import {AngularMaterialModule} from '../../shared/material/angular-material.module';
import {MatDialog} from '@angular/material/dialog';
import {ProjectFormComponent} from './porject-form/project-form.component';

const matDialogConfig = {
  width: '35rem',
  data: {
    title: 'New Project',
    buttonLabel: 'Create',
    isEdit: false
  },
  panelClass: 'mat-dialog',
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    PageHeaderComponent,
    ProjectListComponent,
    AngularMaterialModule
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

  public _matDialog = inject(MatDialog);

  public openProjectForm() {
    this._matDialog.open(ProjectFormComponent, {
      width: '36rem',
      disableClose: true,
      data: {
        title: 'New Project',
        buttonLabel: 'Create',
        isEdit: false
      },
      panelClass: 'mat-dialog',
    });
  }
}
