import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppServiceService } from 'src/app/Services/app-service.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  constructor(private appservice:AppServiceService){}
  createForm:FormGroup=new FormGroup({
    //columns the same in database
    User_Name:new FormControl('',[Validators.required,Validators.maxLength(100)]),
    password:new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(100),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/)]),
    First_Name:new FormControl('',[Validators.required,Validators.maxLength(50)]),
    Last_Name:new FormControl('',[Validators.required,Validators.maxLength(50)]),
    Image_Name:new FormControl(),
    Email:new FormControl('',[Validators.required,Validators.email]),
    Role_ID:new FormControl()
  });
  save(){
  this.createForm.controls['Role_ID'].setValue(2);// based on database the user role id is 2
  this.appservice.CreateUser(this.createForm.value);
  }
  //image User
  UploadFile(file:any){
    if(file.length==0){
      return ;
     }
     let fileToUpload=<File>file[0]; //the first image uploaded
     const formData=new FormData();
     formData.append('imageFile',fileToUpload,fileToUpload.name);//the third parameter is optional, the first option we can give it any name
     this.appservice.uploadAttachment(formData);
  }
}
