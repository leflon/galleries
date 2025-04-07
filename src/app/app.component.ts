import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {provideIcons} from '@ng-icons/core';
import {matDelete} from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  viewProviders: [provideIcons({matDelete})],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GALLERIES';
  protected readonly console = console;

  async ngOnInit() {
  }
}
