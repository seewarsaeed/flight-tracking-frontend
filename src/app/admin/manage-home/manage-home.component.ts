import { Component,OnInit,ViewChild,TemplateRef } from '@angular/core';
import { AppServiceService } from 'src/app/Services/app-service.service';
import {MatDialog} from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { CreateBackgroundComponent } from '../create-background/create-background.component';
import { CreateAboutusComponent } from '../create-aboutus/create-aboutus.component';
import {CreateHeaderComponent} from'src/app/admin/create-header/create-header.component';
import { CreateFooterComponent } from '../create-footer/create-footer.component';

@Component({
  selector: 'app-manage-home',
  templateUrl: './manage-home.component.html',
  styleUrls: ['./manage-home.component.css']
})
export class ManageHomeComponent implements OnInit {

  constructor(public appservice:AppServiceService, public dialog:MatDialog){}
     @ViewChild('callDeleteDialogBackGround') callDeleteDialogBackGround!:TemplateRef<any>
     @ViewChild('callUpdateDialogBackGround') callUpdateDialogBackGround!:TemplateRef<any>
     @ViewChild('callDeleteDialogTestimonial') callDeleteDialogTestimonial!:TemplateRef<any>
     @ViewChild('callUpdateDialogTestimonial') callUpdateDialogTestimonial!:TemplateRef<any>
     @ViewChild('callDeleteDialogAbout') callDeleteDialogAbout!:TemplateRef<any>
     @ViewChild('callUpdateDialogAbout') callUpdateDialogAbout!:TemplateRef<any>
     @ViewChild('callDeleteDialog') callDeleteDialog!:TemplateRef<any>
     @ViewChild('callUpdateDialogHeader') callUpdateDialogHeader!:TemplateRef<any>
     @ViewChild('callUpdateDialogFooter') callUpdateDialogFooter!:TemplateRef<any>

     ngOnInit(): void {
       this.appservice.getAllbackgrounds();
       this.appservice.getAlltestimonials();
       this.appservice.getAllabouts();
       this.appservice.GetAllContactUs();
       this.appservice.GetAllHeader();
       this.appservice.GetAllFooter();
    }
  openDeleteDialogBackGround(id:number){
    const dialogRef=this.dialog.open(this.callDeleteDialogBackGround);
    dialogRef.afterClosed().subscribe((result)=>{
      if(result!=undefined){
        if(result=='yes')
        {
          this.appservice.deleteBackGround(id);
        }
        else if(result=='no'){
          console.log('Thank You');
        }
      }
    })

   }
  openCreateDialogBackGround()
  {
    this.dialog.open(CreateBackgroundComponent);
  }

  //update background
  updateFormBackGround : FormGroup= new FormGroup({
    background_Id:new FormControl(),
    description:new FormControl(''),
    image_Name:new FormControl()
    });
    previousbackgroundData:any={};
    openUpdateDialogBackGround(obj:any){
      this.previousbackgroundData={
        background_Id:obj.background_Id, 
        description:obj.description, 
        image_Name:obj.image_Name }
        this.updateFormBackGround.controls['background_Id'].setValue(this.previousbackgroundData.background_Id); 
        this.dialog.open(this.callUpdateDialogBackGround);
    }
    updateBackGround(){
      console.log('test',this.updateFormBackGround.controls['image_Name'].value);
      console.log('test1',this.previousbackgroundData.image_Name);
      if(this.updateFormBackGround.controls['image_Name'].value != this.previousbackgroundData.image_Name && this.updateFormBackGround.controls['image_Name'].value != null)
    {
      this.updateFormBackGround.controls['image_Name'].setValue(this.appservice.upload_BackGround_Image);
      let editBackGround ={
        background_Id: this.previousbackgroundData.background_Id,
        description:this.updateFormBackGround.controls['description'].value ,
        image_Name:this.updateFormBackGround.controls['image_Name'].value
      }
      this.appservice.updateBackGround(editBackGround);
    }
    else{
     // this.updateFormBackGround.controls['image_Name'].setValue(this.previousbackgroundData.image_Name);
   
      let editBackGround ={
        background_Id: this.previousbackgroundData.background_Id,
        description:this.updateFormBackGround.controls['description'].value ,
        image_Name:this.previousbackgroundData.image_Name
      }
      this.appservice.updateBackGround(editBackGround);

    }

    }
   
  UploadFileBackGround(file:any){
    if(file.length==0){
      return ;
     }
     let fileToUpload=<File>file[0];
     const formData=new FormData();
     formData.append('imageFile',fileToUpload,fileToUpload.name);
     this.appservice.uploadAttachmentBackGround(formData);
   }


