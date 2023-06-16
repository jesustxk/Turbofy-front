import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  async getGeolocation() {
    const position = await Geolocation.getCurrentPosition();

    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };
  }

}
