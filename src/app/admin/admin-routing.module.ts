import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CountryEditableComponent } from './country-editable/country-editable.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', component: AdminComponent, children: [
    {path: 'login', component: LoginComponent},  
    {path: ':name', component: CountryEditableComponent}, 
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
