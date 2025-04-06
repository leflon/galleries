import {inject, Injectable} from '@angular/core';
import {Auth, authState, GoogleAuthProvider, signInWithPopup, signOut, User} from '@angular/fire/auth';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth: Auth = inject(Auth);
  user$: Observable<User | null> = authState(this.auth);

  isLoggedIn() {
    return !!this.auth.currentUser;
  }

  async loginWithGoogle() {
    await signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    return signOut(this.auth);
  }
}
