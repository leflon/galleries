import {Component, inject} from '@angular/core';
import {LoginButtonComponent} from './components/login-button/login-button.component';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth-page',
  imports: [
    LoginButtonComponent
  ],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css'
})
export class AuthPageComponent {
  authService = inject(AuthService);
  router = inject(Router);

  constructor() {
    this.authService.user$.subscribe(user => {
      if (user)
        this.router.navigate(['/my-galleries']);
    });
  }
}
