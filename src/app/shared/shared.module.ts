import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ToastrModule } from 'ngx-toastr';
import { SearchFlightByDatesPipe } from '../Pipes/search-flight-by-dates.pipe';
import { SearchFlightByAirportPipe } from '../Pipes/search-flight-by-airport.pipe';
import { SearchFlightByNamePipe } from '../Pipes/search-flight-by-name.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SearchFlightByDatesPipe,
    SearchFlightByAirportPipe,
    SearchFlightByNamePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ToastrModule.forRoot()
    

  ],
  exports:[
    NavbarComponent,
    FooterComponent,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    SearchFlightByDatesPipe,
    SearchFlightByAirportPipe,
    SearchFlightByNamePipe
  ]
})
export class SharedModule { }


