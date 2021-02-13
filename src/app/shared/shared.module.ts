import { PrayerItemsService } from './services/prayer-items/prayer-items.service';
import { WallService } from './services/wall/wall.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
  ],
  providers: [ WallService, PrayerItemsService ],
  exports: [NavbarComponent]
})
export class SharedModule { }
