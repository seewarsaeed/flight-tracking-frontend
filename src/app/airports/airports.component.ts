import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../Services/app-service.service';

@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  styleUrls: ['./airports.component.css']
})
export class AirportsComponent implements OnInit {
  constructor(public appservice:AppServiceService){}
  ngOnInit(): void {
    this.appservice.getAllAirports();
  }
}
