import { TestBed } from '@angular/core/testing';

import { TurbofyApiService } from './turbofy-api.service';

describe('TurbofyApiService', () => {
  let service: TurbofyApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurbofyApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
