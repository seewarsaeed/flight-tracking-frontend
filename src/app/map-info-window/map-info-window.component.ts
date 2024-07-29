import { Component , OnInit, TemplateRef, ViewChild,VERSION } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { AppServiceService } from '../Services/app-service.service';
import {MatDialog} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeocodingService } from '../Services/geocoding.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-map-info-window',
  templateUrl: './map-info-window.component.html',
  styleUrls: ['./map-info-window.component.css']
})
export class MapInfoWindowComponent implements OnInit {
  airports:any[]=[];
  flights:any[]=[];
  role_id:any;
  user_id:any;
  user:any;
  flight:any;
  cards:any[]=[];
  currentTime: string = new Date().toString();
  flight_id:any;
  @ViewChild('callCreatePayDialog') callCreatePayDialog!:TemplateRef<any>
  name = 'Angular ' + VERSION.major;
  constructor(public appService:AppServiceService,public dialog:MatDialog,private geocodingService: GeocodingService,public datepipe: DatePipe, private toastr:ToastrService) {}
  // flightById:any[]=[];
  async ngOnInit(): Promise<void> {

      const flightsResponse = await this.appService.GetAllFlights().toPromise();
      this.flights = flightsResponse;
      console.log(this.flights);
  
      const airportsResponse = await this.appService.GetAllAirports().toPromise();
      this.airports = airportsResponse;
      console.log(this.airports);
      const banksResponse=await this.appService.GetAllBanks().toPromise();
      this.cards=banksResponse;
      console.log(this.cards);
      this.role_id= await localStorage.getItem('role');
      console.log(this.role_id);
      this.user_id=await localStorage.getItem('userId');
      console.log(this.user_id);
      const userbyidResponse=await this.appService.GetUserById(this.user_id).toPromise();
      this.user=userbyidResponse;
      console.log(this.user);
      const Flightvalue = this.flights;
      const AirportValue = this.airports;
      console.log(this.flights);
      console.log(Flightvalue.length);
  
      for (var i = 0; i < Flightvalue.length; i++) {
        for(var j=0;j<AirportValue.length;j++)
        {
          if (Flightvalue[i].departure_Airport_Id == AirportValue[j].airport_Id && Flightvalue[i].arrival_Status!="true") {
            const { lat, lon } = await this.geocodingService.getLocationCoordinates(AirportValue[j].location);
            console.log("lat",lat);
            console.log("lon",lon);
            this.markerPositions.push({ lat: lat, lng: lon });
    
            console.log("_______________G______________________________________________________");
          }

        }
        
      }

    
  }
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;
    center: google.maps.LatLngLiteral = {
        lat: 24,
        lng: 12
    };
    markerPositions: google.maps.LatLngLiteral[] = [];
    zoom = 4;
    
    // addMarker(event: google.maps.MapMouseEvent) {
    //     if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());
    // }
    location:string='';
    newlat:number=0;
    resultOfsub:number=0;
    
