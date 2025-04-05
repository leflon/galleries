import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginButtonComponent } from './components/login-button/login-button.component';

@Component({
  selector: 'app-root',
  imports: [LoginButtonComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GALLERIES';

  async ngOnInit() {
  }
}
