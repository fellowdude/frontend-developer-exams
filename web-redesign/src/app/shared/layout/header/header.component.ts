import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  loggued: boolean = false;
  activeMenu: boolean = false;

  ngOnInit(): void {
    if(localStorage.getItem('token') || sessionStorage.getItem('token')){
      this.loggued = true;
    }
  }

  logout(): void {
    this.loggued = false;
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
  }

  toggleMenu(): void {
    this.activeMenu = !this.activeMenu;
  }
}
