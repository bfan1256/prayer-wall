import { PrayerItemsService } from './../../../shared/services/prayer-items/prayer-items.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { PrayerItem, PrayerResponse } from 'src/app/shared/interfaces/prayer-item';
declare const $: any;
@Component({
  selector: 'app-prayer-item-card',
  templateUrl: './prayer-item-card.component.html',
  styleUrls: ['./prayer-item-card.component.scss']
})
export class PrayerItemCardComponent implements OnInit {
  @Input() data: PrayerItem;
  @Input() churchId: string;
  newResponse: PrayerResponse;
  responses: PrayerResponse[] = [];
  constructor(private backend: PrayerItemsService) { }

  ngOnInit(): void {
    this.newResponse = this.setDefaultPrayerResponse();
    this.backend.getResponses(this.churchId, this.data.prayerId)
      .subscribe((res) => {
        this.responses = res;
      });
  }

  addResponse() {
    this.newResponse.itemId = this.data.prayerId;
    this.backend.addResponse(this.churchId, this.data.prayerId, this.newResponse);
  }


  openModal() {
    $('#responseModal' + this.data.prayerId).show();
  }

  setDefaultPrayerResponse() {
    return {
      text: '',
      type: 'anonymous',
      responseId: '',
      itemId: ''
    };
  }

}
