import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { FlightCardComponent } from './flight-card/flight-card.component';
import { FlightsComponent } from './flights/flights.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/Interceptor/token.interceptor';
import { AirportsComponent } from './airports/airports.component';
import { AirportCardComponent } from './airport-card/airport-card.component';
import { MatSelectModule } from '@angular/material/select';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MapInfoWindowComponent } from './map-info-window/map-info-window.component';

import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule } from '@angular/common/http';
import { GeocodingService } from './Services/geocoding.service';
import { DatePipe } from '@angular/common';
import { MyFlightComponent } from './my-flight/my-flight.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactUsComponent,
    AboutUsComponent,
    TestimonialComponent,
    FlightCardComponent,
    FlightsComponent,
    AirportsComponent,
    AirportCardComponent,
    EditProfileComponent,
    MapInfoWindowComponent,
    MyFlightComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    MatSelectModule,
    GoogleMapsModule,
    HttpClientModule
  ],
  providers: [
    GeocodingService,
    DatePipe,
    {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