   //_________________________About-Us_____________________________
   openDeleteDialogAbout(id:number){
    const dialogRef=this.dialog.open(this.callDeleteDialogAbout);
    dialogRef.afterClosed().subscribe((result)=>{
      if(result!=undefined){
        if(result=='yes')
        {
          this.appservice.deleteAbout(id);
        }
        else if(result=='no'){
          console.log('Thank You');
        }
      }
    })

   }
  openCreateDialogAbout()
  {
    this.dialog.open(CreateAboutusComponent);
  }

  //update about
    updateFormAbout : FormGroup= new FormGroup({
    about_Us_Id:new FormControl(),
    description:new FormControl(''),
    title:new FormControl(''),
    image_Name:new FormControl()
    });
    previousAboutData:any={};
    openUpdateDialogAbout(obj:any){
      this.previousAboutData={
        about_Us_Id:obj.about_Us_Id, 
        description:obj.description, 
        title:obj.title,
        image_Name:obj.image_Name }
        this.updateFormAbout.controls['about_Us_Id'].setValue (this.previousAboutData.about_Us_Id); 
        this.dialog.open(this.callUpdateDialogAbout);
    }
    updateAbout(){
      console.log('test', this.updateFormAbout.controls['image_Name'].value);
      console.log('test1', this.previousAboutData.image_Name);
     if(this.updateFormAbout.controls['image_Name'].value != this.previousAboutData.image_Name && this.updateFormAbout.controls['image_Name'].value !=null)
     {
      const newImageName = this.appservice.upload_About_Image;
      this.updateFormAbout.controls['image_Name'].setValue(newImageName);
      let editAbout =
      {
        about_Us_Id:this.previousAboutData.about_Us_Id,
        description:this.updateFormAbout.controls['description'].value,
        title:this.updateFormAbout.controls['title'].value,
       image_Name:this.updateFormAbout.controls['image_Name'].value

      }
      this.appservice.updateAbout(editAbout);

     }
     else
     {
      //const newImageName = this.previousAboutData.image_Name;
      //this.updateFormAbout.controls['image_Name'].setValue(newImageName);
      let editAbout =
      {
        about_Us_Id:this.previousAboutData.about_Us_Id,
        description:this.updateFormAbout.controls['description'].value,
        title:this.updateFormAbout.controls['title'].value,
       image_Name:this.previousAboutData.image_Name

      }
      this.appservice.updateAbout(editAbout);
     }

    }
   
  UploadFileAbout(file:any){
    if(file.length==0){
      return ;
     }
     let fileToUpload=<File>file[0];
     const formData=new FormData();
     formData.append('imageFile',fileToUpload,fileToUpload.name);
     this.appservice.uploadAttachmentAbout(formData);
   }

 

  openDeleteDialogHeader(id:number)
  {
   const dialogRef= this.dialog.open(this.callDeleteDialog)
    dialogRef.afterClosed().subscribe((result=>{
      if(result!=undefined)
      {
        if(result=='yes')
        {
          this.appservice.DeleteHeader(id)
        }
        else if(result=='no'){
          console.log('Thank You header');
        }
      }
     
    }))
  }

  openDeleteDialogFooter(id:number)
  {
   const dialogRef= this.dialog.open(this.callDeleteDialog)
    dialogRef.afterClosed().subscribe((result=>{
      if(result!=undefined)
      {
        if(result=='yes')
        {
          this.appservice.DeleteFooter(id)
        }
        else if(result=='no'){
          console.log('Thank You Footer');
        }
      }
     
    }))
  }
  
  openCreateDialogHeader()
  {
    this.dialog.open(CreateHeaderComponent);
  }

  openCreateDialogFooter()
  {
    this.dialog.open(CreateFooterComponent);
  }

 updateFormHeader: FormGroup = new FormGroup({
  header_Id:new FormControl(),
  website_Name: new FormControl()
 })

Previous_data_Header:any={};
 openUpdateDialogHeader(headerobj:any)
 {
  this.dialog.open(this.callUpdateDialogHeader);
  this.Previous_data_Header={
    header_Id: headerobj.header_Id,
    website_Name:headerobj.website_Name
  }
  this.updateFormHeader.controls['header_Id'].setValue(this.Previous_data_Header.header_Id);
  this.dialog.open(this.callUpdateDialogHeader);
 }

  updateHeader()
  {
    this.appservice.UpdateHeader(this.updateFormHeader.value);
  }




