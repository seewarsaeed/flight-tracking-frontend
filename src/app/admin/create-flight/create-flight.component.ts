import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppServiceService } from 'src/app/Services/app-service.service';

@Component({
  selector: 'app-create-flight',
  templateUrl: './create-flight.component.html',
  styleUrls: ['./create-flight.component.css']
})
export class CreateFlightComponent implements OnInit {
  airports:any[]=[];
  constructor(private appservice:AppServiceService){}
  ngOnInit(): void {
    this.appservice.GetAllAirports().subscribe((resp: any[]) => {
      this.airports = resp;
      console.log(this.airports);
    }, err => {
      console.log(err.status);
    });
  }
  createForm:FormGroup=new FormGroup({
    //columns the same in database
    flight_Name:new FormControl('',[Validators.required,Validators.maxLength(100)]),
    price:new FormControl('',Validators.required),
    numberofemptyseats:new FormControl('',Validators.required),
    numberofreservedseats:new FormControl('',Validators.required),
    departure_Datetime:new FormControl('',Validators.required),
    arrival_Datetime:new FormControl('',Validators.required),
    arrival_Status:new FormControl('false'),
    additionalcost:new FormControl('',Validators.required),
    departure_Airport_Id:new FormControl('',Validators.required),
    arrival_Airport_Id:new FormControl('',Validators.required),
    image_Name:new FormControl()
  });
  save(){
  this.createForm.controls['arrival_Status'].setValue('false');
  this.appservice.CreateFlight(this.createForm.value);
  }
    //image Flight
    UploadFile(file:any){
      if(file.length==0){
        return ;
       }
       let fileToUpload=<File>file[0]; //the first image uploaded
       const formData=new FormData();
       formData.append('imageFile',fileToUpload,fileToUpload.name);//the third parameter is optional, the first option we can give it any name
       this.appservice.uploadAttachmentFlight(formData);
    }

}
