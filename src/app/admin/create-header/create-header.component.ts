import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppServiceService } from 'src/app/Services/app-service.service';

@Component({
  selector: 'app-create-header',
  templateUrl: './create-header.component.html',
  styleUrls: ['./create-header.component.css']
})
export class CreateHeaderComponent  {
constructor(public appservice:AppServiceService ){}

createForm: FormGroup = new FormGroup({

  website_Name: new FormControl('',Validators.required)

})

save(){
  this.appservice.CreateHeader(this.createForm.value);
  }


}
