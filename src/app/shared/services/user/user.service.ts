import { AppUser } from '../../interfaces/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first, switchMap, take, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  inTabs = false;
  inAuth = false;
  signedIn = false;
  users: any = {};
  userIds = [];
  dataObj: any = {};
  firstTime = false;
  currentUser: firebase.User;
  data = new Subject<AppUser>(); // Used for Route Guards, to access data, use getUser(<uid>) function
  uid = new BehaviorSubject<string>(null);
  initialLoad: any;

  constructor(private auth: AngularFireAuth,
              private fun: AngularFireFunctions,
              private afs: AngularFirestore) {
    // Gets the current auth state when the user loads into the application
    auth.authState.pipe(
      switchMap((user: firebase.User) => {
        if (user) {
          const uid = user.uid;
          this.currentUser = user;
          this.uid.next(uid);
          this.dataObj = {
            uid,
          };

          if (user.email) {
            this.dataObj.email = user.email;
          }
          if (user.photoURL) {
            this.dataObj.imageUrl = user.photoURL;
          }
          if (user.displayName) {
            this.dataObj.name = user.displayName;
          }
          this.findOrCreate(`/users/${uid}`, this.dataObj);
          return this.afs.doc<AppUser>(`/users/${uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    ).subscribe(
      (res: AppUser) => {
        this.users = {};
        this.userIds = [];
        this.data.next(res);
        if (res) {
          this.inTabs = true;
          this.inAuth = false;
        } else {
          this.inAuth = true;
          this.inTabs = false;
        }
      }
    );
  }

  /**
   * Gets the current auth state
   */
  getAuthState() {
    return this.auth.authState;
  }

  /**
   * Checks whether or not the user is currently logged in
   */
  isLoggedIn() {
    return this.auth.authState.pipe(first());
  }

  /**
   * Checks whether or not the current email is found in the database
   * @param email - email to find
   */
  findEmail(email: string) {
    return this.afs.collection('users', ref => ref.where('email', '==', email)).valueChanges().pipe(take(1)).toPromise();
  }

  /**
   * Sends a password reset email
   * @param email - Email to send reset email to
   */
  sendPasswordResetEmail(email: string) {
    const callable = this.fun.httpsCallable('sendPasswordResetEmail');
    return callable({email}).pipe(take(1)).toPromise();
  }

  /**
   * Reauthenticates a uesr before changing password
   * @param email - Email
   * @param password - Password
   */
  reauthenticateUser(email: string, password: string) {
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return this.currentUser.reauthenticateWithCredential(credential);
  }

  /**
   * Changes a user's password
   * @param newPassword - New Password
   */
  async changePassword(newPassword: string) {
    return this.currentUser.updatePassword(newPassword);
  }

  /**
   * Changes a user's email
   * @param email - Email
   */
  changeEmail(email: string) {
    this.currentUser.updateEmail(email);
  }

  /**
   * Create a user account
   * @param email - Email
   * @param password - Password
   */
  createAccount(email, password): Promise<firebase.auth.UserCredential> {
    this.signedIn = true;
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  /**
   * Log a user in
   * @param email - Email
   * @param password - Password
   */
  login(email, password): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(
      email,
      password
    );
  }

  /**
   * Checks if a document exists
   * @param path - Document Path
   */
  docExists(path: string) {
    return this.afs.doc(path).valueChanges()
      .pipe(first()).toPromise();
  }

  /**
   * Get a user document
   * @param uid - User ID
   */
  getUser(uid: string): Observable<AppUser> {
    if (this.userIds.indexOf(uid) !== -1) {
      return of(this.users[uid]);
    }
    return this.afs.doc<AppUser>(`users/${uid}`).valueChanges()
      .pipe(tap((res: AppUser) => {
        if (res) {
          this.userIds.push(res.uid);
          this.users[res.uid] = res;
        }
    }));
  }

  /**
   * Update a User
   * @param uid - User ID
   * @param data - Data Payload
   */
  updateUser(uid: string, data: any) {
    return this.afs.doc(`users/${uid}`).set(data, {merge: true});
  }

  /**
   * Checks whether or not current doc exists
   * If not, it will create it
   * @param path - Data Path
   * @param data - Data
   */
  async findOrCreate(path: string, data: any) {
    const doc = await this.docExists(path);
    if (doc) {
      return true;
    } else {
      await this.afs.doc(path).set(data, {merge: true});
      return false;
    }
  }

  /**
   * Function to log a user out
   */
  async logout() {
    this.auth.signOut();
    this.signedIn = false;
  }
}
