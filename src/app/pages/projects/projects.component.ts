import {Component} from '@angular/core';
import {PageHeaderComponent} from '../../shared/layout/page-header/page-header.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    PageHeaderComponent
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

}
