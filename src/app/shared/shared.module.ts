import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrayerItemsService } from './services/prayer-items/prayer-items.service';
import { WallService } from './services/wall/wall.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  providers: [ WallService, PrayerItemsService ],
  exports: [NavbarComponent]
})
export class SharedModule { }
