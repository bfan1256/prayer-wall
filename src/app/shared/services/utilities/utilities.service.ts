import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  getImage(img: string) {
    if (img) {
      return img;
    }
    return '/assets/images/default-profile.png';
  }
}
