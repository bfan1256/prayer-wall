import { PrayerItemsService } from './../../../shared/services/prayer-items/prayer-items.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PrayerItem } from 'src/app/shared/services/prayer-items/interfaces/prayer-item';
import { Observable } from 'rxjs';
declare const $: any;
@Component({
  selector: 'app-prayer-items-container',
  templateUrl: './prayer-items-container.component.html',
  styleUrls: ['./prayer-items-container.component.scss']
})
export class PrayerItemsContainerComponent implements OnInit, AfterViewInit {
  items: Observable<PrayerItem[]>;
  constructor(private itemService: PrayerItemsService) { }

  ngOnInit(): void {
    this.items = this.itemService.getItemsById('asdfasfasf');
  }

  ngAfterViewInit() {
    $('#prayer-items').masonry();
  }

}
