import { UtilitiesService } from './../../../shared/services/utilities/utilities.service';
import { PrayerItemsService } from './../../../shared/services/prayer-items/prayer-items.service';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { PrayerItem, PrayerResponse } from 'src/app/shared/interfaces/prayer-item';
import { delay, map, tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

declare const $: any;
declare const Draggabilly: any;
@Component({
  selector: 'app-prayer-items-container',
  templateUrl: './prayer-items-container.component.html',
  styleUrls: ['./prayer-items-container.component.scss']
})
export class PrayerItemsContainerComponent implements OnInit, AfterViewInit {
  @Input() churchId: string;
  items: PrayerItem[] = [];
  loading = false;
  count = 0;
  responses = [];
  showDrag = false;
  currentSelected: PrayerItem;
  newResponse: PrayerResponse;
  showDragCount = 0;
  responseSubscription: Subscription;
  grid: any;
  constructor(private itemService: PrayerItemsService, private utilities: UtilitiesService) { }

  ngOnInit(): void {
    this.newResponse = this.setDefaultPrayerResponse();
    this.itemService.getItemsById(this.churchId)
      .pipe(
        map((res) => {
          return this.utilities.shuffle(res);
        })
      )
      .subscribe(async (res) => {
      this.items = res;
      if (this.count > 0) {
        await this.delay(500);
        $('.items-row').packery('destroy');
        this.grid = $('.items-row').packery();
        this.grid.find('.item').each((i, gridItem) => {
          this.grid.packery('bindDraggabillyEvents', new Draggabilly(gridItem));
        });
      }
      this.count++;
    });
  }

  async ngAfterViewInit() {
    await this.delay(1500);
    this.grid = $('.items-row').packery();
    this.grid.find('.item').each((i, gridItem) => {
      this.grid.packery('bindDraggabillyEvents', new Draggabilly(gridItem));
    });
    this.grid.on('dragItemPositioned', (item) => {
      console.log(this.showDragCount);
      if (this.showDragCount === 1) {
        this.showDrag = true;
      }
      this.showDragCount++;
    });
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  checkPosition() {
    console.log('checking position...');
  }

  setDefaultPrayerResponse() {
    return {
      text: '',
      type: 'anonymous',
      responseId: '',
      itemId: ''
    };
  }

  openModal(data) {
    this.currentSelected = data;
    $('#responseModal').modal('show');
    this.newResponse = this.setDefaultPrayerResponse();
    if (this.responseSubscription) {
      this.responseSubscription.unsubscribe();
    }
    this.responseSubscription = this.itemService.getResponses(this.churchId, this.currentSelected.prayerId).subscribe((res) => {
      this.responses = res;
    });
  }

  addResponse() {
    this.newResponse.itemId = this.currentSelected.prayerId;
    this.itemService.addResponse(this.churchId, this.currentSelected.prayerId, this.newResponse);
  }

}
