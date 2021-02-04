import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MonetaryAmountComponent } from './monetary-amount/monetary-amount.component';
import { RouterModule } from '@angular/router';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import {NwbCommonModule} from '@wizishop/ng-wizi-bulma';

@NgModule({
  declarations: [UserComponent, MonetaryAmountComponent, DeleteButtonComponent],
  exports: [
    UserComponent,
    MonetaryAmountComponent,
    DeleteButtonComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    NwbCommonModule
  ]
})
export class OengusCommonModule {
}
