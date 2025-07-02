import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  
  @Input()
  public title: string = "";

  public loggedIn: boolean = false;
  public userName: string = "";
  public logout() : void
  {
    console.log("LogOut");
  }
}
