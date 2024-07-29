import { Component,OnInit,ViewChild,TemplateRef } from '@angular/core';
import { AppServiceService } from 'src/app/Services/app-service.service';
import {MatDialog} from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {
  constructor(public appservice:AppServiceService, public dialog:MatDialog){}
  @ViewChild('callDeleteDialog') callDeleteDialog!:TemplateRef<any>
  @ViewChild('callUpdateDialog') callUpdateDialog!:TemplateRef<any>
  ngOnInit(): void {
    this.appservice.getAllUsers();
  }
  openDeleteDialog(id:number){
    const dialogRef=this.dialog.open(this.callDeleteDialog);
    dialogRef.afterClosed().subscribe((result)=>{
      if(result!=undefined){
        if(result=='yes')
        {
          this.appservice.deleteUser(id);
        }
        else if(result=='no'){
          console.log('Thank You');
        }
      }
    })

  }
  openCreateDialog()
  {
    this.dialog.open(CreateUserComponent);
  }
  //update user
  updateForm:FormGroup=new FormGroup({
    user_Id:new FormControl(),
    user_Name:new FormControl(),
    password:new FormControl(),
    first_Name:new FormControl(),
    last_Name:new FormControl(),
    image_Name:new FormControl(),
    email:new FormControl(),
    role_Id:new FormControl()
  });
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
    this.updateForm.controls['user_Id'].setValue(this.previousUserData.User_ID);
    this.updateForm.controls['role_Id'].setValue(this.previousUserData.role_Id);
    this.dialog.open(this.callUpdateDialog);
  }
  update(){
    console.log('test',this.updateForm.controls['image_Name'].value);
      console.log('test1',this.previousUserData.image_Name);
      if(this.updateForm.controls['image_Name'].value != this.previousUserData.image_Name)
    {
      console.log("not equal");
      this.updateForm.controls['image_Name'].setValue(this.appservice.uploadUserImage);
      console.log(this.updateForm.controls['image_Name'].value );
    }
    else{
      console.log("I am in else");
      this.updateForm.controls['image_Name'].setValue(this.previousUserData.image_Name);
    }
      this.appservice.updateUser(this.updateForm.value);
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
}
