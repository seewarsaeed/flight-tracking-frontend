import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppServiceService } from '../Services/app-service.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  constructor(private appservice:AppServiceService){}
  contactForm:FormGroup=new FormGroup({

    name:new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required,Validators.email]),
    subject:new FormControl(''),
    message:new FormControl('',Validators.required)

  });
  validEmail:string='';
  emailValidation(){
    if(this.contactForm.controls['email'].hasError('required')){
      this.validEmail='Email is required';
    }
    else if(this.contactForm.controls['email'].hasError('email')){
      this.validEmail='Email is not valid';
    }
    else{
      this.validEmail='';
    }

  }
  sendMsg(){
    this.appservice.CreateContactUs(this.contactForm.value);
    this.contactForm.reset();
  }
}
