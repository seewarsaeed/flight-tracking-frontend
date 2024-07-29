import { Component,OnInit,ViewChild,TemplateRef } from '@angular/core';
import { AppServiceService } from 'src/app/Services/app-service.service';
import {MatDialog} from '@angular/material/dialog';
import { CreateAirportComponent } from '../create-airport/create-airport.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-manage-airport',
  templateUrl: './manage-airport.component.html',
  styleUrls: ['./manage-airport.component.css']
})
export class ManageAirportComponent implements OnInit  {
  constructor(public appservice:AppServiceService, public dialog:MatDialog){}
  @ViewChild('callDeleteDialog') callDeleteDialog!:TemplateRef<any>
  @ViewChild('callUpdateDialog') callUpdateDialog!:TemplateRef<any>
  ngOnInit(): void {
    this.appservice.getAllAirports();
  }
  openDeleteDialog(id:number){
    const dialogRef=this.dialog.open(this.callDeleteDialog);
    dialogRef.afterClosed().subscribe((result)=>{
      if(result!=undefined){
        if(result=='yes')
        {
          this.appservice.deleteAirport(id);
        }
        else if(result=='no'){
          console.log('Thank You');
        }
      }
    })

  }
  openCreateDialog()
  {
    this.dialog.open(CreateAirportComponent);
  }
  //update Airport
  updateForm:FormGroup=new FormGroup({
    airport_Id:new FormControl(),
    airport_Name:new FormControl(),
    location:new FormControl()
  });
  previousAirportData:any={};
  openUpdateDialog(airportObj:any){
    this.previousAirportData={
      airport_Id:airportObj.airport_Id,
      airport_Name:airportObj.airport_Name,
      location:airportObj.location
    }
    this.updateForm.controls['airport_Id'].setValue(this.previousAirportData.airport_Id);
    this.dialog.open(this.callUpdateDialog);
  }
  update(){
    this.appservice.updateAirport(this.updateForm.value);
  }

}
