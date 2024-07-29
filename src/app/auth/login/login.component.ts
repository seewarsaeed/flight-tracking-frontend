import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { AppServiceService } from 'src/app/Services/app-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public appservice:AppServiceService){
    const storedCredentials = localStorage.getItem('rememberedCredentials');
        if (storedCredentials) {
            const credentials = JSON.parse(storedCredentials);
            this.loginForm.patchValue({
                User_Name: credentials.User_Name,
                password: credentials.password,
                rememberMe: true 
            });
        }
  }
  loginForm:FormGroup=new FormGroup({
    User_Name:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required]),
    rememberMe: new FormControl(false)
  });
  signIn() {
    const rememberMe = this.loginForm.controls['rememberMe'].value;
    if (rememberMe) {
      const credentials = {
        User_Name: this.loginForm.controls['User_Name'].value,
        password: this.loginForm.controls['password'].value
      };
      localStorage.setItem('rememberedCredentials', JSON.stringify(credentials));
    } else {
      localStorage.removeItem('rememberedCredentials');
    }

    console.log(this.loginForm.controls['User_Name'].value);
    console.log(this.loginForm.controls['password'].value);
    
    this.appservice.login(this.loginForm.controls['User_Name'].value,this.loginForm.controls['password'].value);

  }

  UserNameValidity:string='';
  UserNameValidation(){
    if(this.loginForm.controls['User_Name'].hasError('required')){
      this.UserNameValidity='Username is required';
    }
    else{
      this.UserNameValidity='';
    }
  }
  passwordValidity:string='';
  passwordValidation(){
    if(this.loginForm.controls['password'].hasError('required')){
      this.passwordValidity='Password is required';
    }
    else{
      this.passwordValidity='';
    }
  }
}
