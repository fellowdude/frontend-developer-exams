import { Component } from '@angular/core';
import { HeaderToggleService } from './shared/services/internal/header-toggle/header-toggle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web-redesign';
  headerActive: boolean = false;
  constructor(private headerToggleService: HeaderToggleService) {
    this.headerToggleService.headerToggleChanged.subscribe({
      next: (response) => {
        this.headerActive = response;
      }
    })
  }
}
