import { tempData } from './data';
import { Injectable } from '@angular/core';
import { PrayerItem } from './interfaces/prayer-item';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrayerItemsService {

  constructor() { }

  getItemsById(churchId: string): Observable<PrayerItem[]> {
    console.log(`Getting Items for Associated Church ID: ${churchId}`);
    return of(tempData);
  }

  addItem(item: PrayerItem) {
    tempData.unshift(item);
    console.log(tempData);
    return Promise.resolve();
  }
}
