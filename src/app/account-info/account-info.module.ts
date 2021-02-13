import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountInfoRoutingModule } from './account-info-routing.module';
import { AccountViewComponent } from './pages/account-view/account-view.component';


@NgModule({
  declarations: [AccountViewComponent],
  imports: [
    CommonModule,
    AccountInfoRoutingModule
  ]
})
export class AccountInfoModule { }
