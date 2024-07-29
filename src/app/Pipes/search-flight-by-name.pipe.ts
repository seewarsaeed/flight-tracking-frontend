import { Pipe, PipeTransform } from '@angular/core';
import { AppServiceService } from '../Services/app-service.service';
import { FlightsComponent } from '../flights/flights.component';
@Pipe({
  name: 'searchFlightByName'
})
export class SearchFlightByNamePipe implements PipeTransform {
  constructor(private appService: AppServiceService,flight:FlightsComponent) {}

  transform(flight: any[], searchName: string){
    if (!searchName) {
      return flight;
    }else{
    return flight.filter((flight) => {
      return flight.flight_Name.toLowerCase().includes(searchName.toLowerCase());
    })}
  }
}
