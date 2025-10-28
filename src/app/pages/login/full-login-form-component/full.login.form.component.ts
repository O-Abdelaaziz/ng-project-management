import {Component, EventEmitter, input, Input, Output, signal} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, NgForm} from '@angular/forms';
import {AngularMaterialModule} from '../../../shared/material/angular-material.module';
import {SkeletonComponent} from '../../../shared/layout/skelton/skeleton.component';

@Component({
  selector: 'app-full-login-form',
  standalone: true,
  imports: [RouterModule, FormsModule, AngularMaterialModule, SkeletonComponent],
  templateUrl: './full.login.form.component.html',
  styleUrl: './full.login.form.component.scss'
})
export class FullLoginFormComponent {
  @Input({required: true}) hidePassword!: boolean;
  public loading = input(false)

  // Outputs
  @Output() formSubmit = new EventEmitter<NgForm>();
  @Output() passwordToggle = new EventEmitter<void>();
  @Output() backToPrompt = new EventEmitter<boolean>();
}
