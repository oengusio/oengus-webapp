import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { V2LinkComponent } from './v2-link/v2-link.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    V2LinkComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    V2LinkComponent
  ]
})
export class ButtonsModule { }
