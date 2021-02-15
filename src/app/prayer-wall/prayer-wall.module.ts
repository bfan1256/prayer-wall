import { NgxMasonryModule } from 'ngx-masonry';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagInputModule } from 'ngx-chips';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrayerWallRoutingModule } from './prayer-wall-routing.module';
import { WallViewComponent } from './pages/wall-view/wall-view.component';
import { PrayerItemsContainerComponent } from './components/prayer-items-container/prayer-items-container.component';
import { PrayerItemCardComponent } from './components/prayer-item-card/prayer-item-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResponseCardComponent } from './components/response-card/response-card.component';


@NgModule({
  declarations: [WallViewComponent, PrayerItemsContainerComponent, PrayerItemCardComponent, ResponseCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    TagInputModule,
    ReactiveFormsModule,
    SharedModule,
    PrayerWallRoutingModule,
    NgxMasonryModule
  ]
})
export class PrayerWallModule { }
