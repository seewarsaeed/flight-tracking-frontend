import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-airport-card',
  templateUrl: './airport-card.component.html',
  styleUrls: ['./airport-card.component.css']
})
export class AirportCardComponent {
  @Input() Airport_Name:string|undefined;
  @Input() Location:string|undefined;
}
