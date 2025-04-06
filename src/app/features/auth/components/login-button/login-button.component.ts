import {AsyncPipe, NgIf, NgOptimizedImage} from '@angular/common';
import {Component, inject} from '@angular/core';
import {AuthService} from '../../../../shared/services/auth.service';

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
  protected readonly JSON = JSON;

  toggleAuth() {
    if (this.authService.isLoggedIn())
      this.authService.logout();
    else
      this.authService.loginWithGoogle();
  }
}
