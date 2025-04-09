import {Component, computed, input} from '@angular/core';

@Component({
  selector: 'app-loading',
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  size = input<number>(32);
  color = input('#000000');

  cssSize = computed(() => this.size() + 'px');
}
