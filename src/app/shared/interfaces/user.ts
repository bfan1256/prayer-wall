/**
 * AppUser, AppUserAuth, Promotions
 * Structs used to standardize data returned from the firestore database
 */
export interface AppUser {
  firstName: string;
  lastName: string;
  email: string;
  profileUrl: string;
  bio: string;
  uid: string;
  privacy?: Privacy;
}

export interface AppUserAuth {
  email: string;
  password: string;
}

export interface Privacy {
  isPublic: boolean;
  getEmail: boolean;
}
