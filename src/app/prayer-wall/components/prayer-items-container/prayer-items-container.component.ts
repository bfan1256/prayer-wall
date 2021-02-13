import { PrayerItemsService } from './../../../shared/services/prayer-items/prayer-items.service';
import { Component, Input, OnInit } from '@angular/core';
import { PrayerItem } from 'src/app/shared/interfaces/prayer-item';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-prayer-items-container',
  templateUrl: './prayer-items-container.component.html',
  styleUrls: ['./prayer-items-container.component.scss']
})
export class PrayerItemsContainerComponent implements OnInit {
  @Input() churchId: string;
  items: PrayerItem[] = [];
  constructor(private itemService: PrayerItemsService) { }

  ngOnInit(): void {
    this.itemService.getItemsById(this.churchId).subscribe((res) => {
      this.items = res;
    });
  }

}
