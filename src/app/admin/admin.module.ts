import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ManageFlightComponent } from './manage-flight/manage-flight.component';
import { CreateFlightComponent } from './create-flight/create-flight.component';
import { ManageAirportComponent } from './manage-airport/manage-airport.component';
import { CreateAirportComponent } from './create-airport/create-airport.component';
import { SidebarComponent } from './admin-sidebar/sidebar.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { SharedModule } from '../shared/shared.module';
import { ManageHomeComponent } from './manage-home/manage-home.component';
import { CreateHeaderComponent } from './create-header/create-header.component';
import { CreateFooterComponent } from './create-footer/create-footer.component';
import { CreateAboutusComponent } from './create-aboutus/create-aboutus.component';
import { CreateBackgroundComponent } from './create-background/create-background.component';
import { ChartProfitLossComponent } from './chart-profit-loss/chart-profit-loss.component';
import { MatSelectModule } from '@angular/material/select';
import { ReportComponent } from './report/report.component';

@NgModule({
  declarations: [
    ManageUserComponent,
    CreateUserComponent,
    ManageFlightComponent,
    CreateFlightComponent,
    ManageAirportComponent,
    CreateAirportComponent,
    SidebarComponent,
    AdminDashboardComponent,
    AdminFooterComponent,
    AdminNavbarComponent,
    ManageHomeComponent,
    CreateHeaderComponent,
    CreateFooterComponent,
    CreateAboutusComponent,
    CreateBackgroundComponent,
    ChartProfitLossComponent,
    ReportComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatSelectModule
  ]
})
export class AdminModule { }
