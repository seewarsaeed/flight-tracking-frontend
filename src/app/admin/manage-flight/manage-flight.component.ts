import { Component,OnInit,ViewChild,TemplateRef } from '@angular/core';
import { AppServiceService } from 'src/app/Services/app-service.service';
import {MatDialog} from '@angular/material/dialog';
import { CreateFlightComponent } from '../create-flight/create-flight.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-manage-flight',
  templateUrl: './manage-flight.component.html',
  styleUrls: ['./manage-flight.component.css']
})
export class ManageFlightComponent implements OnInit  {
  airports:any[]=[];
  flights:any[]=[];
  _fromDate:any;
  _toDate:any;
  constructor(public appservice:AppServiceService, public dialog:MatDialog){}
  @ViewChild('callDeleteDialog') callDeleteDialog!:TemplateRef<any>
  @ViewChild('callUpdateDialog') callUpdateDialog!:TemplateRef<any>
  ngOnInit(): void {
    // this.appservice.getAllFlights();
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
  }
  openDeleteDialog(id:number){
    const dialogRef=this.dialog.open(this.callDeleteDialog);
    dialogRef.afterClosed().subscribe((result)=>{
      if(result!=undefined){
        if(result=='yes')
        {
          this.appservice.deleteFlight(id);
        }
        else if(result=='no'){
          console.log('Thank You');
        }
      }
    })

  }
  openCreateDialog()
  {
    this.dialog.open(CreateFlightComponent);
  }
  //update flight
  updateForm : FormGroup= new FormGroup({
    flight_Id:new FormControl(),
    flight_Name:new FormControl(''),
    price:new FormControl(''),
    numberofemptyseats:new FormControl(''),
    numberofreservedseats:new FormControl(''),
    departure_Datetime:new FormControl(''),
    arrival_Datetime:new FormControl(''),
    arrival_Status:new FormControl(),
    additionalcost:new FormControl(''),
    departure_Airport_Id:new FormControl(''),
    arrival_Airport_Id:new FormControl(''),
    image_Name:new FormControl()
    });
    previousFlightData:any={};
    openUpdateDialog(flightObj:any){
      this.previousFlightData={
        flight_Id:flightObj.flight_Id, 
        flight_Name:flightObj.flight_Name, 
        price:flightObj.price,
        numberofemptyseats:flightObj.numberofemptyseats,
        numberofreservedseats:flightObj.numberofreservedseats,
        departure_Datetime:flightObj.departure_Datetime, 
        arrival_Datetime:flightObj.arrival_Datetime, 
        arrival_Status:flightObj.arrival_Status,
        additionalcost:flightObj.additionalcost,
        departure_Airport_Id:flightObj.departure_Airport_Id,
        arrival_Airport_Id:flightObj.arrival_Airport_Id, 
        image_Name:flightObj.image_Name }
        console.log(this.previousFlightData);
        this.updateForm.controls['flight_Id'].setValue (this.previousFlightData.flight_Id); 
        this.updateForm.controls['departure_Airport_Id'].setValue (this.previousFlightData.departure_Airport_Id); 
        this.updateForm.controls['arrival_Airport_Id'].setValue (this.previousFlightData.arrival_Airport_Id); 
        this.dialog.open(this.callUpdateDialog);
    }
    update(){
      console.log('test',this.updateForm.controls['image_Name'].value);
      console.log('test1',this.previousFlightData.image_Name);
      if(this.updateForm.controls['image_Name'].value != this.previousFlightData.image_Name &&this.updateForm.controls['image_Name'].value !=null )
    {
      this.updateForm.controls['image_Name'].setValue(this.appservice.uploadFlightImage);
      let editFlight =
      {
        flight_Id:this.previousFlightData.flight_Id,
        flight_Name:this.updateForm.controls['flight_Name'].value ,
        price:this.updateForm.controls['price'].value ,
        numberofemptyseats:this.updateForm.controls['numberofemptyseats'].value ,
        numberofreservedseats:this.updateForm.controls['numberofreservedseats'].value ,
        departure_Datetime:this.updateForm.controls['departure_Datetime'].value ,
        arrival_Datetime:this.updateForm.controls['arrival_Datetime'].value ,
        arrival_Status:this.updateForm.controls['arrival_Status'].value ,
        additionalcost:this.updateForm.controls['additionalcost'].value ,
        departure_Airport_Id:this.updateForm.controls['departure_Airport_Id'].value ,
        arrival_Airport_Id:this.updateForm.controls['arrival_Airport_Id'].value ,
        image_Name:this.updateForm.controls['image_Name'].value 
      }
      this.appservice.updateFlight(editFlight);
    }
    else{
      //this.updateForm.controls['image_Name'].setValue(this.previousFlightData.image_Name);
      let editFlight =
      {
        flight_Id:this.previousFlightData.flight_Id,
        flight_Name:this.updateForm.controls['flight_Name'].value ,
        price:this.updateForm.controls['price'].value ,
        numberofemptyseats:this.updateForm.controls['numberofemptyseats'].value ,
        numberofreservedseats:this.updateForm.controls['numberofreservedseats'].value ,
        departure_Datetime:this.updateForm.controls['departure_Datetime'].value ,
        arrival_Datetime:this.updateForm.controls['arrival_Datetime'].value ,
        arrival_Status:this.updateForm.controls['arrival_Status'].value ,
        additionalcost:this.updateForm.controls['additionalcost'].value ,
        departure_Airport_Id:this.updateForm.controls['departure_Airport_Id'].value ,
        arrival_Airport_Id:this.updateForm.controls['arrival_Airport_Id'].value ,
        image_Name:this.previousFlightData.image_Name
      }
      this.appservice.updateFlight(editFlight);

    }
    }
    //to edit the image file
  //flight User
  UploadFile(file:any){
    if(file.length==0){
      return ;
     }
     let fileToUpload=<File>file[0]; //the first image uploaded
     const formData=new FormData();
     formData.append('imageFile',fileToUpload,fileToUpload.name);//the third parameter is optional, the first option we can give it any name
     this.appservice.uploadAttachmentFlight(formData);
  }
  getAirportNameById(airportId: number): string {
    const airport = this.airports.find(airport => airport.airport_Id === airportId);
    return airport ? airport.airport_Name : '';
  }
}
