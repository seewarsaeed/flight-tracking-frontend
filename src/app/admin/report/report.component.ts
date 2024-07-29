import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/Services/app-service.service';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

export class ReportComponent implements OnInit{
  constructor(public appservice:AppServiceService){}
  myreport :any[] =[];
  ngOnInit(): void {
    this.appservice.Report().subscribe((resp:any[])=>{
      this.myreport=resp;
      console.log(this.myreport);
    }, 
    err => {
      console.log("error");
      console.log(err.status);
    });
  }
}
