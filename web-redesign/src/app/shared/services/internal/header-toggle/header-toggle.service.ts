import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderToggleService {
  private headerToggle: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  headerToggleChanged = this.headerToggle.asObservable();

  constructor() { }

  changeHeaderToggle(active: boolean): void {
    this.headerToggle.next(active);
  }
}

