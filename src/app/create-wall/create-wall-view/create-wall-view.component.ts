import { UserService } from './../../shared/services/user/user.service';
import { Router } from '@angular/router';
import { PrayerWall } from './../../shared/interfaces/prayer-wall';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, first, take, tap } from 'rxjs/operators';
import firebase from 'firebase/app';

@Component({
  selector: 'app-create-wall-view',
  templateUrl: './create-wall-view.component.html',
  styleUrls: ['./create-wall-view.component.scss']
})
export class CreateWallViewComponent implements OnInit {
  wallData: PrayerWall = {
    numMembers: 0,
    numPrayers: 0,
    title: '',
    id: '',
    description: '',
    profileUrl: '',
    backgroundUrl: '',
    timestamp: {
      createdAt: null,
      updatedAt: null
    },
    creator: ''
  };
  uid: string;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  constructor(private storage: AngularFireStorage,
              private router: Router,
              private user: UserService,
              private db: AngularFirestore) { }

  ngOnInit(): void {
    this.user.uid.subscribe((res) => {
      this.uid = res;
    })
  }

  getBackgroundImage(url: string) {
    if (url) {
      return url;
    }
    return '/assets/images/bg.jpg';
  }

  getProfileImage(url: string) {
    if (url) {
      return url;
    }
    return '/assets/images/default-profile.png';
  }

  startUploadProfile(fileInput: any) {
    console.log(fileInput.target.files[0]);
    // The storage path
    const path = `wall/${Date.now()}_${fileInput.target.files[0].name}`;
    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // // The main task
    this.task = this.storage.upload(path, fileInput.target.files[0]);

    this.task.snapshotChanges().pipe(
      finalize(async () =>  {
        this.wallData.profileUrl = await ref.getDownloadURL().toPromise();
      }),
    ).subscribe();
  }

  startUploadBackground(fileInput: any) {
    console.log(fileInput.target.files[0]);
    // The storage path
    const path = `wall/${Date.now()}_${fileInput.target.files[0].name}`;
    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // // The main task
    this.task = this.storage.upload(path, fileInput.target.files[0]);

    this.task.snapshotChanges().pipe(
      finalize(async () =>  {
        this.wallData.backgroundUrl = await ref.getDownloadURL().toPromise();
      }),
    ).subscribe();
  }

  async createWall() {
    this.wallData.id = this.db.createId();
    this.wallData.creator = this.uid;
    this.wallData.numMembers = 1;
    this.wallData.timestamp.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    this.wallData.timestamp.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
    await this.db.collection('walls').doc(this.wallData.id).set(this.wallData);
    await this.db.doc(`walls/${this.wallData.id}/members/${this.uid}`).set({
      uid: this.uid,
      status: 'creator'
    });
    await this.db.doc(`users/${this.uid}/walls/${this.wallData.id}`).set({
      id: this.wallData.id,
      status: 'creator'
    });
    this.router.navigateByUrl(`/wall/${this.wallData.id}`);
  }

}
