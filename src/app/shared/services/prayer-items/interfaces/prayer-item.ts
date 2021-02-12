export interface PrayerItem {
  text: string;
  uid?: string;
  numResponses: number;
  prayerId: string;
  type: string;
  numViews: number;
  tags: string[];
  prayedIds: string[];
}

export interface Response {
  uid?: string;
  text: string;
  itemId: string;
  responseId: string;
}
