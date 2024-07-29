import { Pipe, PipeTransform } from '@angular/core';
import { AppServiceService } from '../Services/app-service.service';
import { FlightsComponent } from '../flights/flights.component';

@Pipe({
  name: 'searchFlightByAirport'
})
export class SearchFlightByAirportPipe implements PipeTransform {
  constructor(private appService: AppServiceService,flight:FlightsComponent) {}

  transform(flights: any[], airportName: string): any[] {
    if (!airportName) {
      return flights;
    }

    const filteredFlights: any[] = [];
    const searchBody = {
      airportName: airportName
    };
    
    this.appService.searchFlightsByAirportName(searchBody);
    
    for (const flight of this.appService.flightsByAirportName) {
      if (
        flight.departure_Airport_Name.toLowerCase().includes(airportName.toLowerCase()) ||
        flight.arrival_Airport_Name.toLowerCase().includes(airportName.toLowerCase())
      ) {
        filteredFlights.push(flight);
      }
    }

    return filteredFlights;
  }
}
