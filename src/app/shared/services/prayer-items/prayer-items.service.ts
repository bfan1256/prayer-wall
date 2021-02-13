import { PrayerResponse } from './../../interfaces/prayer-item';
import { AngularFirestore } from '@angular/fire/firestore';
import { tempData } from './data';
import { Injectable } from '@angular/core';
import { PrayerItem } from '../../interfaces/prayer-item';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrayerItemsService {
  constructor(private afs: AngularFirestore) { }

  getItemsById(churchId: string): Observable<PrayerItem[]> {
    console.log(`Getting Items for Associated Church ID: ${churchId}`);
    return this.afs.collection('walls').doc(churchId).collection<PrayerItem>('requests')
      .valueChanges();
  }

  addItem(churchId: string, item: PrayerItem) {
    item.prayerId = this.afs.createId();
    return this.afs.collection(`walls/${churchId}/requests`)
      .doc(item.prayerId).set(item);
  }

  addResponse(churchId: string, itemId: string, response: PrayerResponse) {
    response.responseId = this.afs.createId();
    return this.afs.collection(`walls/${churchId}/requests/${itemId}/responses`)
      .doc(response.responseId).set(response);
  }

  getResponses(churchId: string, itemId: string) {
    return this.afs.collection<PrayerResponse>(`walls/${churchId}/requests/${itemId}/responses`).valueChanges();
  }
}