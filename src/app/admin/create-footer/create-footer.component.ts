import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppServiceService } from 'src/app/Services/app-service.service';

@Component({
  selector: 'app-create-footer',
  templateUrl: './create-footer.component.html',
  styleUrls: ['./create-footer.component.css']
})
export class CreateFooterComponent {

  constructor(public appservice:AppServiceService ){}

  createForm: FormGroup = new FormGroup({

    logo: new FormControl('',Validators.required),

    brief: new FormControl('',Validators.required),

    location: new FormControl('',Validators.required),

    email: new FormControl('',Validators.required),

    phone_Number: new FormControl('',Validators.required),

    linkstitle: new FormControl('',Validators.required),

    copyright: new FormControl('',Validators.required),
  
  })
  
  save(){
    this.appservice.CreateFooter(this.createForm.value);
    }
  
    UploadFile(file:any){
      if(file.length==0){
        return ;
       }
       let fileToUpload=<File>file[0]; //the first image uploaded
       const formData=new FormData();
       formData.append('imageFile',fileToUpload,fileToUpload.name);//the third parameter is optional, the first option we can give it any name
       this.appservice.uploadAttachmentFooter(formData);
    }
  
}
