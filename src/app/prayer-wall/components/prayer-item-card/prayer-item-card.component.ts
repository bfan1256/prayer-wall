import { Component, Input, OnInit, Output } from '@angular/core';
import { PrayerItem } from 'src/app/shared/services/prayer-items/interfaces/prayer-item';

@Component({
  selector: 'app-prayer-item-card',
  templateUrl: './prayer-item-card.component.html',
  styleUrls: ['./prayer-item-card.component.scss']
})
export class PrayerItemCardComponent implements OnInit {
  @Input() data: PrayerItem;
  constructor() { }

  ngOnInit(): void {
  }

}
