import {Component, computed, inject, OnInit} from '@angular/core';
import {AngularMaterialModule} from '../../material/angular-material.module';
import {NavigationEnd, Router, RouterModule, RouterOutlet} from '@angular/router';
import {IS_MEDIUM} from '../../../core/constants/app.constant';
import {WindowsObserverService} from '../../../core/utility/windows-observer.service';
import {DrawerStateService} from '../../../core/services/drawer-state.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [AngularMaterialModule, RouterOutlet, RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit {
  public isMedium = IS_MEDIUM;
  public _currentViewport = inject(WindowsObserverService).width;
  public drawerState = inject(DrawerStateService);
  public isToggleDrawer = computed(() => this.drawerState.isToggleDrawer());
  public toggleDrawer = () => this.drawerState.isToggleDrawer.update((value) => !value);

  public _router = inject(Router);

  ngOnInit(): void {
    // this._router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     this.toggleDrawer();
    //   }
    // });
  }
}
