import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppServiceService } from 'src/app/Services/app-service.service';



@Component({
  selector: 'app-create-background',
  templateUrl: './create-background.component.html',
  styleUrls: ['./create-background.component.css']
})
export class CreateBackgroundComponent {

  constructor(public appservice:AppServiceService){}
  createForm:FormGroup=new FormGroup({
    //columns the same with columns in database
    description:new FormControl('',Validators.required),
    image_Name:new FormControl()
  });
  save(){
  this.appservice.createBackGround(this.createForm.value);
  }
  //Image 
  UploadFile(file:any){
    if(file.length==0){
      return ;
     }
     let fileToUpload=<File>file[0]; 
     const formData=new FormData();
     formData.append('imageFile',fileToUpload,fileToUpload.name);
     this.appservice.uploadAttachmentBackGround(formData);
  }
    
}
