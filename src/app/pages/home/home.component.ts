import { Component } from '@angular/core';
import {ToolbarComponent} from '../../shared/layout/toolbar/toolbar.component';
import {SidenavComponent} from '../../shared/layout/sidenav/sidenav.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ToolbarComponent,
    SidenavComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
