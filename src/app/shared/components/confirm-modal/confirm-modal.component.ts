import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  standalone: false,
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModalComponent {
  @Input() title!: string;
  @Input() message!: string;

  close: (result: boolean) => void = () => { };
}
