import { TestBed } from '@angular/core/testing';

import { HeaderToggleService } from './header-toggle.service';

describe('HeaderToggleService', () => {
  let service: HeaderToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
