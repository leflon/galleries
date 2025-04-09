import {Component, input, output} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {matClose} from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-media-tag',
  imports: [
    NgIcon
  ],
  viewProviders: [provideIcons({matClose})],
  templateUrl: './media-tag.component.html',
  styleUrl: './media-tag.component.css'
})
export class MediaTagComponent {
  deletable = input(false);
  delete = output();
  type = input<'light' | 'dark'>('dark');
}
