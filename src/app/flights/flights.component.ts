import { Component,OnInit } from '@angular/core';
import { AppServiceService } from '../Services/app-service.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  constructor(public appservice:AppServiceService){}
  _searchName:string='';
  _airportName:string='';
  ngOnInit(): void {
    this.appservice.getAllFlights();
  }
}
