import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AngularMaterialModule} from '../../../shared/material/angular-material.module';
import {CommonModule} from '@angular/common';
import {AuthenticationService} from '../../../core/services/firebase/authentication.service';
import {User} from '@angular/fire/auth';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ProjectService} from '../../../core/services/firebase/project.service';
import {Project} from '../../../core/models/project.model';
import {FieldValue, serverTimestamp} from '@angular/fire/firestore';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,

  ],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss'
})
export class ProjectFormComponent {
  private _authenticationService = inject(AuthenticationService);
  private _formBuilder = inject(FormBuilder);
  private _matSnackBar = inject(MatSnackBar);
  private _projectService = inject(ProjectService);

  public _dialogData = inject(MAT_DIALOG_DATA);
  public _dialogRef = inject(MatDialogRef<ProjectFormComponent>);

  public _isEdit = this._dialogData.isEdit;
  public _buttonLabel = this._isEdit ? 'Update' : 'Create';
  public _title = this._isEdit ? 'Update Project' : 'Create Project';
  public contributors = [];
  public user$ = this._authenticationService.user;

  public projectForm = this._formBuilder.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    status: ['', [Validators.required]],
    priority: ['', [Validators.required]],
    budget: [0, [Validators.required]],
    contributors: this._formBuilder.array([this.contributorFormControl()]),
  });

  public contributorFormControl(email?: string) {
    return this._formBuilder.nonNullable.control(email ?? '', [Validators.email]);
  }

  public status = [
    {value: 'Backlog', viewValue: 'Backlog'},
    {value: 'To Do', viewValue: 'To Do'},
    {value: 'In Progress', viewValue: 'In Progress'},
    {value: 'Testing', viewValue: 'Testing'},
    {value: 'Done', viewValue: 'Done'},
  ];

  public priority = [
    {value: 'Low', viewValue: 'Low'},
    {value: 'Medium', viewValue: 'Medium'},
    {value: 'High', viewValue: 'High'},
  ];

  async onSubmit(user: User | null) {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      this._matSnackBar.open('Please fill in all required fields', 'Close', {
        duration: 3000,
      });
      return;
    }
    // if (this._isEdit) {
    //   this._projectService.updateProject(this.projectForm.value);
    // } else {
    //   this._projectService.addProject(this.projectForm.value);
    // }
    const formValue = this.projectForm.getRawValue();
    const projectCollection = this._projectService.PROJECT_COLLECTION_NAME;
    const projectId = this._projectService.createDocumentId(projectCollection);
    const project: Project<FieldValue> = {
      id: projectId,
      uid: user?.uid!,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      ...formValue,
    };
    await this._projectService.addProject(project);
    this._matSnackBar.open('Project saved successfully', 'Close', {
      duration: 3000,
    });
    this._dialogRef.close();
  }

  onCancel() {
    this._dialogRef.close();
  }

  addContributor(email?: string) {
    // this.contributors.push(email);
    // this.projectForm.get('contributors')?.push(this.contributorFormControl(email));
    this.projectForm.controls.contributors.push(
      this.contributorFormControl(email)
    )
  }

  removeContributor(index: number) {
    this.projectForm.controls.contributors.removeAt(index);
  }
}


