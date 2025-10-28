import { Component } from '@angular/core';
import {AngularMaterialModule} from '../../material/angular-material.module';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss'
})
export class SkeletonComponent {

}
