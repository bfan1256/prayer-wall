import { PrayerItemsService } from './../../../shared/services/prayer-items/prayer-items.service';
import { PrayerItem } from 'src/app/shared/services/prayer-items/interfaces/prayer-item';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { Masonry } from '@thisissoon/angular-masonry';

declare const $: any;
@Component({
  selector: 'app-wall-view',
  templateUrl: './wall-view.component.html',
  styleUrls: ['./wall-view.component.scss']
})
export class WallViewComponent implements OnInit {
  newItem: PrayerItem;
  constructor(private itemService: PrayerItemsService) { }

  ngOnInit(): void {
    this.newItem = this.setDefaultNewItem();
  }

  setDefaultNewItem() {
    return {
      text: '',
      numResponses: 0,
      numViews: 0,
      prayerId: '',
      type: 'anonymous',
      tags: [],
      prayedIds: []
    };
  }

  addPrayerItem() {
    console.log(this.newItem);
    if (this.newItem.text.trim().length > 0) {
      return this.itemService.addItem(this.newItem);
    }
  }

}
