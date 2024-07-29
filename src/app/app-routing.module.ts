import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { AdminModule } from './admin/admin.module';
import { FlightsComponent } from './flights/flights.component';
import { RegisterModule } from './register/register.module';
import { authorizationGuard } from './authorization.guard';
import { AirportsComponent } from './airports/airports.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component'; 
import { MapInfoWindowComponent } from './map-info-window/map-info-window.component';
import { MyFlightComponent } from './my-flight/my-flight.component';

const routes: Routes = [
  
  {
    path:'security',
    loadChildren:()=>AuthModule
  },
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'contact',
    component:ContactUsComponent
  },
  {
    path:'about',
    component:AboutUsComponent
  },

  {
    path:'testimonial',
    component:TestimonialComponent
  },
  {
    path:'admin',
    loadChildren:()=>AdminModule,
    canActivate:[authorizationGuard]
  },
  {
    path:'myflight',
    component:MyFlightComponent
  },{
    path:'flights',
    component:FlightsComponent
  },
  {
    path:'register',
    loadChildren:()=>RegisterModule
  },
  {
    path:'EditProfile',
    component:EditProfileComponent
  },
{
    path:'airports',
    component:AirportsComponent
  },
  {
    path:'infoWindow',
    component:MapInfoWindowComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
