import {Component, inject} from '@angular/core';
import {AngularMaterialModule} from '../../material/angular-material.module';
import {APP_NAME, DARK_THEME, DEVICE_THEME, IS_MEDIUM, LIGHT_THEME} from '../../../core/constants/app.constant';
import {NgOptimizedImage} from '@angular/common';
import {WindowsObserverService} from '../../../core/utility/windows-observer.service';
import {ThemeMode, ThemeService} from '../../../core/services/theme.service';
import {DrawerStateService} from '../../../core/services/drawer-state.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [AngularMaterialModule, NgOptimizedImage],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  protected readonly APP_NAME = APP_NAME;
  protected readonly IS_MEDIUM = IS_MEDIUM;

  public _currentViewport = inject(WindowsObserverService).width;
  public _themeService = inject(ThemeService);
  public switchTheme = (theme: ThemeMode) => this._themeService.setTheme(theme);
  public drawerState = inject(DrawerStateService);

  public toggleDrawer = () => this.drawerState.isToggleDrawer.update((value) => !value);
  DEVICE_THEME: DEVICE_THEME= DEVICE_THEME;
  LIGHT_THEME: LIGHT_THEME= LIGHT_THEME;
  DARK_THEME: DARK_THEME= DARK_THEME;
}
