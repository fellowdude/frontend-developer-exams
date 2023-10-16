import { Component } from '@angular/core';
import { HeaderToggleService } from 'src/app/shared/services/internal/header-toggle/header-toggle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor( private headerToggleService: HeaderToggleService ) {
    this.headerToggleService.changeHeaderToggle(true);
  }
}
