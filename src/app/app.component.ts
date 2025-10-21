import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-projects-management';

  private readonly appName = import.meta.env.NG_APP_NAME;

  constructor() {
    this.title = this.appName;
    console.log(this.appName)
  }
}
