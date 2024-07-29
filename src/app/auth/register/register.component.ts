import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { AppServiceService } from 'src/app/Services/app-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(public appservice:AppServiceService,private router: Router){}
  registerForm:FormGroup=new FormGroup({
    //key : value
    First_Name:new FormControl('',[Validators.required,Validators.maxLength(50)]),
    Last_Name:new FormControl('',[Validators.required,Validators.maxLength(50)]),
    User_Name:new FormControl('',[Validators.required,Validators.maxLength(100)]),
    Email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(100),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/)]),
    repeatPassword:new FormControl(''),
    Image_Name:new FormControl(),
    Role_ID:new FormControl('2')
    // gender:new FormControl('',Validators.required)
  });
  register()
  {
    console.log(this.registerForm.value); //just for testing 
    const formValues=this.registerForm.value;
    delete formValues.repeatPassword;
    this.registerForm.controls['Role_ID'].setValue('2');//user role id
    console.log(this.registerForm.controls['Role_ID'].value);
    console.log(formValues); //just for testing 
    this.appservice.CreateUser(formValues);
    this.router.navigate(['/security/login']);
  }
  UploadFile(file:any){
    if(file.length==0){
      return ;
     }
     let fileToUpload=<File>file[0]; //the first image uploaded
     const formData=new FormData();
     formData.append('imageFile',fileToUpload,fileToUpload.name);//the third parameter is optional, the first option we can give it any name
     this.appservice.uploadAttachment(formData);
  }
  matchError()
  {
    if(this.registerForm.controls['password'].value == this.registerForm.controls['repeatPassword'].value)
    this.registerForm.controls['repeatPassword'].setErrors(null);
    else
    this.registerForm.controls['repeatPassword'].setErrors({misMatch:true});
  }
  FNameValidity:string='';
  FNameValidation(){
    if(this.registerForm.controls['First_Name'].hasError('required')){
      this.FNameValidity='First Name is required';
    }
    else if(this.registerForm.controls['First_Name'].hasError('maxlength')){
      this.FNameValidity='The maximum length of First Name should be 50 character';
    }
    else{
      this.FNameValidity='';
    }
  }
  LNameValidity:string='';
  LNameValidation(){
    if(this.registerForm.controls['Last_Name'].hasError('required')){
      this.LNameValidity='Last Name is required';
    }
    else if(this.registerForm.controls['Last_Name'].hasError('maxlength')){
      this.LNameValidity='The maximum length of Last Name should be 50 character';
    }
    else{
      this.LNameValidity='';
    }
  }
  UserNameValidity:string='';
  UserNameValidation(){
    if(this.registerForm.controls['User_Name'].hasError('required')){
      this.UserNameValidity='Username is required';
    }
    else if(this.registerForm.controls['User_Name'].hasError('maxlength')){
      this.UserNameValidity='The maximum length of Username should be 100 character';
    }
    else{
      this.UserNameValidity='';
    }

  }
  emailValidity:string='';
  emailValidation(){
    if(this.registerForm.controls['Email'].hasError('required')){
      this.emailValidity='Email is required';
    }
    else if(this.registerForm.controls['Email'].hasError('email')){
      this.emailValidity='Please enter valid Email Address';
    }
    else{
      this.emailValidity='';
    }
  }
  passwordValidity:string='';
  passwordValidation(){
    if(this.registerForm.controls['password'].hasError('required')){
      this.passwordValidity='Password is required';
    }
    else if(this.registerForm.controls['password'].hasError('minlength')){
      this.passwordValidity='Please enter strong password with minimun length 8 characters';
    }
    else if(this.registerForm.controls['password'].hasError('maxlength')){
      this.passwordValidity='The maximum length of password should be 100 character';
    }
    else if(this.registerForm.controls['password'].hasError('pattern')){
      this.passwordValidity='Password must contain at least one uppercase letter, one lowercase letter, and one special character';
    }
    else{
      this.passwordValidity='';
    }
  }
}
