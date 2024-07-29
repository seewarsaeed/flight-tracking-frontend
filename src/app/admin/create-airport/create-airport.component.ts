import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppServiceService } from 'src/app/Services/app-service.service';

@Component({
  selector: 'app-create-airport',
  templateUrl: './create-airport.component.html',
  styleUrls: ['./create-airport.component.css']
})
export class CreateAirportComponent {
  constructor(private appservice:AppServiceService){}
  createForm:FormGroup=new FormGroup({
    //columns the same in database
    airport_Name:new FormControl('',[Validators.required,Validators.maxLength(150)]),
    location:new FormControl('',[Validators.required,Validators.maxLength(150),Validators.pattern(/^\w+, \w+$/)])
  });
  save(){
    this.appservice.createAirport(this.createForm.value);
    }

}
