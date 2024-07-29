import { Component ,OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/Services/app-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  footer: any = null;
    constructor(private appservice:AppServiceService){}
  ngOnInit(): void {
    this.appservice.getAllFooter().subscribe(
      (footer: any) => {
        this.footer = footer;
        console.log(this.footer);
      },
      (err) => {
        console.log(err.status);
      }
    );
 }

}
