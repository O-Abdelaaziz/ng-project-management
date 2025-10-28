import {Component, EventEmitter, Input, Output, signal} from '@angular/core';
import {AngularMaterialModule} from '../../../shared/material/angular-material.module';
import {RouterModule} from '@angular/router';
import {FormsModule, NgForm} from '@angular/forms';

@Component({
  selector: 'app-email-prompt',
  standalone: true,
  imports: [RouterModule, FormsModule, AngularMaterialModule],
  templateUrl: './email.prompt.component.html',
  styleUrl: './email.prompt.component.scss'
})
export class EmailPromptComponent {
  @Input() emailSent = signal('');
  @Output() emailPromptSubmit = new EventEmitter<NgForm>();
  @Output() showFullFormChange = new EventEmitter<boolean>();
  @Output() resetState = new EventEmitter<void>();
}
