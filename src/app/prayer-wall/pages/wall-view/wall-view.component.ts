import { UtilitiesService } from './../../../shared/services/utilities/utilities.service';
import { UserService } from './../../../shared/services/user/user.service';
import { PrayerWall } from './../../../shared/interfaces/prayer-wall';
import { WallService } from './../../../shared/services/wall/wall.service';
import { PrayerItemsService } from './../../../shared/services/prayer-items/prayer-items.service';
import { PrayerItem } from 'src/app/shared/interfaces/prayer-item';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, pluck, shareReplay, switchMap, tap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import firebase from 'firebase/app';
import { Title } from '@angular/platform-browser';

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
  tagString = '';
  justRemoved = false;
  members: any[] = [];
  profiles: string[] = [];
  constructor(private itemService: PrayerItemsService,
              private wall: WallService,
              private title: Title,
              private utilities: UtilitiesService,
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
        return this.wall.getWallData(id);
      }),
      tap((res) => {
        this.wallData = res;
        this.title.setTitle(this.wallData.title);
      })
    ).subscribe();

    this.id.pipe(
      tap(() => {
        this.members = [];
        this.profiles = [];
      }),
      switchMap((id) => {
        return this.wall.getMembers(id);
      }),
      tap((res) => {
        this.members = res;
        this.profiles = [];
      }),
      switchMap((res: any) => {
        const profiles = res.map(member => member.uid);
        return this.getProfiles(profiles);
      })
    ).subscribe((res) => {
      this.profiles.push(this.getProfileImage(res));
      console.log(this.profiles);
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
      prayerType: 'request',
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

  getProfiles(profiles: string[]) {
    let arr = profiles;
    if (profiles.length > 5) {
      arr = this.utilities.shuffle(profiles).slice(0, 5);
    }
    return from(arr).pipe(
      mergeMap((id: string) => {
        return this.user.getUser(id);
      }),
      pluck('profileUrl')
    );
  }

  async addPrayerItem() {
    if (this.newItem.text.trim().length > 0) {
      this.newItem.tags = this.tagString.split(',').map((res) => {
        return res.trim();
      });
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