  updateFormFooter: FormGroup = new FormGroup({
 
    footer_Id:new FormControl(),

    logo: new FormControl(),

    brief: new FormControl(),

    location: new FormControl(),

    email: new FormControl(),

    phone_Number: new FormControl(),

    linkstitle: new FormControl(),

    copyright: new FormControl(),
   })
  
  Previous_data_Footer:any={};
   openUpdateDialogFooter(Footerobj:any)
   {
    this.dialog.open(this.callUpdateDialogFooter);
    this.Previous_data_Footer={
      footer_Id:Footerobj.footer_Id,

      logo:Footerobj.logo,

      brief: Footerobj.brief,
  
      location: Footerobj.location,
  
      email: Footerobj.email,
  
      phone_Number:Footerobj.phone_Number,

      linkstitle: Footerobj.linkstitle,
  
      copyright: Footerobj.copyright
    }
    this.updateFormFooter.controls['footer_Id'].setValue(this.Previous_data_Footer.footer_Id);
    
   }
  
    updateFooter()
    {
      console.log('test',this.updateFormFooter.controls['logo'].value);
      console.log('test1',this.Previous_data_Footer.logo);
      if(this.updateFormFooter.controls['logo'].value != this.Previous_data_Footer.logo && this.updateFormFooter.controls['logo'].value !=null)
    {
     let editFooter  ={
      footer_Id : this.Previous_data_Footer.footer_Id,

      logo:this.updateFormFooter.controls['logo'].value,

      brief: this.updateFormFooter.controls['brief'].value,
  
      location: this.updateFormFooter.controls['location'].value,
  
      email: this.updateFormFooter.controls['email'].value,
  
      phone_Number:this.updateFormFooter.controls['phone_Number'].value,

      linkstitle: this.updateFormFooter.controls['linkstitle'].value,
  
      copyright: this.updateFormFooter.controls['copyright'].value

      }
      console.log("not equal");
      console.log(this.appservice.uploadFooterImage);
     // this.updateFormFooter.controls['logo'].setValue(this.appservice.uploadFooterImage);
      console.log(this.updateFormFooter.controls['logo'].value );
      this.appservice.UpdateFooter(editFooter);
    }
    else{
      let editFooter  ={
        footer_Id : this.Previous_data_Footer.footer_Id,
  
        logo:this.Previous_data_Footer.logo,
  
        brief: this.updateFormFooter.controls['brief'].value,
    
        location: this.updateFormFooter.controls['location'].value,
    
        email: this.updateFormFooter.controls['email'].value,
    
        phone_Number:this.updateFormFooter.controls['phone_Number'].value,
  
        linkstitle: this.updateFormFooter.controls['linkstitle'].value,
    
        copyright: this.updateFormFooter.controls['copyright'].value
  
        }
      console.log("I am in else");
      //this.updateFormFooter.controls['logo'].setValue(this.Previous_data_Footer.logo);
      this.appservice.UpdateFooter(editFooter);
    }
     
    }

    UploadFileFooter(file:any){
      if(file.length==0){
        return ;
       }
       let fileToUpload=<File>file[0];
       const formData=new FormData();
       formData.append('imageFile',fileToUpload,fileToUpload.name);
       this.appservice.uploadAttachmentFooter(formData);
     }


    //_____________________Testimonial___________________________
    openDeleteDialogTestimonial(id:number){
      const dialogRef=this.dialog.open(this.callDeleteDialogTestimonial);
      dialogRef.afterClosed().subscribe((result)=>{
        if(result!=undefined){
          if(result=='yes')
          {
            this.appservice.deleteTestimonial(id);
          }
          else if(result=='no'){
            console.log('Thank You');
          }
        }
      })
  
     }
    
    //update Testimonial
    updateFormTestimonial : FormGroup= new FormGroup({
      testimonial_Id:new FormControl(),
      name:new FormControl(''),
      feedback:new FormControl(''),
      status:new FormControl(''),
      user_Id:new FormControl('')
      });
      previousTestimonialData:any={};
      openUpdateDialogTestimonial(obj:any){
        this.previousTestimonialData={
          testimonial_Id:obj.testimonial_Id, 
          name:obj.name, 
          feedback:obj.feedback, 
          status:obj.status, 
          user_Id:obj.user_Id, 
        }
         
          this.updateFormTestimonial.controls['testimonial_Id'].setValue (this.previousTestimonialData.testimonial_Id); 
          this.updateFormTestimonial.controls['user_Id'].setValue(this.previousTestimonialData.user_Id);
          this.dialog.open(this.callUpdateDialogTestimonial);
      }
      updateTestimonial(){
        this.appservice.updateTestimonial(this.updateFormTestimonial.value);
      }
    
}
