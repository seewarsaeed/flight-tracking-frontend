import { Component,OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AppServiceService } from '../Services/app-service.service';
import { FormControl, FormGroup , Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {
  testimonials:any[]=[];
  constructor(public appservice:AppServiceService ,public dialog:MatDialog){}
  @ViewChild('callDialog') callDialog!:TemplateRef<any>

  ngOnInit(): void {
    this.appservice.GetAlltestimonials().subscribe((resp: any[]) => {
      this.testimonials = resp;
      console.log("in ts",this.testimonials);
    }, err => {
      console.log(err.status);
    });
  }

  testimonialForm:FormGroup = new FormGroup({
    name:new FormControl('',Validators.required),
    feedback:new FormControl('',Validators.required),
  })


  SendTestionial()
  {
    if(this.LoggedIn())
    {
      let sendTestimonial ={
        user_Id:localStorage.getItem("userId"),
        name:this.testimonialForm.controls['name'].value,
        feedback:this.testimonialForm.controls['feedback'].value,
        status:"false"
      }
      this.appservice.createTestimonial(sendTestimonial);
      this.testimonialForm.reset();

    }
    else
    {
      this.openDialog()
    }
    

  };
  
  LoggedIn()
  {
   return  localStorage.getItem('token')
  }
  //this.testimonialForm.reset();
  
  openDialog(){
    const dialogRef=this.dialog.open(this.callDialog);
    dialogRef.afterClosed().subscribe((result)=>{
      if(result!=undefined){
        if(result=='yes')
        {
          
        }
        else if(result=='no'){
          this.testimonialForm.reset();
        }
      }
    })

}


}
