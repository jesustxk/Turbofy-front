import { TestBed } from '@angular/core/testing';

import { AuthDbService } from './auth-db.service';

describe('AuthDbService', () => {
  let service: AuthDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
