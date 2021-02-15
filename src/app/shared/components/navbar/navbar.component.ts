import { UtilitiesService } from './../../services/utilities/utilities.service';
import { AppUser } from './../../interfaces/user';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

declare const $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loggedIn = false;
  userData: AppUser;
  errorMessage = '';
  newUser: AppUser = {
    firstName: '',
    lastName: '',
    email: '',
    profileUrl: '',
    bio: '',
    uid: ''
  };
  isNewUser = false;
  password: string;
  constructor(private user: UserService, private utilities: UtilitiesService) { }

  ngOnInit(): void {
    this.user.uid.pipe(
      tap((res) => {
        if (res) {
          this.loggedIn = true;
          if (this.isNewUser) {
            this.newUser.uid = res;
            this.user.updateUser(res, this.newUser);
            this.isNewUser = false;
          }
        } else {
          this.loggedIn = false;
        }
      }),
      switchMap((res) => {
        if (res) {
          return this.user.getUser(res);
        }
        return of(null);
      })
    ).subscribe((data) => {
      this.userData = data;
    });
  }

  signUp() {
    this.user.createAccount(this.newUser.email, this.password)
      .then((res) => {
        this.isNewUser = true;
        $('#signUpModal').modal('hide');
      }).catch((err) => {
        if (err.code === 'auth/weak-password') {
          this.errorMessage = 'Your password is too weak';
        } else if (err.code === 'auth/invalid-email') {
          this.errorMessage = 'An invalid email was inputted';
        } else {
          this.errorMessage = 'An account with that email already exists, try logging in';
        }
      });
  }

  login() {
    this.user.login(this.newUser.email, this.password)
      .then(() => {
        $('#loginModal').modal('hide');
        this.loggedIn = true;
      }).catch((err) => {
        if (err.code === 'auth/user-not-found') {
          this.errorMessage = 'An account with your email was not found';
        } else if (err.code === 'auth/wrong-password') {
          this.errorMessage = 'Incorrect password, please try again'
        }
      });
  }

  getImage(img: string) {
    return this.utilities.getImage(img);
  }

}
