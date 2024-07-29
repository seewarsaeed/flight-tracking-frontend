import { Component,OnInit } from '@angular/core';
import { AppServiceService } from '../Services/app-service.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  aboutUs:any[]=[];
  constructor(private appservice:AppServiceService){}
  ngOnInit(): void {
    this.appservice.GetAllabouts().subscribe((resp: any[]) => {
      this.aboutUs = resp;
      console.log("in ts",this.aboutUs);
    }, err => {
      console.log(err.status);
    });
  }

}
