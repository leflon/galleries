import {Component, inject} from '@angular/core';
import {AsyncPipe, NgIf, NgOptimizedImage} from '@angular/common';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'login-button',
  imports: [
    NgIf,
    NgOptimizedImage,
    AsyncPipe
  ],
  templateUrl: './login-button.component.html',
  styleUrl: './login-button.component.css'
})
export class LoginButtonComponent {
  authService: AuthService = inject(AuthService);

  toggleAuth() {
    if (this.authService.isLoggedIn())
      this.authService.logout();
    else
      this.authService.loginWithGoogle();
  }

  protected readonly JSON = JSON;
}
