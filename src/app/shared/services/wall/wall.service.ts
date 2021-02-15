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

  async addMember(wallId: string, uid: string) {
    await this.afs.doc(`walls/${wallId}/members/${uid}`).set({
      uid,
      status: 'member'
    });
    return this.afs.doc(`users/${uid}/walls/${wallId}`).set({
      wallId,
      status: 'member'
    });
  }

  async removeMember(wallId: string, uid: string) {
    await this.afs.doc(`walls/${wallId}/members/${uid}`).delete();
    return this.afs.doc(`users/${uid}/walls/${wallId}`).delete();
  }

  getMembers(wallId: string) {
    return this.afs.collection(`walls/${wallId}/members`).valueChanges();
  }
}
