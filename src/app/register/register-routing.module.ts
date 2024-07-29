import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RHomeComponent } from './r-home/r-home.component';



const routes: Routes = [

  {
    path:'',
    component:RHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
