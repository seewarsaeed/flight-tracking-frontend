import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageFlightComponent } from './manage-flight/manage-flight.component';
import { ManageAirportComponent } from './manage-airport/manage-airport.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageHomeComponent } from './manage-home/manage-home.component';
import { ChartProfitLossComponent } from './chart-profit-loss/chart-profit-loss.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {
    path: 'manageuser',
    component: ManageUserComponent
  },
  {
    path: 'manageflight',
    component: ManageFlightComponent
  },
  {
    path: 'manageairport',
    component: ManageAirportComponent
  },
  {
    path: 'dashboard', 
    component: AdminDashboardComponent
  },{
    path:'managehome',
    component:ManageHomeComponent
  },
  {
    path:'Report',
    component:ReportComponent
  },{
    path:'profitloss',
    component:ChartProfitLossComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
