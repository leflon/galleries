import {Component, HostListener, inject, Input, output} from '@angular/core';
import {IMedia} from '../../models/media.model';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {matChevronLeft, matChevronRight, matClose} from '@ng-icons/material-icons/baseline';
import {ActivatedRoute, Router} from '@angular/router';
import {PopupComponent} from '../../../../shared/components/popup/popup.component';
import {ButtonComponent} from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-fullscreen-media',
  imports: [
    NgIcon,
    PopupComponent,
    ButtonComponent
  ],
  viewProviders: [provideIcons({matClose, matChevronRight, matChevronLeft})],
  templateUrl: './fullscreen-media.component.html',
  styleUrl: './fullscreen-media.component.css'
})
export class FullscreenMediaComponent {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  @Input()
  data!: IMedia;

  @Input()
  nextId: string | null = null;
  @Input()
  previousId: string | null = null;

  closed = output<void>();

  escapeFullscreen() {
    this.router.navigate(['.'], {relativeTo: this.activatedRoute});
  }

  @HostListener('window:keydown', ['$event'])
  keyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Escape':
        this.escapeFullscreen();
        break;
      case 'ArrowLeft':
        if (this.previousId) this.router.navigate([this.previousId], {relativeTo: this.activatedRoute});
        break;
      case 'ArrowRight':
        if (this.nextId) this.router.navigate([this.nextId], {relativeTo: this.activatedRoute});
        break;
    }
  }
}
