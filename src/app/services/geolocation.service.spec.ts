import { TestBed } from '@angular/core/testing';

import { GeolocationService } from './geolocation.service';

describe('GeolocationService', () => {
  let service: GeolocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeolocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get geolocation not null', () => {
    expect(service.getGeolocation).toBeTruthy();
  });

  it('get geolocation equals', () => {
    expect(service.getGeolocation).toEqual(service.getGeolocation);
  });

});
