import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  async getGeolocation() {
    try {
      const position = await Geolocation.getCurrentPosition();

      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
    } catch (err) {
      return {
        latitude: 0,
        longitude: 0
      };
    }
  }

}
