import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrayerWallRoutingModule } from './prayer-wall-routing.module';
import { WallViewComponent } from './pages/wall-view/wall-view.component';
import { PrayerItemsContainerComponent } from './components/prayer-items-container/prayer-items-container.component';
import { PrayerItemCardComponent } from './components/prayer-item-card/prayer-item-card.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [WallViewComponent, PrayerItemsContainerComponent, PrayerItemCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    PrayerWallRoutingModule
  ]
})
export class PrayerWallModule { }
