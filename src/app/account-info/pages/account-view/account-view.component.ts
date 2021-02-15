import { UtilitiesService } from './../../../shared/services/utilities/utilities.service';
import { AppUser } from './../../../shared/interfaces/user';
import { UserService } from './../../../shared/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { finalize, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

declare const $: any;
@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss']
})
export class AccountViewComponent implements OnInit {
  userData: AppUser = {
    uid: '',
    firstName: '',
    lastName: '',
    profileUrl: '',
    bio: '',
    email: '',
    privacy: {
      isPublic: false,
      getEmail: true,
    }
  };
  updated = false;
  imageUploaded = false;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  constructor(private user: UserService,
              private storage: AngularFireStorage,
              private router: Router,
              private utilities: UtilitiesService) { }

  ngOnInit(): void {
    this.user.uid.pipe(
      switchMap((res) => {
        if (res) {
          return this.user.getUser(res);
        }
        return of(null);
      })
    ).subscribe((res) => {
      if (res) {
        this.userData = res;
        if (!this.userData.privacy) {
          this.userData.privacy = {
            isPublic: false,
            getEmail: true
          };
          this.user.updateUser(this.userData.uid, this.userData);
        }
      }
    });
  }

  getImage(img: string) {
    return this.utilities.getImage(img);
  }
  async updateUser() {
    await this.user.updateUser(this.userData.uid, this.userData);
    this.updated = true;
  }

  logout() {
    this.user.logout();
    this.router.navigateByUrl('/');
  }

  startUploadProfile(fileInput: any) {
    // The storage path
    const path = `wall/${Date.now()}_${fileInput.target.files[0].name}`;
    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // // The main task
    this.task = this.storage.upload(path, fileInput.target.files[0]);
    this.imageUploaded = true;
    this.task.snapshotChanges().pipe(
      finalize(async () =>  {
        this.imageUploaded = false;
        this.userData.profileUrl = await ref.getDownloadURL().toPromise();
        this.updateUser();
      }),
    ).subscribe();
  }
}
