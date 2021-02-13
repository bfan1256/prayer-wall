import { PrayerWall } from './../../../shared/interfaces/prayer-wall';
import { WallService } from './../../../shared/services/wall/wall.service';
import { PrayerItemsService } from './../../../shared/services/prayer-items/prayer-items.service';
import { PrayerItem } from 'src/app/shared/interfaces/prayer-item';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck, shareReplay, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

declare const $: any;
@Component({
  selector: 'app-wall-view',
  templateUrl: './wall-view.component.html',
  styleUrls: ['./wall-view.component.scss']
})
export class WallViewComponent implements OnInit {
  newItem: PrayerItem;
  wallData: PrayerWall;
  id: Observable<string>;
  constructor(private itemService: PrayerItemsService,
              private wall: WallService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.params.pipe(
      pluck('id'),
      shareReplay(1)
    );

    this.id.pipe(
      switchMap((id) => {
        console.log(id);
        return this.wall.getWallData(id);
      })
    ).subscribe((res) => {
      console.log(res);
      this.wallData = res;
    });


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

  async addPrayerItem() {
    if (this.newItem.text.trim().length > 0) {
      await this.itemService.addItem(this.wallData.id, this.newItem);
      this.newItem = this.setDefaultNewItem();
    }
  }

}
