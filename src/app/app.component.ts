import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ThemeService} from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-projects-management';

  private readonly firebaseApiKey = import.meta.env.NG_APP_FIREBASE_API_KEY;

  constructor() {
    console.log(this.firebaseApiKey)
    inject(ThemeService).setupDeviceThemeListener()
  }
}
