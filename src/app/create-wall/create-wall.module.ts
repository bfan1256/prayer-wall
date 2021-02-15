import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateWallRoutingModule } from './create-wall-routing.module';
import { CreateWallViewComponent } from './create-wall-view/create-wall-view.component';


@NgModule({
  declarations: [CreateWallViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    CreateWallRoutingModule
  ]
})
export class CreateWallModule { }
