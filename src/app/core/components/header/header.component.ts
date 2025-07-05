import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Input() public title: string = "";
  @Input() loggedIn: boolean = false;
  @Input() userFullName: string = "";

  @Output() onLogoutClick: EventEmitter<void> = new EventEmitter<void>();

  public logout(): void {
    this.onLogoutClick.emit();
  }
}