    min:number=0;
        async openInfoWindow(marker: MapMarker,_lat:number,_lng:number) {
              if (this.infoWindow != undefined) this.infoWindow.open(marker);  
              const Flightvalue=this.flights;
              const AirportValue=this.airports;
              this.min=10000000000000000000000000;
              for(var i=0;i<Flightvalue.length;i++){
                for(var j=0;j<AirportValue.length;j++){
                  if(Flightvalue[i].departure_Airport_Id==AirportValue[j].airport_Id && Flightvalue[i].arrival_Status!="true")
                    {
                          const { lat, lon } = await this.geocodingService.getLocationCoordinates(AirportValue[j].location);
                              this.resultOfsub=lat-_lat;
                              if(this.resultOfsub< 0)
                              {
                                this.resultOfsub*=-1;
                              }
                              if(this.resultOfsub<this.min)
                              {
                                this.min=this.resultOfsub;
                                this.newlat=lat;
                              }
                    }   
                
                }
                    
                }
                console.log('flight=>'+this.newlat);
                console.log('marker=>'+_lat);               
        for(var i=0;i<Flightvalue.length;i++)
        {
          for(var j=0;j<AirportValue.length;j++){
            if(Flightvalue[i].departure_Airport_Id==AirportValue[j].airport_Id && Flightvalue[i].arrival_Status!="true")
          {
            const { lat, lon } = await this.geocodingService.getLocationCoordinates(AirportValue[j].location);
  
            if(lat==this.newlat)
            {
              this.BookForm.controls['Flight_ID'].setValue (Flightvalue[i].flight_Id); 
              this.BookForm.controls['Flight_Name'].setValue (Flightvalue[i].flight_Name); 
              this.BookForm.controls['Price'].setValue (Flightvalue[i].price); 
              this.BookForm.controls['NumberOfEmptySeats'].setValue (Flightvalue[i].numberofemptyseats); 
              this.BookForm.controls['NumberOfReservedSeats'].setValue (Flightvalue[i].numberofreservedseats); 

              this.BookForm.controls['Departure_dateTime'].setValue (Flightvalue[i].departure_Datetime); 
              this.BookForm.controls['Arrival_dateTime'].setValue (Flightvalue[i].arrival_Datetime); 
              this.BookForm.controls['Arrival_status'].setValue (Flightvalue[i].Arrival_status); 
              // this.BookForm.controls['AdditionalCost'].setValue (Flightvalue[i].additionalcost); 
              this.BookForm.controls['Image_Name'].setValue (Flightvalue[i].image_Name); 

              this.BookForm.controls['Departure_Airport_ID'].setValue (Flightvalue[i].departure_Airport_Id); 
              this.BookForm.controls['Arrival_Airport_ID'].setValue (Flightvalue[i].arrival_Airport_Id); 


              this.ReservedFlightForm.controls['Flight_ID'].setValue (Flightvalue[i].flight_Id); 
            }
          }
          }
          
         }
       
    }
    display: any;
    moveMap(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) 
        this.center = (event.latLng.toJSON());
  }
    move(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) 
        this.display = event.latLng.toJSON();
  }


  // Book(){
  //   const router:Router=new Router();
  //   const token=localStorage.getItem('token');
  //   if(token){
  //   let user:any=localStorage.getItem('user');
  //   user=JSON.parse(user); //because we stored user as stringify
  //   if(user.Role=='2'){ 
  //     let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
  //     // if((this.BookForm.controls['NumberOfEmptySeats'].value !=0) && (this.BookForm.controls['Departure_dateTime'].value > String(currentDateTime)?true:false)){
  //     if((this.BookForm.controls['NumberOfEmptySeats'].value !=0)){
  //       this.ReservedFlightForm.controls['Date'].setValue (currentDateTime); 
  //       this.ReservedFlightForm.controls['PaidStatus'].setValue ('Unpaid');
  //     this.ReservedFlightForm.controls['UserID'].setValue (user.UserID);
  //     }
  //     this.appService.createReservedFlights(this.ReservedFlightForm.value);

  //   }
  //  }
  //   else{
  //     alert('You are not authorized to access this page.'+'  '+ 'Access Denied');
  //     router.navigate(['security/register']);
  //   }

  //   }
  getAirportNameById(airportId: number): string {
    const airport = this.airports.find(airport => airport.airport_Id === airportId);
    return airport ? airport.location : '';
  }
  isButtonDisabled(): boolean {
    return (this.role_id !== '2');
  }
  createForm:FormGroup=new FormGroup({
    reservation_Date:new FormControl('',[Validators.required,Validators.maxLength(100)]),
    paid_Status:new FormControl('false'),
    email_Status:new FormControl('false'),
    numberofseats:new FormControl('',Validators.required),
    flight_Id:new FormControl(),
    user_Id:new FormControl()
  });
  paymentForm:FormGroup=new FormGroup({
    card_Id:new FormControl(Validators.required),
    cvv:new FormControl([Validators.required, Validators.maxLength(3)]),
    expire_Date:new FormControl(Validators.required),
  });
  openReserveDialog(id:any){
    this.flight_id=id;
    console.log("flight_id",this.flight_id);
    this.appService.GetFlightById(this.flight_id).subscribe((resp: any[]) => {
      this.flight = resp;
      console.log("fligth in open",this.flight);
    }, err => {
      console.log(err.status);
    });
    this.dialog.open(this.callCreatePayDialog);
  }
  reserveFlight(){
    if(this.createForm.controls['numberofseats'].value <= this.flight.numberofemptyseats)
    {
      const CardExists = this.cards.filter(card => {
        const cardExpireDate = new Date(card.expire_Date).toISOString().split('T')[0];
        const paymentFormExpireDate = this.paymentForm.controls['expire_Date'].value;
        return card.card_Id === this.paymentForm.controls['card_Id'].value &&
               card.cvv === this.paymentForm.controls['cvv'].value.toString() &&
               cardExpireDate === paymentFormExpireDate;
      });
      if(CardExists.length > 0 && typeof(this.flight)!='undefined' && this.flight!=null){
        if(CardExists[0].balance >= this.createForm.controls['numberofseats'].value*this.flight.price)
        {
          const now_day=new Date().getDate();
          const now_month=(new Date().getMonth() + 1).toString().padStart(2, '0');
          const now_year=new Date().getFullYear();
          const now_date=now_year+"-"+now_month+"-"+now_day;
          const cardExpireDate = new Date(CardExists[0].expire_Date).toISOString().split('T')[0];
          if(cardExpireDate >= now_date )
          {
            CardExists[0].balance -=(this.createForm.controls['numberofseats'].value*this.flight.price);
            this.appService.updateBank(CardExists[0]);
            this.flight.numberofemptyseats-=this.createForm.controls['numberofseats'].value;
            this.flight.numberofreservedseats+=this.createForm.controls['numberofseats'].value;
            this.appService.updateFlight(this.flight);
            this.createForm.controls['reservation_Date'].setValue(new Date());
            this.createForm.controls['paid_Status'].setValue('true');
            this.createForm.controls['email_Status'].setValue('true');
            this.createForm.controls['flight_Id'].setValue( this.flight_id);
            this.createForm.controls['user_Id'].setValue(this.user_id);
            this.appService.createReservedFlights(this.createForm.value);
            const pdfAttachmentData = this.generateInvoicePDF(this.createForm.controls['reservation_Date'].value ,this.createForm.controls['numberofseats'].value ,this.flight,this.user);
            const pdfBase64 = btoa(String.fromCharCode(...pdfAttachmentData));
            const emailRequest = {
              toEmail: this.user.email,
              subject: 'Your Reservation Invoice',
              body: 'Thank you for your reservation. Please find the attached invoice PDF.',
              pdfAttachment: pdfBase64, 
            };
            this.appService.sendEmail(emailRequest);
            console.log("done success");
            this.toastr.success("Reservation and payment process succeed. Enjoy your flight.");
          }
          else{
            this.toastr.error("The card is expired.");
          }
        }
        else{
          this.toastr.error("The balance is not sufficient.");
        }
       
      }
      else{
        this.toastr.error("Card doesn't exits. Please enter a valid card.");
      }
    }
    else{
      this.toastr.error("The number of seats is greater than the available seats.");
    }
    
   
    }
    generateInvoicePDF(reservationDate: string, numberOfSeats: number, flight: any, user: any): Uint8Array{
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text('Reservation Invoice', 10, 20);
      doc.setFontSize(12);
      doc.text(`Reservation Date: ${reservationDate}`, 10, 40);
      doc.text(`Number of Seats: ${numberOfSeats}`, 10, 50);
      doc.text(`Flight Details: ${flight.flight_Name}, Price per seat: ${flight.price}`, 10, 60);
      doc.text(`User Details: ${user.user_Name}, Email: ${user.email}`, 10, 70);
      const pdfBytes = doc.output('arraybuffer');
      return new Uint8Array(pdfBytes);
    }
    BookForm : FormGroup= new FormGroup({
      Flight_ID:new FormControl({value: '', disabled: true}),
      Flight_Name:new FormControl({value: '', disabled: true}),
      Price:new FormControl({value: '', disabled: true}),
      NumberOfEmptySeats:new FormControl({value: '', disabled: true}),
      NumberOfReservedSeats:new FormControl({value: '', disabled: true}),
      Departure_dateTime:new FormControl({value: '', disabled: true}),

      Arrival_dateTime:new FormControl({value: '', disabled: true}),
      Arrival_status:new FormControl({value: '', disabled: true}),
      // AdditionalCost:new FormControl({value: '', disabled: true}),
      Image_Name:new FormControl({value: '', disabled: true}),
      Departure_Airport_ID:new FormControl({value: '', disabled: true}),
      Arrival_Airport_ID:new FormControl({value: '', disabled: true})
      });

      ReservedFlightForm : FormGroup= new FormGroup({
        Flight_ID:new FormControl({value: '', disabled: true}),
        Date:new FormControl({value: '', disabled: true}),
        PaidStatus:new FormControl({value: '', disabled: true}),
        NumOfSeats:new FormControl({value: '', disabled: true}),
        UserID:new FormControl({value: '', disabled: true})  
        });
}
