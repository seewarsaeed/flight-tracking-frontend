import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';

import { RHomeComponent } from './r-home/r-home.component';
import { RNavbarComponent } from './r-navbar/r-navbar.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    RHomeComponent,
    RNavbarComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SharedModule,
  ]
})
export class RegisterModule { }
