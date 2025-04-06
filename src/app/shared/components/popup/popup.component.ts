import {Component, output} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {matClose} from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-popup',
  imports: [
    NgIcon
  ],
  viewProviders: [provideIcons({matClose})],
  host: {
    '(window:keydown)': 'handleEscape($event)'
  },
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  closed = output<void>();

  handleEscape(e: KeyboardEvent) {
    if (e.key === 'Escape') this.closed.emit();
  }
}
