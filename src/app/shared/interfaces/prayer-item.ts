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

export interface PrayerResponse {
  uid?: string;
  text: string;
  type: string;
  itemId: string;
  responseId: string;
}
