import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../Services/app-service.service';

@Component({
  selector: 'app-my-flight',
  templateUrl: './my-flight.component.html',
  styleUrls: ['./my-flight.component.css']
})
export class MyFlightComponent implements OnInit{
constructor(public appservice:AppServiceService){}
//this.appservice.reservedFlightById
userNameReserved:any[]=[];
myflight :any[]=[]
flightReserved:any[]=[];
airports:any[]=[];
idss:any =localStorage.getItem("userId");
  ngOnInit(): void {
    this.appservice.GetAllReservedFlightsById(this.idss).subscribe((resp:any[])=>{
      this.myflight=resp;
      console.log("myflight");
      console.log(this.myflight);
  }, 
  err => {
    console.log("error");
    console.log(err.status);
  });

  console.log("hiiiii");
  console.log(this.appservice.reservedFlightById);
  console.log("hiiiii");

  this.appservice.GetAllUsers().subscribe((resp: any[]) => {
    this.userNameReserved = resp;
    console.log(this.userNameReserved);

  }, err => {
    console.log(err.status);
  });


  this.appservice.GetAllFlights().subscribe((resp: any[]) => {
    this.flightReserved = resp;
    console.log(this.flightReserved);
  }, err => {
    console.log(err.status);
  });
  this.appservice.GetAllAirports().subscribe(
    (airports: any) => {
      this.airports = airports;
      console.log(this.airports);
    },
    (err) => {
      console.log(err.status);
    }
  );

  }

  

  getUserNameById(userid: number): string {
    const user = this.userNameReserved.find(userNameReserved => userNameReserved.user_Id === userid);
    return user ? user.user_Name : '';
  }

  getFlightNameById(flightid: number): string {
    const flightReserved = this.flightReserved.find(flightReserved => flightReserved.flight_Id === flightid);
    return flightReserved ? flightReserved.flight_Name : '';
  }
  getFlightPriceById(flightid: number): number {
    const flightReserved = this.flightReserved.find(flightReserved => flightReserved.flight_Id === flightid);
    
    return flightReserved.price ? flightReserved.price : 0;
  }
  getFlightAirportDById(departure_Airport_Id: number): number {
    const flightReserved = this.airports.find(airports => airports.airport_Id === departure_Airport_Id);
    
    return flightReserved.price ? flightReserved.price : 0;
  }

}
















