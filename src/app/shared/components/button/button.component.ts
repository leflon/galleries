import {Component, computed, input, output, viewChild} from '@angular/core';

type ButtonType = 'primary' | 'secondary' | 'discrete';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  type = input<ButtonType>('primary');
  color = input<string>('');
  textColor = input<string>('');
  class = input<string>('');

  emptyContent = viewChild('noContent');
  emptyIcon = viewChild('noIcon');

  hasContent = computed(() => !this.emptyContent())
  hasIcon = computed(() => !this.emptyIcon())

  click = output<MouseEvent>();


  onClick($event: MouseEvent) {
    $event.stopPropagation();
    this.click.emit($event);
  }

}
