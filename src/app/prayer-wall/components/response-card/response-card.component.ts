import { PrayerResponse } from './../../../shared/interfaces/prayer-item';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-response-card',
  templateUrl: './response-card.component.html',
  styleUrls: ['./response-card.component.scss']
})
export class ResponseCardComponent implements OnInit {
  @Input() data: PrayerResponse;
  constructor() { }

  ngOnInit(): void {
  }

}
