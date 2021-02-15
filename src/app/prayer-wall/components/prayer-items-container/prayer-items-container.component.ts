import { PrayerItemsService } from './../../../shared/services/prayer-items/prayer-items.service';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { PrayerItem } from 'src/app/shared/interfaces/prayer-item';
import { tap } from 'rxjs/operators';

declare const $: any;
@Component({
  selector: 'app-prayer-items-container',
  templateUrl: './prayer-items-container.component.html',
  styleUrls: ['./prayer-items-container.component.scss']
})
export class PrayerItemsContainerComponent implements OnInit, AfterViewInit {
  @Input() churchId: string;
  items: PrayerItem[] = [];
  loading = false;
  constructor(private itemService: PrayerItemsService) { }

  ngOnInit(): void {
    this.itemService.getItemsById(this.churchId).subscribe((res) => {
      this.items = res;
    });
  }

  ngAfterViewInit() {
  }

}
