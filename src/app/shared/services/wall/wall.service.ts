import { PrayerWall } from '../../interfaces/prayer-wall';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WallService {

  constructor(private afs: AngularFirestore) { }

  getWallData(id: string): Observable<PrayerWall> {
    return this.afs.collection('walls').doc<PrayerWall>(id)
      .valueChanges();
  }
}
