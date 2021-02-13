import firebase from 'firebase/app';

export interface PrayerWall {
  numMembers: number;
  numPrayers: number;
  title: string;
  id: string;
  description: string;
  profileUrl: string;
  backgroundUrl: string;
  timestamp: TimestampObj;
  creator: string;
}

export interface TimestampObj {
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
}

