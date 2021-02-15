import { UserService } from './../../../shared/services/user/user.service';
import { PrayerWall } from './../../../shared/interfaces/prayer-wall';
import { WallService } from './../../../shared/services/wall/wall.service';
import { PrayerItemsService } from './../../../shared/services/prayer-items/prayer-items.service';
import { PrayerItem } from 'src/app/shared/interfaces/prayer-item';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck, shareReplay, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';

declare const $: any;
@Component({
  selector: 'app-wall-view',
  templateUrl: './wall-view.component.html',
  styleUrls: ['./wall-view.component.scss']
})
export class WallViewComponent implements OnInit {
  newItem: PrayerItem;
  wallData: PrayerWall;
  id: Observable<string>;
  currentUid: string;
  loggedIn = false;
  justAdded = false;
  justRemoved = false;
  members: any[] = [];
  constructor(private itemService: PrayerItemsService,
              private wall: WallService,
              private user: UserService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user.uid.subscribe((res) => {
      if (res) {
        this.loggedIn = true;
        this.currentUid = res;
        this.newItem.type = 'public';
      }
    });

    this.id = this.route.params.pipe(
      pluck('id'),
      shareReplay(1)
    );

    this.id.pipe(
      switchMap((id) => {
        console.log(id);
        return this.wall.getWallData(id);
      })
    ).subscribe((res) => {
      console.log(res);
      this.wallData = res;
    });

    this.id.pipe(
      switchMap((id) => {
        return this.wall.getMembers(id);
      })
    ).subscribe((res) => {
      console.log(res);
      this.members = res;
    });

    this.newItem = this.setDefaultNewItem();
  }

  setDefaultNewItem() {
    const data = {
      text: '',
      numResponses: 0,
      numViews: 0,
      prayerId: '',
      type: 'anonymous',
      tags: [],
      prayedIds: [],
      createdAt: null,
      updatedAt: null
    };
    if (this.currentUid) {
      data.type = 'public';
    }
    return data;
  }

  async addPrayerItem() {
    if (this.newItem.text.trim().length > 0) {
      this.newItem.createdAt = firebase.firestore.FieldValue.serverTimestamp();
      this.newItem.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
      if (this.newItem.type === 'public') {
        this.newItem.uid = this.currentUid;
      }
      await this.itemService.addItem(this.wallData.id, this.newItem);
      this.newItem = this.setDefaultNewItem();
    }
  }

  checkMembership() {
    if (this.currentUid) {
      const uids = this.members.map((res) => {
        return res.uid;
      });
      return uids.indexOf(this.currentUid);
    }
    return false;
  }

  checkCreator() {
    if (this.currentUid) {
      const uids = this.members.filter((res) => {
        return res.status === 'creator';
      }).map(res => res.uid);
      return uids.indexOf(this.currentUid);
    }
    return false;
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

  async addMember() {
    await this.wall.addMember(this.wallData.id, this.currentUid);
    this.justAdded = true;
  }

  async unfollow() {
    await this.wall.removeMember(this.wallData.id, this.currentUid);
    this.justRemoved = true;
  }

}
