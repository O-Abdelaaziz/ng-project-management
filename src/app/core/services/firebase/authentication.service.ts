import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  authState,
  signOut,
  user,
  signInWithPopup,
  GoogleAuthProvider,
  ActionCodeSettings,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from '@angular/fire/auth';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authentication = inject(Auth);
  private snackBar = inject(MatSnackBar);

  public authenticationState = authState(this.authentication);
  public user = user(this.authentication);



  loginWithGoogle = () => signInWithPopup(
    this.authentication,
    new GoogleAuthProvider()
  )

  sendAuthLink(email: string, acs: ActionCodeSettings) {
    return sendSignInLinkToEmail(this.authentication, email, acs);
  }

  loginWithEmailLink() {
    if (isSignInWithEmailLink(this.authentication, location.href)) {
      let email = localStorage.getItem('emailForSignIn');

      if (!email) {
        email = prompt('Please provide your email for confirmation');
      }

      signInWithEmailLink(this.authentication, email!, location.href);
    }
  }

  signOut = () => signOut(this.authentication);

}
