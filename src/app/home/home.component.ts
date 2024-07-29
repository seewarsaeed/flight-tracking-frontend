import { Component,Inject,Renderer2,OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AppServiceService } from '../Services/app-service.service';
import { DOCUMENT } from '@angular/common';

declare function initMap():any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  name=new FormControl('Your Name',Validators.required);
  feedback=new FormControl('message',Validators.required);

  airports:any[]=[];
  flights:any[]=[];
  background: any = null;
  constructor(public appservice:AppServiceService,@Inject(DOCUMENT) private document: Document,private renderer2: Renderer2){}
  ngOnInit(): void {
    this.appservice.GetAllFlights().subscribe((resp: any[]) => {
      this.flights = resp;
    }, err => {
      console.log(err.status);
    });
    this.appservice.GetAllAirports().subscribe((resp: any[]) => {
      this.airports = resp;
    }, err => {
      console.log(err.status);
    });
    this.appservice.GetAllbackgrounds().subscribe(
      (background: any) => {
        this.background = background; 
        console.log(this.background);
      },
      (err) => {
        console.log(err.status);
      });
    // const url='https://maps.googleapis.com/maps/api/js?key=AIzaSyDESJU8F8RQHUNGsGRpuoxSBUpqwCC7UQw&callback=initMap';
    // this.loadScript(url);
    // initMap();

  }

  // private loadScript(url: any) {
  //   return new Promise((resolve, reject) => {
  //     const script = this.renderer2.createElement('script');
  //     script.type = 'text/javascript';
  //     script.src = url;
  //     script.text = ``;
  //     script.async = true;
  //     script.defer = true;
  //     script.onload = resolve;
  //     script.onerror = reject;
  //     this.renderer2.appendChild(this.document.body, script);
  //   })
  // }
}
