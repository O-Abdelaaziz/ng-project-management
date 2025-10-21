import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawerStateService {
  isToggleDrawer = signal(false);

  toggleDrawer() {
    this.isToggleDrawer.set(!this.isToggleDrawer());
  }
}
