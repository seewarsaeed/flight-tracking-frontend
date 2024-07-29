import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppServiceService } from 'src/app/Services/app-service.service';

@Component({
  selector: 'app-create-aboutus',
  templateUrl: './create-aboutus.component.html',
  styleUrls: ['./create-aboutus.component.css']
})
export class CreateAboutusComponent {
  constructor(public appservice:AppServiceService){}
  createForm:FormGroup=new FormGroup({
    //columns the same with columns in database
    description:new FormControl('',Validators.required),
    title:new FormControl('',Validators.required),
    image_Name:new FormControl()
  });
  save(){
  this.appservice.createAbout(this.createForm.value);
  }
  //Image 
  UploadFile(file:any){
    if(file.length==0){
      return ;
     }
     let fileToUpload=<File>file[0];
     const formData=new FormData();
     formData.append('imageFile',fileToUpload,fileToUpload.name);
     this.appservice.uploadAttachmentAbout(formData);
  }
}
