import { Component,OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppServiceService } from 'src/app/Services/app-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  constructor(public appservice:AppServiceService){}
  numberOfAirports: number = 0;
  numberOfRegisteredUsers: number = 0;
  flightWithMaxNumOfReserved:any;
  maxFlightName :any;
  maxFlighNumber:any;
  maxFlightPrice:any;
  flightName:any;
  reservedFlight:any;
  airports: any[] = [];
  testimonials: any[] = [];
  userNameReserved:any[]=[];
  flightReserved:any[]=[];
  userNameTestimonial: any[] = [];
  ngOnInit(): void {
    this.appservice.getNumberOfRegisteredUsers().subscribe(
      (registeredUsers: number) => {
        this.numberOfRegisteredUsers = registeredUsers;
        console.log(this.numberOfRegisteredUsers);
      },
      (err) => {
        console.log(err.status);
      });
      this.appservice.getNumberOfAirports().subscribe(
        (numOfAirports: number) => {
          this.numberOfAirports = numOfAirports;
          console.log(this.numberOfAirports);
          this.appservice.getAllReservedFlights();
        },
        (err) => {
          console.log(err.status);
        });   
        this.appservice.getFlightsWithMaxReservedSeats().subscribe(
          (flights: any[]) => {
            if (flights.length > 0) {
              const maxReservedFlight = flights[0];
              this.flightWithMaxNumOfReserved = maxReservedFlight;
              console.log(this.flightWithMaxNumOfReserved);
        
              this.maxFlightName = maxReservedFlight.flight_Name;
              this.maxFlighNumber = maxReservedFlight.numberofreservedseats; 
              this.maxFlightPrice = maxReservedFlight.price;
              console.log(this.maxFlightName);
              console.log(this.maxFlighNumber);
              console.log(this.maxFlightPrice);
            }
          },
          (err) => {
            console.log(err.status);
          }
        );
        this.appservice.getAllReservedFlightsObserv().subscribe(
          (reservedFlights: any[]) => {
            this.reservedFlight = reservedFlights;
            console.log(this.reservedFlight);   
          },
          (err) => {
            console.log(err.status);
          }
        );
            this.appservice.GetAllAirports().subscribe(
          (airports: any) => {
            this.airports = airports;
            console.log(this.airports);
          },
          (err) => {
            console.log(err.status);
          }
        );
        this.appservice.GetAlltestimonials().subscribe(
          (testimonials: any) => {
            this.testimonials = testimonials;
            console.log(this.testimonials);
          },
          (err) => {
            console.log(err.status);
          }
        );
        this.appservice.GetAllUsers().subscribe((resp: any[]) => {
          this.userNameReserved = resp;
          this.userNameTestimonial = resp;
          console.log(this.userNameReserved);
          console.log(this.userNameTestimonial);
        }, err => {
          console.log(err.status);
        });
        this.appservice.GetAllFlights().subscribe((resp: any[]) => {
          this.flightReserved = resp;
          console.log(this.flightReserved);
        }, err => {
          console.log(err.status);
        });
    
        }
        getUserNameByIdReserved(userid: number): string {
          const user = this.userNameReserved.find(userNameReserved => userNameReserved.user_Id === userid);
          return user ? user.user_Name : '';
        }
        getUserNameByIdTesti(userid: number): string {
          const user = this.userNameTestimonial.find(userNameTestimonial => userNameTestimonial.user_Id === userid);
          return user ? user.user_Name : '';
        }
        getFlightNameById(flightid: number): string {
          const flightReserved = this.flightReserved.find(flightReserved => flightReserved.flight_Id === flightid);
          return flightReserved ? flightReserved.flight_Name : '';
        }
}
