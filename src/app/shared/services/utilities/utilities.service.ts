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

  /**
   * Capitalizes a given word.
   * @param word - The word to capitalize
   */
  capitalize(word: string): string {
    return word.slice(0, 1).toUpperCase() + word.slice(1);
  }

  /**
   * Shuffles an array
   * @param array - Array
   */
  shuffle(array: any[]) {
    // tslint:disable-next-line: one-variable-per-declaration
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
