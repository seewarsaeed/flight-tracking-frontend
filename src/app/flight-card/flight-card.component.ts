import { Component,Input,OnInit,ViewChild,TemplateRef } from '@angular/core';
import { AppServiceService } from '../Services/app-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe, getLocaleDateFormat } from '@angular/common';
import jwt_decode from "jwt-decode";
import jsPDF from 'jspdf';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.css']
})

export class FlightCardComponent implements OnInit {
  constructor(public appservice:AppServiceService, public dialog:MatDialog,private toastr:ToastrService,private spinner:NgxSpinnerService){}
  @ViewChild('callCreatePayDialog') callCreatePayDialog!:TemplateRef<any>
  @Input() Flight_Id:number|undefined;
  @Input() Flight_Name :string|undefined; 
  @Input() Price:number|undefined;
  @Input() numberOfSeats:number|undefined;
  @Input() Image_Name:string|undefined;
  @Input() DepartureInfo:string|undefined;
  @Input() ArrivalInfo:string|undefined;
  @Input() DepartureId:number|undefined;
  @Input() ArrivalId:number|undefined;
  @Input() Arrival_Status:string|undefined;
  airports:any[]=[];
  flights:any[]=[];
  role_id:any;
  user_id:any;
  user:any;
  flight:any;
  cards:any[]=[];
  currentTime: string = new Date().toString();
  flight_id:any;
  ngOnInit(): void {
    this.appservice.GetAllFlights().subscribe((resp: any[]) => {
      this.flights = resp;
      console.log(this.flights);
    }, err => {
      console.log(err.status);
    });
    this.appservice.GetAllAirports().subscribe((resp: any[]) => {
      this.airports = resp;
      console.log(this.airports);
    }, err => {
      console.log(err.status);
    });
    this.appservice.GetAllBanks().subscribe((resp: any[]) => {
      this.cards = resp;
      console.log(this.cards);
    }, err => {
      console.log(err.status);
    });
    this.role_id=localStorage.getItem('role');
    this.user_id=localStorage.getItem('userId');
    this.appservice.GetUserById(this.user_id).subscribe(
      (user: any) => {
        this.user = user;
        console.log(this.user);
      },
      (err) => {
        console.log(err.status);
      }
    );

  }
  getAirportNameById(airportId: number): string {
    const airport = this.airports.find(airport => airport.airport_Id === airportId);
    return airport ? airport.location : '';
  }
  isButtonDisabled(): boolean {
    return (this.role_id !== '2') || (this.numberOfSeats === 0) || (this.Arrival_Status==="true");
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
    this.appservice.GetFlightById(this.flight_id).subscribe((resp: any[]) => {
      this.flight = resp;
      console.log("fligth in open",this.flight);
    }, err => {
      console.log(err.status);
    });
    this.dialog.open(this.callCreatePayDialog);
  }

  reserveFlight(){
  this.spinner.show();
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
          this.appservice.updateBank(CardExists[0]);
          this.flight.numberofemptyseats-=this.createForm.controls['numberofseats'].value;
          this.flight.numberofreservedseats+=this.createForm.controls['numberofseats'].value;
          this.appservice.updateFlight(this.flight);
          this.createForm.controls['reservation_Date'].setValue(new Date());
          this.createForm.controls['paid_Status'].setValue('true');
          this.createForm.controls['email_Status'].setValue('true');
          this.createForm.controls['flight_Id'].setValue( this.flight_id);
          this.createForm.controls['user_Id'].setValue(this.user_id);
          this.appservice.createReservedFlights(this.createForm.value);
          const pdfAttachmentData = this.generateInvoicePDF(this.createForm.controls['reservation_Date'].value ,this.createForm.controls['numberofseats'].value ,this.flight,this.user);
          const pdfBase64 = btoa(String.fromCharCode(...pdfAttachmentData));
          const emailRequest = {
            toEmail: this.user.email,
            subject: 'Your Reservation Invoice',
            body: 'Thank you for your reservation. Please find the attached invoice PDF.',
            pdfAttachment: pdfBase64, 
          };
          this.appservice.sendEmail(emailRequest);
          console.log("done success");
          this.toastr.success("Reservation and payment process succeed. Enjoy your flight.");
          this.spinner.hide();
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
}
