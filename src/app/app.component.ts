import {Component, inject} from '@angular/core';
import {LoginButtonComponent} from './components/login-button/login-button.component';
import {RouterOutlet} from '@angular/router';

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
