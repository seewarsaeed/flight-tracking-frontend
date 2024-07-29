import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AppServiceService } from '../Services/app-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  constructor(public appservice:AppServiceService, public dialog:MatDialog,private router:Router){}
  @ViewChild('callUpdateDialog') callUpdateDialog!:TemplateRef<any>
  USers:any;
  namee :string ="ee@ee";



  ids:any =localStorage.getItem("userId");
  ngOnInit(): void {

   // this.appservice.GetUserByName("ee@ee").subscribe((resp:any)=>
   // {
   //  this.USers=resp;
    ///this.USers.push(resp);
   // console.log(this.USers);
 // }, 
  //err => {
  //  console.log("error");
  //  console.log(err.status);
  //});
  

  this.appservice.GetUserById(this.ids).subscribe((resp:any)=>
    {
     this.USers=resp;
    ///this.USers.push(resp);
    console.log(this.USers);
  }, 
  err => {
    console.log("error");
    console.log(err.status);
  });


  }

  updateForm: FormGroup = new FormGroup({
    user_Id:new FormControl(),
    user_Name:new FormControl(),
    password:new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(100),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/)]),
    first_Name:new FormControl(),
    last_Name:new FormControl(),
    image_Name:new FormControl(),
    email:new FormControl(),
    role_Id:new FormControl()
  })

  previousUserData:any={};
  openUpdateDailog(userObj:any){
    this.previousUserData={
      user_Id:userObj.user_Id,
      user_Name:userObj.user_Name,
      password:userObj.password,
      first_Name:userObj.first_Name,
      last_Name:userObj.last_Name,
      image_Name:userObj.image_Name,
      email:userObj.email,
      role_Id:userObj.role_Id
    }
    console.log(this.previousUserData);

    this.updateForm.controls['user_Id'].setValue(localStorage.getItem("userId"));

    this.updateForm.controls['role_Id'].setValue(this.previousUserData.role_Id);
    this.dialog.open(this.callUpdateDialog);
  }

  update(){
   // console.log(this.previousUserData);

      //console.log('test',this.updateForm.controls['image_Name'].value);
     // console.log('test1',this.previousUserData.image_Name);
      if(this.updateForm.controls['image_Name'].value != this.previousUserData.image_Name && this.updateForm.controls['image_Name'].value !=null)
    {
      console.log("not equal");
      this.updateForm.controls['image_Name'].setValue(this.appservice.uploadUserImage);
      //console.log(this.updateForm.controls['image_Name'].value );
      
      let user ={
        user_id:localStorage.getItem("userId"),
      user_name:this.USers.user_Name,
      password:this.updateForm.controls['password'].value,
      first_Name:this.updateForm.controls['first_Name'].value,
      last_Name:this.updateForm.controls['last_Name'].value,
      image_Name:this.updateForm.controls['image_Name'].value,
      email:this.USers.email,
      role_Id:localStorage.getItem("role"),
     }
     this.appservice.updateUser(user);
    }
    else{
      console.log("I am in else");
      let user ={
          user_id:localStorage.getItem("userId"),
        user_name:this.USers.user_Name,
        password:this.updateForm.controls['password'].value,
        first_Name:this.updateForm.controls['first_Name'].value,
        last_Name:this.updateForm.controls['last_Name'].value,
        image_Name:this.previousUserData.image_Name,
        email:this.USers.email,
        role_Id:localStorage.getItem("role"),
       }
       this.appservice.updateUser(user);
    }
  }
  //to edit the image file
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

  passwordValidity:string='';
  passwordValidation(){
    if(this.updateForm.controls['password'].hasError('required')){
      this.passwordValidity='Password is required';
    }
    else if(this.updateForm.controls['password'].hasError('minlength')){
      this.passwordValidity='Please enter strong password with minimun length 8 characters';
    }
    else if(this.updateForm.controls['password'].hasError('maxlength')){
      this.passwordValidity='The maximum length of password should be 100 character';
    }
    else if(this.updateForm.controls['password'].hasError('pattern')){
      this.passwordValidity='Password must contain at least one uppercase letter, one lowercase letter, and one special character';
    }
    else{
      this.passwordValidity='';
    }
  }
  BackToHome(){
    if(localStorage.getItem('role')=='1')
    {
      this.router.navigate(['/admin/dashboard']);
    }
    else if(localStorage.getItem('role')=='2')
    {
      this.router.navigate(['']);
    }
  }
}

