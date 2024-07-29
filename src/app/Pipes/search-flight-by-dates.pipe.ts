import { Pipe, PipeTransform } from '@angular/core';
import { AppServiceService } from '../Services/app-service.service';
import { ManageFlightComponent } from '../admin/manage-flight/manage-flight.component';

@Pipe({
  name: 'searchFlightByDates'
})
export class SearchFlightByDatesPipe implements PipeTransform {
  constructor(private appService: AppServiceService, private manageFlight: ManageFlightComponent) {}

  transform(flight: any[], fromDate: Date, toDate: Date){
    if (!fromDate && !toDate) {
      return flight;
    }else{

    return flight.filter((flight) => {
      const departureDate = new Date(flight.departure_Datetime).toISOString().split('T')[0];

      if (!fromDate) {
        return departureDate <= toDate.toString();
      }

      if (!toDate) {
        return departureDate >= fromDate.toString();
      }

      return departureDate >= fromDate.toString() && departureDate <= toDate.toString();
    })}
  }
}
