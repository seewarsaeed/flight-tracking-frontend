import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private nominatimApiUrl = 'https://nominatim.openstreetmap.org/search';
  constructor() { }

  async getLocationCoordinates(location: string): Promise<{ lat: number; lon: number }> {
    const url = `${this.nominatimApiUrl}?q=${encodeURIComponent(location)}&format=json`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        return { lat: parseFloat(lat), lon: parseFloat(lon) };
      } else {
        throw new Error('Geocoding API request returned no results.');
      }
    } catch (error) {
      console.error('Error while fetching geolocation:', error);
      throw new Error('Error while fetching geolocation.');
    }
  }

}
